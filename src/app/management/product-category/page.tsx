"use client"

import React from "react";
import PageLayout from '@/app/page';
import {Breadcrumb, Tabs} from "antd";
import {CATEGORY_TAB_CONSTANTS} from "@/constants/category.constant";
import CategoryTab from "@/components/product-category/CategoryTab";
import GeneralTab from "@/components/product-category/GeneralTab";

const CATEGORY_TAB_CONSTANT = CATEGORY_TAB_CONSTANTS.map((item) => ({
    key: item.key,
    label: item.label,
    children: item.key === "category" ? <CategoryTab /> : <GeneralTab />,
}));


const ProductPage = () => {
    return (
        <PageLayout>
            <Breadcrumb items={[{title: 'Product Category', href: '/management/product-category'}]} />
            <h1 style={{marginBottom: 16}}>Product Category</h1>
            <Tabs defaultActiveKey="category" items={CATEGORY_TAB_CONSTANT} size="small"></Tabs>
        </PageLayout>
    );
};

export default ProductPage;