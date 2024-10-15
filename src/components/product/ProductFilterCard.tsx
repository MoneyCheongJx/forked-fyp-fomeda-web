import {Button, Card, Checkbox, Collapse, Divider, Row} from "antd";
import {FilterOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import ProductService from "@/services/product.service";
import {CategoryConstant} from "@/constants/category.constant";
import {StringUtils} from "@/utils/string.utils";
import {ProductConstant} from "@/constants/product.constant";

const ProductFilterCard = ({subcatId, onFilterChange, total = 0}: any) => {
    const [specificationData, setSpecificationData] = useState<any>([]);
    const [subspecificationData, setSubspecificationData] = useState<any>([]);
    const [filterModel] = useState<any>({
        specification: [],
        subspecification: []
    });
    const [selectedSpecifications, setSelectedSpecifications] = useState<{ [key: string]: string[] }>({});
    const [selectedSubspecifications, setSelectedSubspecifications] = useState<{ [key: string]: string[] }>({});
    const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]); // Certification-specific state

    useEffect(() => {
        const fetchSpecificationFilter = async () => {
            try {
                const response = await ProductService.getConsumerSpecificationFilterBySubcatId(subcatId);
                if (response) {
                    const ratingInfo = {
                        spec_id: "rating",
                        spec_name: "Rating",
                        spec_type: CategoryConstant.INFORMATION,
                        field_type: ProductConstant.NUMERIC,
                        prefix: "",
                        suffix: "star",
                        desc_list: ["1", "2", "3", "4", "5"],
                    };
                    response.specification?.push(ratingInfo);
                    setSpecificationData(response.specification);
                    setSubspecificationData(response.subspecification);
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        };
        fetchSpecificationFilter().then();
    }, [subcatId]);

    const handleSpecificationChange = (spec_id: string, selectedValues: string[]) => {
        setSelectedSpecifications({
            ...selectedSpecifications,
            [spec_id]: selectedValues,
        });

        if (selectedValues.length <= 0) {
            filterModel.specification = filterModel.specification?.filter(
                (spec: any) => spec.spec_id !== spec_id
            );
        } else {
            const existSpec = filterModel.specification?.find((spec: any) => spec.spec_id === spec_id);
            if (existSpec) {
                existSpec.desc_list = selectedValues;
            } else {
                filterModel.specification.push({
                    spec_id: spec_id,
                    desc_list: selectedValues,
                });
            }
        }
        onFilterChange(filterModel);
    };

    const handleSubspecificationChange = (spec_id: string, subspec_id: string, selectedValues: string[]) => {
        setSelectedSubspecifications({
            ...selectedSubspecifications,
            [subspec_id]: selectedValues,
        });

        if (selectedValues.length <= 0) {
            filterModel.subspecification = filterModel.subspecification?.filter(
                (subspec: any) => subspec.subspec_id !== subspec_id
            );
        } else {
            const existSubspec = filterModel.subspecification?.find((spec: any) => spec.subspec_id === subspec_id);
            if (existSubspec) {
                existSubspec.desc_list = selectedValues;
            } else {
                filterModel.subspecification.push({
                    spec_id: spec_id,
                    subspec_id: subspec_id,
                    desc_list: selectedValues,
                });
            }
        }
        onFilterChange(filterModel);
    };

    const handleCertificationChange = (cert_id: string, checked: boolean) => {
        let updatedCertifications = [...selectedCertifications];
        if (checked) {
            updatedCertifications.push(cert_id);
            filterModel.specification.push({
                spec_id: cert_id,
                desc_list: null
            });
        } else {
            updatedCertifications = updatedCertifications.filter(id => id !== cert_id);
            filterModel.specification = filterModel.specification?.filter(
                (spec: any) => spec.spec_id !== cert_id
            );
        }
        setSelectedCertifications(updatedCertifications);
        onFilterChange(filterModel);
    };


    const handleClearFilter = () => {
        filterModel.specification = [];
        filterModel.subspecification = [];
        setSelectedSpecifications({});
        setSelectedSubspecifications({});
        setSelectedCertifications([]);
        onFilterChange(filterModel);
    }

    const getSubspecifications = (spec_id: string) => {
        return subspecificationData.filter((subspec: any) => subspec.spec_id === spec_id);
    };

    const renderSubspecification = (spec_id: string, subspecifications: any[]) => {
        return subspecifications.map((subspec: any) => {
            const validSubspecDescList = subspec.desc_list.filter((desc: string) => desc !== "");

            return {
                key: subspec.subspec_id,
                label: subspec.subspec_name,
                children: (
                    <Checkbox.Group className={"block w-full"}
                                    value={selectedSubspecifications[subspec.subspec_id] || []}
                                    onChange={(checkedValues) => handleSubspecificationChange(spec_id, subspec.subspec_id, checkedValues)}
                    >
                        {validSubspecDescList.map((desc: string, index: number) => (
                            <Row key={`${subspec.subspec_id}_desc_${index}`}>
                                <Checkbox value={desc}>
                                    {StringUtils.join(subspec.prefix, desc, subspec.suffix)}
                                </Checkbox>
                            </Row>
                        ))}
                    </Checkbox.Group>
                ),
            };
        });
    }

    const renderSpecifications = (specifications: any) => {
        return specifications.map((spec: any) => {
            const validDescList = spec.desc_list.filter((desc: string) => desc !== "");
            const subspecifications = getSubspecifications(spec.spec_id);

            const subspecPanels = renderSubspecification(spec.spec_id, subspecifications);

            return {
                key: spec.spec_id,
                label: spec.spec_name,
                children: (
                    <>
                        {validDescList.length > 0 && (
                            <Checkbox.Group className={"block w-full"}
                                            value={selectedSpecifications[spec.spec_id] || []}
                                            onChange={(checkedValues) => handleSpecificationChange(spec.spec_id, checkedValues)}
                            >
                                {validDescList.map((desc: string, index: number) => (
                                    <Row key={`${spec.spec_id}_desc_${index}`}>
                                        <Checkbox value={desc}>
                                            {StringUtils.join(spec.prefix, desc, spec.suffix)}
                                        </Checkbox>
                                    </Row>
                                ))}
                            </Checkbox.Group>
                        )}

                        {subspecifications.length > 0 && (
                            <Collapse ghost items={subspecPanels}/>
                        )}
                    </>
                ),
            };
        });
    };

    const filterTitle = (
        <Row className={"items-center"}>
            <Row className={"p-1.5"}>
                <FilterOutlined/>
                <div className={"ml-2"}>Filter</div>
            </Row>
            <Divider type="vertical" className={"bg-black"}/>
            <div className={"p-1.5"}>{total} result(s)</div>
            <Divider type="vertical" className={"bg-black"}/>
            <Button size={"small"} type={"link"} onClick={handleClearFilter}>
                Clear Filter
            </Button>
        </Row>
    );

    return (
        <Card title={filterTitle}>
            <Collapse ghost
                      className={"product-collapse-panel"}
                      items={[
                          {
                              key: "information",
                              label: <h4>Information</h4>,
                              children: (
                                  <Collapse ghost
                                            className={"product-collapse-panel"}
                                            items={renderSpecifications(
                                                specificationData.filter((spec: any) => spec.spec_type === CategoryConstant.INFORMATION)
                                            )}/>
                              ),
                          },
                          {
                              key: "information-divider",
                              showArrow: false,
                              label: <Divider className={"bg-gray-300 my-3"}/>,
                              collapsible: "icon",
                          },
                          {
                              key: "certification",
                              label: <h4>Certification</h4>,
                              children: (
                                  <Checkbox.Group value={selectedCertifications}
                                                  onChange={(checkedValues) => {
                                                      checkedValues.forEach((cert_id: string) => {
                                                          if (!selectedCertifications.includes(cert_id)) {
                                                              handleCertificationChange(cert_id, true);
                                                          }
                                                      });

                                                      selectedCertifications.forEach((cert_id: string) => {
                                                          if (!checkedValues.includes(cert_id)) {
                                                              handleCertificationChange(cert_id, false);
                                                          }
                                                      });
                                                  }}
                                                  className={"block w-full"}>
                                      {specificationData
                                          .filter((spec: any) => spec.spec_type === CategoryConstant.CERTIFICATION)
                                          .map((spec: any, index: number) => (
                                              <Row key={`${spec.spec_id}_desc_${index}`}>
                                                  <Checkbox value={spec.spec_id}>
                                                      {spec.spec_name}
                                                  </Checkbox>
                                              </Row>
                                          ))}
                                  </Checkbox.Group>
                              ),
                          },
                          {
                              key: "certification-divider",
                              showArrow: false,
                              label: <Divider className={"bg-gray-300 my-3"}/>,
                              collapsible: "icon",
                          },
                          {
                              key: "warranty",
                              label: <h4>Warranty</h4>,
                              children: (
                                  <Collapse ghost
                                            className={"product-collapse-panel"}
                                            items={renderSpecifications(
                                                specificationData.filter((spec: any) => spec.spec_type === CategoryConstant.WARRANTY)
                                            )}/>
                              ),
                          },
                          {
                              key: "warranty-divider",
                              showArrow: false,
                              label: <Divider className={"bg-gray-300 my-3"}/>,
                              collapsible: "icon",
                          },
                          {
                              key: "specification",
                              label: <h4>Specification</h4>,
                              children: (
                                  <Collapse ghost
                                            className={"product-collapse-panel"}
                                            items={renderSpecifications(
                                                specificationData.filter((spec: any) => spec.spec_type === CategoryConstant.SPECIFICATION)
                                            )}/>
                              ),
                          },
                          {
                              key: "specification-divider",
                              showArrow: false,
                              label: <Divider className={"bg-gray-300 my-3"}/>,
                              collapsible: "icon",
                          },
                      ]}
            />
        </Card>
    );
};

export default ProductFilterCard;
