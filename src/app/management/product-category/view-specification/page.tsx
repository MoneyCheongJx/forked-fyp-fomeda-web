"use client"

import {useSearchParams} from "next/navigation";
import PageLayout from "@/app/page";
import React from "react";
import ViewSpecificationPage from "@/components/product-category/ViewSpecificationPage";
import {CategoryConstant} from "@/constants/category.constant";

const EditPage = () => {
    const query = useSearchParams();
    const id = query.get('id');

    const specificationType = () => {
        if (id) {
            if (id.includes(CategoryConstant.GENERAL_SPECIFICATION_PREFIX) || id.includes(CategoryConstant.GENERAL_SUBSPECIFICATION_PREFIX)) {
                return "General Specification";
            }
            if (id.includes(CategoryConstant.BASE_SPECIFICATION_PREFIX) || id.includes(CategoryConstant.BASE_SUBSPECIFICATION_PREFIX)) {
                return "Category Specification";
            }
        }
        return "Subcategory Specification";
    };

    return (
        <PageLayout title={`${specificationType()} Details`} isRoot={false}>
            <ViewSpecificationPage specId={id} />
        </PageLayout>
    )
}

export default EditPage;