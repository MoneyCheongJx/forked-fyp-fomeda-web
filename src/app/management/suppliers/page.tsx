"use client"

import React, {useEffect, useRef, useState} from "react";
import PageLayout from '@/app/page';
import { Spin, Segmented } from "antd";
import {SUPPLIERS_TAB_CONSTANTS} from "@/constants/suppliers.constant";
import PendingTabContent from "@/components/suppliers/PendingTabContent";
import HistoryTabContent from "@/components/suppliers/HistoryTabContent";
import { useAuth } from "@/app/(auth)/context/auth-context";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/models/jwt.model";

const SupplierManagementPage = () => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<string>('pending');
    const [userData, setUserData] = useState<CustomJwtPayload>();
    const { redirecting } = useAuth();
    const router = useRouter();

    const handleChange = (value: string) => {
        setSelected(value);
    };

    const renderTab = () => {
        if (selected === 'pending') {
            return (
                <PendingTabContent setLoading={setLoading}/>
            );
        } else if (selected === 'history') {
            return (
                <HistoryTabContent setLoading={setLoading}/>
            );
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setUserData(jwtDecode<CustomJwtPayload>(token));
        }

        if (redirecting) {
            return;
        }
        else if (!userData || !userData.modules?.includes('supplier_management')) {
            router.push('/content');
        }
    }, [router]);

    if (!userData || !userData.modules?.includes('supplier_management')) {
        return null;
    }

    return (
        <Spin spinning={loading}>
            <PageLayout title={"Suppliers Management"}>
                <div style={{ width: 250, height: 46, padding: 0, margin: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Segmented
                        options={SUPPLIERS_TAB_CONSTANTS}
                        value={selected}
                        onChange={handleChange}
                        style={{ marginBottom: 16, padding: 0}}
                    />
                </div>
                {renderTab()}
            </PageLayout>
        </Spin>
    );
};

export default SupplierManagementPage;
