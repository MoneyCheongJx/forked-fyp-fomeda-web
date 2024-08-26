"use client"

import {usePathname,} from "next/navigation";
import CategoryDetailsPage from "@/components/product-category/CategoryDetailsPage";
import PageLayout from "@/app/page";
import React from "react";

const DetailsPage = () => {
    const pathname = usePathname();
    const id = pathname.substring(pathname.lastIndexOf("/") + 1);

    return (
        <PageLayout title={"Category Details"}>
            <CategoryDetailsPage id={id} />
        </PageLayout>
    )
}

export default DetailsPage;