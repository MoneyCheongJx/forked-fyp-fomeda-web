"use client"

import PageLayout from "@/app/page";
import {Button, Col, Form, Image, Layout, Modal, Rate, Row, Table, Tooltip} from "antd";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import ProductService from "@/services/product.service";
import {ProductModel} from "@/models/product.model";
import {InfoCircleOutlined, PictureOutlined} from "@ant-design/icons";
import {ProductConstant, VERIFICATION_DETAILS_TABLE_CONSTANTS} from "@/constants/product.constant";
import {StringUtils} from "@/utils/string.utils";
import TextArea from "antd/es/input/TextArea";
import CustomInput from "@/components/common/CustomInput";
import MessageService from "@/services/message.service";
import ProductConfirmationContent from "@/components/common/ProductConfirmationContent";
import NotificationService from "@/services/notification.service";
import {CategoryConstant} from "@/constants/category.constant";

const ProductVerificationDetailsPage = () => {
    const router = useRouter();
    const query = useSearchParams();
    const id = query.get("id");

    const [form] = Form.useForm();
    const [productData, setProductData] = useState<ProductModel>();
    const [starRating, setStarRating] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getVerificationProductDetails = async () => {
            try {
                setLoading(true);
                const response = await ProductService.getProductVerificationDetailsById(id!);
                if (response) {
                    const deafultInfo = [
                        {
                            spec_name: "Product Name",
                            spec_desc: response.product_name,
                            spec_type: CategoryConstant.INFORMATION,
                            spec_id: "product_name",
                            is_default: true,
                        },
                        {
                            spec_name: "Model No.",
                            spec_desc: response.model_no,
                            spec_type: CategoryConstant.INFORMATION,
                            spec_id: "model_no",
                            is_default: true,
                        },
                        {
                            spec_name: "Category",
                            spec_desc: response.cat_name,
                            spec_type: CategoryConstant.INFORMATION,
                            spec_id: "category",
                            is_default: true,
                        },
                        {
                            spec_name: "Subcategory",
                            spec_desc: response.subcat_name,
                            spec_type: CategoryConstant.INFORMATION,
                            spec_id: "subcategory",
                            is_default: true,
                        },
                    ]

                    response.specification = [...deafultInfo, ...(response.specification ?? [])]
                    setProductData(response);
                    calculateTotalScore(form.getFieldValue("specification"))
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        getVerificationProductDetails().then(() => setLoading(false));
    }, [form, id]);

    useEffect(() => {
        const calculateStarRating = () => {
            const scores = productData?.rating_score;
            const matchRating = scores?.find((score) => totalScore <= score.max_score && totalScore >= score.min_score)
            setStarRating(matchRating?.rating ?? 0);
        }

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



    const handleValuesChange = (changedValues: any, allValues: any) => {
        calculateTotalScore(allValues.specification);
    };

    const onUpdate = async (status: string) => {
        if (status === ProductConstant.REJECTED &&
            (!form.getFieldValue("rejected_reason") ||
                form.getFieldValue("rejected_reason").trim() === "")) {
            MessageService.error("Reject Reason is required to reject application.")
            return;
        }

        if (status === ProductConstant.APPROVED) {
            if(starRating === 0) {
                MessageService.error("Minimum of 1 star is required to approve a product");
                return;
            }

            try {
                await form.validateFields();
            } catch (error) {
                MessageService.error("Please fill in all required fields.");
                return;
            }
        }

        const statusAction = status === ProductConstant.REJECTED ? ProductConstant.REJECT_ACTION : ProductConstant.APPROVE_ACTION;
        Modal.confirm({
            title: <h3>Confirmation</h3>,
            content: <ProductConfirmationContent action={statusAction} record={productData}
                                                 details={"product application"}/>,
            className: "confirmation-modal",
            centered: true,
            width: "35%",
            okText: "Confirm",
            onOk: () => onSubmit(status),
        })
    }

    const onSubmit = async (status: string) => {
        const formData = form.getFieldsValue();
        const filteredProductData = productData?.specification?.filter(
            (spec: any) => !spec.is_default
        ) || [];

        const filteredData = {
            ...productData,
            ...formData,
            rating: starRating,
            total_score: totalScore,
            status: status,
            specification: mergeSpecifications(filteredProductData || [], formData.specification || []),
        };

        const displayStatus = StringUtils.formatTitleCase(status)
        try {
            await ProductService.updateProductVerificationReviewById(id!, filteredData);
            router.back();
            NotificationService.success(
                `${displayStatus} Application`,
                `${productData?.product_name} Application is ${displayStatus} successfully.`
            )
        } catch (error) {
            NotificationService.error(
                `${displayStatus} Application`,
                `${productData?.product_name} Application failed to ${status === ProductConstant.REJECTED ? "reject" : "approve"}`
            )
            throw error;
        }
    }

    const mergeSubspecifications = (formSubspecs: any[], productSubspecs: any[]) => {
        return formSubspecs.map((formSubspec: any) => {
            const productSubspec = productSubspecs.find(
                (prodSubspec: any) => prodSubspec.subspec_id === formSubspec.subspec_id
            );
            if (productSubspec) {
                return {
                    subspec_id: formSubspec.subspec_id,
                    subspec_desc: productSubspec.subspec_desc,
                    score: formSubspec.score,
                };
            }
            return null;
        }).filter((subspec: any) => subspec !== null);
    };

    const mergeSpecification = (formSpec: any, productSpec: any) => {
        const mergedSpec: any = {
            spec_id: formSpec.spec_id,
            spec_desc: productSpec.spec_desc,
            score: formSpec.score,
        };

        if (formSpec.subspecification && productSpec.subspecification) {
            mergedSpec.subspecification = mergeSubspecifications(
                Object.values(formSpec.subspecification),
                productSpec.subspecification
            );
        }

        return mergedSpec;
    };

    const mergeSpecifications = (productDataSpecs: any[], formDataSpecs: any[]) => {
        return Object.values(formDataSpecs)
            .map((formSpec: any) => {
                const productSpec = productDataSpecs.find(
                    (prodSpec: any) => prodSpec.spec_id === formSpec.spec_id
                );
                return productSpec ? mergeSpecification(formSpec, productSpec) : null;
            })
            .filter((spec: any) => spec !== null);
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

        const specName = record.subspec_name || record.spec_name;
        let maxScore = 0;
        const ratingScores = record.rating_score || [];
        const tooltipDesc = ratingScores.map((rating: any) => {
            if (rating.score > maxScore) maxScore = rating.score;
            return (
                <div key={rating._id}>
                    {specName} {StringUtils.formatLowerCase(rating.action, "_")} {record.prefix} {rating.value} {record.suffix} = {rating.score} mark(s);
                </div>
            )
        });

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
                        className={"mb-0"}
                        rules={[{
                            validator: (_: any, value: number) => {
                                if (value > maxScore)
                                    return Promise.reject(new Error(`${specName} score cannot exceed ${maxScore}`))
                                return Promise.resolve();
                            }
                        }]}>
                        <CustomInput type={"numeric"}
                                     disabled={ratingScores.length <= 0}/>
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
        <PageLayout title="Product Details" isRoot={false}>
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
                               loading={loading}
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
                        <div className={"text-yellow-500"}><i><InfoCircleOutlined/> This field is required to reject
                            this application.</i></div>
                    </Col>
                </Form.Item>
            </Form>
            <Row className={"justify-end space-x-3 my-4"}>
                <Button type={"default"} size={"large"} onClick={() => router.back()}>Cancel</Button>
                <Button type={"primary"} size={"large"} onClick={() => onUpdate(ProductConstant.REJECTED)}
                        danger>Reject</Button>
                <Button type={"primary"} size={"large"}
                        onClick={() => onUpdate(ProductConstant.APPROVED)}>Approve</Button>
            </Row>
        </PageLayout>
    );
}

export default ProductVerificationDetailsPage;