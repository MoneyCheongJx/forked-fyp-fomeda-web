"use client"

import {useSearchParams} from "next/navigation";
import PageLayout from "@/app/page";
import React from "react";
import AddSpecificationPage from "@/components/product-category/AddSpecificationPage";
import {SPECIFICATION_TYPE_CONSTANT} from "@/constants/category.constant";

const AddPage = () => {
    const query = useSearchParams();
    const type = query.get('type');
    const id = query.get('id');

    const SPECIFICATION_TYPE = SPECIFICATION_TYPE_CONSTANT[type!];

    return (
        <PageLayout title={`Add ${SPECIFICATION_TYPE}`} isRoot={false}>
            <AddSpecificationPage specificationType={type} catId={id}/>
        </PageLayout>
    )
}

export default AddPage;