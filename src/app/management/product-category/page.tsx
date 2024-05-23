"use client"

import React from "react";
import PageLayout from '@/app/page';
import {Breadcrumb, Button, Col, Input, Row, Tabs} from "antd";
import {CATEGORY_TAB_CONSTANTS} from "@/utils/category.constant";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

const categoryChildren = (
    <Row style={{ justifyContent: "space-between" }}>
        <Col span={8}>
            <Input placeholder="category" prefix={<SearchOutlined />} size="large" ></Input>
        </Col>
        <Button type="primary" icon={<PlusOutlined />} iconPosition="start" >Add Category</Button>
    </Row>
)
const generalChildren = (<h1>Tab2</h1>)

const CATEGORY_TAB_CONSTANT = CATEGORY_TAB_CONSTANTS.map((item) => ({
    key: item.key,
    label: item.label,
    children: item.key === "category" ? categoryChildren : generalChildren,
}));

const onChange = (key: string) => {
    console.log(key);
};

const ProductPage = () => {
    return (
        <PageLayout>
            <Breadcrumb items={[{title: 'Product Category', href: '/management/product-category'}]} />
            <h1>Product Category</h1>
            <Tabs defaultActiveKey="category" items={CATEGORY_TAB_CONSTANT} onChange={onChange} size="small"></Tabs>
        </PageLayout>
    );
};

export default ProductPage;