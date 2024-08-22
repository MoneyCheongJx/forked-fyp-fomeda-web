"use client"

import {useRouter, useSearchParams} from "next/navigation";
import PageLayout from "@/app/page";
import {Breadcrumb, Button, Row} from "antd";
import React from "react";
import {LeftOutlined} from "@ant-design/icons";
import AddSpecificationPage from "@/components/product-category/AddSpecificationPage";
import {SPECIFICATION_TYPE_CONSTANT} from "@/constants/category.constant";

const AddPage = () => {
    const router = useRouter();
    const query = useSearchParams();
    const type = query.get('type');
    const id = query.get('id');

    const SPECIFICATION_TYPE = SPECIFICATION_TYPE_CONSTANT[type!];

    return (
        <PageLayout>
            <Breadcrumb items={[
                {title: 'Product Category', href: '/management/product-category'},
                {title: `Add ${SPECIFICATION_TYPE}`, href: ''},
            ]}/>
            <Row className="mb-4 items-center">
                <Button type="text" icon={<LeftOutlined/>} onClick={() => router.back()}/>
                <h1>Add {SPECIFICATION_TYPE}</h1>
            </Row>
            <AddSpecificationPage specificationType={type} catId={id}/>
        </PageLayout>
    )
}

export default AddPage;