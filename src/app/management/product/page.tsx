"use client"

import PageLayout from "@/app/page";
import {Segmented} from "antd";
import {SUPPLIER_PRODUCT_MANAGEMENT_TAB} from "@/constants/suppliers.constant";
import {useState} from "react";
import ProductPendingPage from "@/components/product-management/ProductPendingPage";
import SupplierProductPage from "@/components/product-management/SupplierProductPage";
import SupplierProductHistoryPage from "@/components/product-management/SupplierProductHistoryPage";

const ProductManagementPage = () => {
    const [segmentedTab, setSegmentedTab] = useState(SUPPLIER_PRODUCT_MANAGEMENT_TAB[0].value)

    const handleSegmentedChange = (value: any) => {
        setSegmentedTab(value);
    };

    return (
        <PageLayout title="Product Management">
            <Segmented options={SUPPLIER_PRODUCT_MANAGEMENT_TAB} onChange={handleSegmentedChange} value={segmentedTab}/>
            {segmentedTab === "product" && (<SupplierProductPage />)}
            {segmentedTab === "pending" && (<ProductPendingPage />)}
            {segmentedTab === "history" && (<SupplierProductHistoryPage />)}
        </PageLayout>
    )
}

export default ProductManagementPage;