"use client";

import {Button, Card, Col, Form, Image, Layout, QRCode, Rate, Row, Spin,} from "antd";
import React, {useEffect, useState} from "react";
import {FormOutlined} from "@ant-design/icons";
import {CategoryConstant} from "@/constants/category.constant";
import ProductService from "@/services/product.service";
import {useSearchParams} from "next/navigation";
import PageLayout from "@/app/page";
import ReportModal from "@/components/product/ReportModal";


const ProductDetailsPage = () => {
    const query = useSearchParams();
    const productId = query.get("id");

    const [form] = Form.useForm();
    const [productData, setProductData] = useState<any>({});
    const [isReportModelOpen, setIsReportModelOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchProductByProductId = async () => {
            try {
                setLoading(true)
                let response = await ProductService.getProductDetails(productId!)
                if (response) {
                    setProductData(response)
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        
        if (productId) {
            fetchProductByProductId().then(() => setLoading(false))
        }
    }, [productId]);


    const renderSpecificationForm = (catType: string) => {
        return (
            <Form.List name="specification">
                {() => productData.specification
                    ?.filter((spec: any) => spec.spec_type === catType)
                    .map((spec: any) => (
                        <div key={spec.spec_id}>
                            <Form.Item label={<h5>{spec.spec_name}</h5>}
                                       labelAlign={"left"}
                                       labelCol={{span: 12}}
                                       className={"ml-8 mb-4"}>
                                {spec.subspecification && spec.subspecification.length > 0 ? "" : (
                                    <div>{(spec?.spec_desc !== undefined && spec.spec_desc !== "") ?
                                        [spec.prefix, spec.spec_desc, spec.suffix].join(" ").trim() : "-"}</div>
                                )}
                            </Form.Item>
                            {spec.subspecification && renderSubspecificationsForm(spec.subspecification, spec.spec_id)}
                        </div>
                    ))}
            </Form.List>
        );
    }

    const renderSubspecificationsForm = (subspecifications: any[], parentIndex: string) => {
        return (
            <Form.List name={[parentIndex, 'subspecification']}>
                {() => subspecifications?.map((subspec: any) => (
                    <div key={subspec.subspec_id}>
                        <Form.Item label={<h5>{subspec.subspec_name}</h5>}
                                   labelAlign={"left"}
                                   labelCol={{span: 12}}
                                   className={"ml-16 mb-4"}>
                            <div>{(subspec?.subspec_desc !== undefined && subspec.subspec_desc !== "") ?
                                [subspec.prefix, subspec.subspec_desc, subspec.suffix].join(" ").trim() : "-"}</div>
                        </Form.Item>
                    </div>
                ))}
            </Form.List>
        )
    }

    return (
        <PageLayout title={"Product Details"} isRoot={false}>
            <Form form={form} className={"w-full"}>
                <Row>
                    <Col span={12}>
                        <Row justify={"center"}>
                            <Layout className={"max-w-96 bg-gray-300"}>
                                <Image src={productData.product_img?.file?.preview ?? "/images/fault-image.png"}
                                       alt="product_img"
                                       className={"max-h-96 object-cover"}/>

                            </Layout>
                        </Row>
                    </Col>
                    <Col span={12} className={"mb-12"}>
                        <Spin spinning={loading}>
                            <Card bordered={false}>
                                <Row>
                                    <Button type={"primary"} icon={<FormOutlined/>}
                                            className={"ml-auto flex items-center"}
                                            onClick={() => {
                                                setIsReportModelOpen(true);
                                            }}>Report Product</Button>
                                </Row>
                                <h5 className={"my-3.5"}>General Information</h5>
                                <Form.Item label={<h5>Product Name</h5>}
                                           labelAlign={"left"}
                                           labelCol={{span: 12}}
                                           className={"ml-8 mb-4"}>
                                    <div>{productData.product_name}</div>
                                </Form.Item>
                                <Form.Item label={<h5>Model No.</h5>}
                                           labelAlign={"left"}
                                           labelCol={{span: 12}}
                                           className={"ml-8 mb-4"}>
                                    <div>{productData.model_no}</div>
                                </Form.Item>
                                <Form.Item label={<h5>QR Code</h5>}
                                           labelAlign={"left"}
                                           labelCol={{span: 12}}
                                           className={"ml-8 mb-4"}>
                                    <QRCode value={productData._id}/>
                                </Form.Item>
                                <Form.Item label={<h5>Rating</h5>}
                                           labelAlign={"left"}
                                           labelCol={{span: 12}}
                                           className={"ml-8 mb-4"}>
                                    <Rate value={productData.rating} disabled/>
                                </Form.Item>
                                <Form.Item label={<h5>Category</h5>}
                                           labelAlign={"left"}
                                           labelCol={{span: 12}}
                                           className={"ml-8 mb-4"}>
                                    <div>{productData.cat_name}</div>
                                </Form.Item>
                                <Form.Item label={<h5>Subcategory</h5>}
                                           labelAlign={"left"}
                                           labelCol={{span: 12}}
                                           className={"ml-8 mb-4"}>
                                    <div>{productData.subcat_name}</div>
                                </Form.Item>

                                {!loading && <>
                                    {renderSpecificationForm(CategoryConstant.INFORMATION)}
                                    <h5 className={"mb-3.5 mt-8"}>Certification</h5>
                                    {renderSpecificationForm(CategoryConstant.CERTIFICATION)}
                                    <h5 className={"mb-3.5 mt-8"}>Warranty</h5>
                                    {renderSpecificationForm(CategoryConstant.WARRANTY)}
                                    <h5 className={"mb-3.5 mt-8"}>Specification</h5>
                                    {renderSpecificationForm(CategoryConstant.SPECIFICATION)}
                                </>
                                }
                            </Card>
                        </Spin>
                    </Col>
                </Row>
            </Form>
            <ReportModal onOpen={isReportModelOpen}
                         onClose={() => setIsReportModelOpen(false)}
                         productId={productId}
                         productName={productData.product_name}/>
        </PageLayout>
    );
};

export default ProductDetailsPage;
