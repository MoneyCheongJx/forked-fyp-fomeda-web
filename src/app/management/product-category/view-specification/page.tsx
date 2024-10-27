"use client"

import {useSearchParams} from "next/navigation";
import PageLayout from "@/app/page";
import React from "react";
import ViewSpecificationPage from "@/components/product-category/ViewSpecificationPage";
import {SPECIFICATION_TYPE_CONSTANT} from "@/constants/category.constant";

const EditPage = () => {
    const query = useSearchParams();
    const type = query.get('type');
    const id = query.get('id');

    const CATEGORY_TYPE = SPECIFICATION_TYPE_CONSTANT[type!];

    return (
        <PageLayout title={`${CATEGORY_TYPE} Details`} isRoot={false}>
            <ViewSpecificationPage specId={id} />
        </PageLayout>
    )
}

export default EditPage;