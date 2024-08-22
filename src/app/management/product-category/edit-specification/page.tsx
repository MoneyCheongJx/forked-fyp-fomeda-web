"use client"

import {useRouter, useSearchParams} from "next/navigation";
import PageLayout from "@/app/page";
import {Breadcrumb, Button, Row} from "antd";
import React from "react";
import {LeftOutlined} from "@ant-design/icons";
import EditSpecificationPage from "@/components/product-category/EditSpecificationPage";
import {SPECIFICATION_TYPE_CONSTANT} from "@/constants/category.constant";

const EditPage = () => {
    const router = useRouter();
    const query = useSearchParams();
    const type = query.get('type');
    const id = query.get('id');

    const CATEGORY_TYPE = SPECIFICATION_TYPE_CONSTANT[type!];

    return (
        <PageLayout>
            <Breadcrumb items={[
                {title: 'Product Category', href: '/management/product-category'},
                {title: `Edit ${CATEGORY_TYPE}`, href: ''},
            ]}/>
            <Row className="mb-4 items-center">
                <Button type="text" icon={<LeftOutlined/>} onClick={() => router.back()}/>
                <h1>Edit {CATEGORY_TYPE}</h1>
            </Row>
            <EditSpecificationPage specId={id} />
        </PageLayout>
    )
}

export default EditPage;