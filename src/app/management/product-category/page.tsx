"use client"

import React, {useEffect, useState} from "react";
import PageLayout from '@/app/page';
import {Tabs} from "antd";
import {CATEGORY_TAB_CONSTANTS} from "@/constants/category.constant";
import CategoryTab from "@/components/product-category/CategoryTab";
import GeneralTab from "@/components/product-category/GeneralTab";

const CATEGORY_TAB_CONSTANT = CATEGORY_TAB_CONSTANTS.map((item) => ({
    key: item.key,
    label: item.label,
    children: item.key === "category" ? <CategoryTab /> : <GeneralTab />,
}));


const ProductPage = () => {
    const [activeTabKey, setActiveTabKey] = useState("category");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const savedTabKey = urlParams.get("tab");
        if (savedTabKey) {
            setActiveTabKey(savedTabKey);
        }
    }, []);

    useEffect(() => {
        const handlePopState = (event: any) => {
            if (event.state?.activeTabKey) {
                setActiveTabKey(event.state.activeTabKey);
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const handleTabChange = (key: string) => {
        setActiveTabKey(key);
        window.history.pushState({ activeTabKey: key }, "", `?tab=${key}`);
    };

    return (
        <PageLayout title={"Product Category"}>
            <Tabs activeKey={activeTabKey} items={CATEGORY_TAB_CONSTANT} size="small" onChange={handleTabChange} />
        </PageLayout>
    );
};

export default ProductPage;