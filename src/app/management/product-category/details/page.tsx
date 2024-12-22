"use client"

import {useSearchParams,} from "next/navigation";
import CategoryDetailsPage from "@/components/product-category/CategoryDetailsPage";
import PageLayout from "@/app/page";
import React from "react";

const DetailsPage = () => {
    const query = useSearchParams();
    const id = query.get('id');

    return (
        <PageLayout title={"Category Details"} isRoot={false}>
            <CategoryDetailsPage id={id!} />
        </PageLayout>
    )
}

export default DetailsPage;