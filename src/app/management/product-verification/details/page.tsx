"use client"

import PageLayout from "@/app/page";
import {Col, Form, Image, Layout, Rate, Skeleton, Table} from "antd";
import {useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import ProductService from "@/services/product.service";
import {ProductModel} from "@/models/product.model";
import {PictureOutlined} from "@ant-design/icons";
import {VERIFICATION_DETAILS_TABLE_CONSTANTS} from "@/constants/product.constant";
import {CategoryConstant} from "@/constants/category.constant";


const ProductVerificationDetailsPage = () => {
    const query = useSearchParams();
    const id = query.get("id");

    const [productData, setProductData] = useState<ProductModel>();
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
                            spec_id: "product_name"
                        },
                        {
                            spec_name: "Model No.",
                            spec_desc: response.model_no,
                            spec_type: CategoryConstant.INFORMATION,
                            spec_id: "model_no"
                        },
                        {
                            spec_name: "Category",
                            spec_desc: response.cat_name,
                            spec_type: CategoryConstant.INFORMATION,
                            spec_id: "category"
                        },
                        {
                            spec_name: "Subcategory",
                            spec_desc: response.subcat_name,
                            spec_type: CategoryConstant.INFORMATION,
                            spec_id: "subcategory"
                        },
                    ]

                    response.specification = [...deafultInfo, ...(response.specification ?? [])]
                    setProductData(response);
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        getVerificationProductDetails().then(() => setLoading(false));
    }, [id]);


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
                    render: (text: any, record: any) =>
                        <div>{record.subspecification && record.subspecification.length !== 0 ? "" : (record.score ?? "-")}</div>,
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    });

    return (
        <PageLayout title="Product Details">
            <Layout className={"max-w-96 bg-gray-300 mb-8"}>
                {productData?.product_img?.file.preview ?
                    <Image src={productData.product_img?.file?.preview} alt="product_img"
                           className={"max-h-96 object-cover"}/> :
                    <PictureOutlined className={"text-5xl py-44 justify-center text-gray-500"}/>
                }
            </Layout>
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
                <div>{productData?.total_score ?? "-"}</div>
            </Form.Item>
            <Form.Item label={<h5>Rating</h5>}
                       labelAlign={"left"}
                       labelCol={{span: 4}}
                       className={"ml-8 mb-2"}>
                <Rate disabled value={productData?.rating ?? 0}/>
            </Form.Item>
            <h3>Reject</h3>
            <Form.Item label={<h5>Reject Reason</h5>}
                       labelAlign={"left"}
                       labelCol={{span: 4}}
                       className={"ml-8 mb-16"}
                       name={"reject_reason"}>
                <Col span={16}>
                    <div>{productData?.rejected_reason ?? "-"}</div>
                </Col>
            </Form.Item>
        </PageLayout>
    );
}

export default ProductVerificationDetailsPage;