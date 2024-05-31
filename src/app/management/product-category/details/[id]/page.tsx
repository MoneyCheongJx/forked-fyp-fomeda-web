"use client"

import {usePathname, useRouter} from "next/navigation";
import CategoryDetailsPage from "@/components/product-category/CategoryDetailsPage";
import PageLayout from "@/app/page";
import {Breadcrumb, Button, Row} from "antd";
import React from "react";
import {LeftOutlined} from "@ant-design/icons";

const DetailsPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.substring(pathname.lastIndexOf("/") + 1);

    return (
        <PageLayout>
            <Breadcrumb items={[
                {title: 'Product Category', href: '/management/product-category'},
                {title: 'Product Details', href: ''},
            ]}/>
            <Row className="mb-4 items-center">
                <Button type="text" icon={<LeftOutlined/>} onClick={() => router.back()}/>
                <h1>Product Details</h1>
            </Row>
            <CategoryDetailsPage id={id} />
        </PageLayout>
    )
}

export default DetailsPage;