"use client"

import PageLayout from "@/app/page";
import {Button, Col, Form, Image, Input, Layout, Rate, Row, Table, Tooltip} from "antd";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import ProductService from "@/services/product.service";
import {ProductModel} from "@/models/product.model";
import {InfoCircleOutlined, PictureOutlined} from "@ant-design/icons";
import {ProductConstant, VERIFICATION_DETAILS_TABLE_CONSTANTS} from "@/constants/product.constant";
import {StringUtils} from "@/utils/string.utils";
import TextArea from "antd/es/input/TextArea";

const ProductVerificationDetailsPage = () => {
    const router = useRouter();
    const query = useSearchParams();
    const id = query.get("id");

    const [form] = Form.useForm();
    const [productData, setProductData] = useState<ProductModel>();
    const [starRating, setStarRating] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const getVerificationProductDetails = async () => {
            try {
                const response = await ProductService.getProductVerificationDetailsById(id!);
                if (response) {
                    setProductData(response);
                    calculateTotalScore(form.getFieldValue("specification"))
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        getVerificationProductDetails().then();
    }, [id]);

    useEffect(() => {
        if (productData && totalScore !== undefined) {
            calculateStarRating();
        }
    }, [totalScore, productData]);

    const calculateTotalScore = (specifications: any) => {
        let total = 0;
        Object.values(specifications || {}).forEach((spec: any) => {
            if (spec.subspecification) {
                Object.values(spec.subspecification).forEach((subspec: any) => {
                    if (subspec.score !== undefined && !isNaN(subspec.score)) {
                        total += Number(subspec.score);
                    }
                });
            } else if (spec.score !== undefined && !isNaN(spec.score)) {
                total += Number(spec.score);
            }
        });
        setTotalScore(total);
    };

    const calculateStarRating = () => {
        const scores = productData?.rating_score;
        const matchRating = scores?.find((score) => totalScore <= score.max_score && totalScore >= score.min_score)
        setStarRating(matchRating.rating);
    }

    const handleValuesChange = (changedValues: any, allValues: any) => {
        calculateTotalScore(allValues.specification);
    };

    const onUpdate = async (status: string) => {
        const formData = form.getFieldsValue();

        const filteredData = {
            ...formData,
            rating: starRating,
            total_score: totalScore,
            status: status,
            specification: filterSpecifications(formData.specification || []),
        };

        try{
            await ProductService.updateProductVerificationDetailsById(id!, filteredData);
            router.back()
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const filterSpecifications = (specifications: any[]) => {
        return Object.values(specifications)
            .map(spec => {
                if (spec.subspecification) {
                    const filteredSubspecs: any[] = Object.values(spec.subspecification).filter((subspec: any) => subspec.score !== undefined);
                    if (filteredSubspecs.length === 0) {
                        return undefined;
                    }

                    return {
                        ...spec,
                        subspecification: filteredSubspecs,
                    };
                } else {
                    return spec.score !== undefined ? spec : undefined;
                }
            })
            .filter(spec => spec !== undefined);
    };

    const defineTableHeader = (tableHeader: any[]) => tableHeader.map((column: any) => {
        switch (column.key) {
            case 'spec_name':
                return {
                    ...column,
                    render: (text: any, record: any) => {
                        const value = record.subspec_name || record.spec_name;
                        return <span>{value}</span>;
                    },
                    sorter: (a: any, b: any) => (a.spec_name || a.subspec_name).localeCompare(b.subcat_spec_name || b.subcat_subspec_name),
                };
            case 'spec_desc' :
                return {
                    ...column,
                    render: (text: any, record: any) => {
                        if (record.subspecification?.length > 0) {
                            return <></>
                        }
                        const value = record.subspec_desc || record.spec_desc;
                        const joinedValue = value ? [record.prefix, value, record.suffix].filter(Boolean).join(' ') : "-";
                        return <span>{joinedValue}</span>;
                    },
                };
            case 'score':
                return {
                    ...column,
                    render: (text: any, record: any) => renderScore(record),
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    });

    const renderScore = (record: any) => {
        if (record.subspecification && record.subspecification.length > 0) {
            return <></>
        }

        const ratingScores = record.rating_score || [];
        const tooltipDesc = ratingScores.map((rating: any, index: number) => (
            <div key={index}>
                {record.subspec_name || record.spec_name} {StringUtils.formatLowerCase(rating.action, "_")} {record.prefix} {rating.value} {record.suffix} = {rating.score} mark(s);
            </div>
        ));

        return (
            <Row>
                <Col>
                    <Form.Item hidden
                               name={['specification', record.spec_id, 'spec_id']}
                               initialValue={record.spec_id}/>
                    {record.subspec_id &&
                        <Form.Item hidden
                                   name={['specification', record.spec_id, 'subspecification', record.subspec_id, 'subspec_id']}
                                   initialValue={record.subspec_id}/>
                    }
                    <Form.Item
                        name={record.subspec_id ? ['specification', record.spec_id, 'subspecification', record.subspec_id, 'score'] : ['specification', record.spec_id, 'score']}
                        initialValue={record.score}
                        type={"number"}
                        className={"mb-0"}>
                        <Input disabled={ratingScores.length <= 0}/>
                    </Form.Item>
                </Col>
                <Col>
                    {ratingScores.length > 0 ? (
                        <Tooltip title={tooltipDesc}>
                            <Button type="text" shape="circle" icon={<InfoCircleOutlined/>}/>
                        </Tooltip>
                    ) : (
                        <Button type="text" shape="circle" icon={<InfoCircleOutlined/>} disabled/>
                    )}
                </Col>
            </Row>
        )
    };

    return (
        <PageLayout title="Product Details">
            <Layout className={"max-w-96 bg-gray-300 mb-8"}>
                {productData?.product_img?.file.preview ?
                    <Image src={productData.product_img?.file?.preview} alt="product_img"
                           className={"max-h-96 object-cover"}/> :
                    <PictureOutlined className={"text-5xl py-44 justify-center text-gray-500"}/>
                }
            </Layout>
            <Form form={form} onValuesChange={handleValuesChange}>
                {VERIFICATION_DETAILS_TABLE_CONSTANTS.map((item: any) => (
                    <div key={item.key} className="mb-8">
                        <h3>{item.title}</h3>
                        <Table columns={defineTableHeader(item.tableHeader)}
                               dataSource={productData?.specification?.filter(spec => spec.spec_type === item.type)
                                   .map(spec => {
                                       const dataItem = {...spec, key: spec.spec_id};
                                       if (spec.subspecification && spec.subspecification.length > 0) {
                                           dataItem.children = spec.subspecification.map((subspec: any) => ({
                                               ...subspec,
                                               key: subspec.subspec_id,
                                           }))
                                       }
                                       return dataItem;
                                   })}
                               pagination={false}
                               showSorterTooltip={false}
                               expandable={{
                                   expandedRowKeys: productData?.specification
                                       ?.filter(spec => spec.spec_type === item.type)
                                       .filter(spec => spec.subspecification && spec.subspecification.length > 0)
                                       .map(spec => spec.spec_id),
                                   expandIcon: () => null
                               }}/>
                    </div>
                ))}

                <h3>Overall Rating</h3>
                <Form.Item label={<h5>Total Score</h5>}
                           labelAlign={"left"}
                           labelCol={{span: 4}}
                           className={"ml-8 mb-2"}>
                    <div>{totalScore}</div>
                </Form.Item>
                <Form.Item label={<h5>Rating</h5>}
                           labelAlign={"left"}
                           labelCol={{span: 4}}
                           className={"ml-8 mb-2"}>
                    <Rate disabled value={starRating}/>
                </Form.Item>
                <h3>Reject</h3>
                <Form.Item label={<h5>Reject Reason</h5>}
                           labelAlign={"left"}
                           labelCol={{span: 4}}
                           className={"ml-8 mb-2"}
                           name={"rejected_reason"}>
                    <Col span={16}>
                        <TextArea rows={5}/>
                    </Col>
                </Form.Item>
            </Form>
            <Row className={"justify-end space-x-3 my-4"}>
                <Button type={"default"} size={"large"} onClick={() => router.back()}>Cancel</Button>
                <Button type={"primary"} size={"large"} onClick={() => onUpdate(ProductConstant.REJECTED)} danger>Rejected</Button>
                <Button type={"primary"} size={"large"} onClick={() => onUpdate(ProductConstant.APPROVED)}>Approve</Button>
            </Row>
        </PageLayout>
    );
}

export default ProductVerificationDetailsPage;