"use client"

import PageLayout from "@/app/page";
import ProductForm from "@/components/product-management/ProductForm";
import {useSearchParams} from "next/navigation";

const AddProductPage = () => {
    const query = useSearchParams();
    const id = query.get("id");
    const v_id = query.get("v_id");

    return (
        <PageLayout title="Product Details">
            <ProductForm type={"view"} productId={id!} verificationId={v_id!}/>
        </PageLayout>
    )
}

export default AddProductPage;