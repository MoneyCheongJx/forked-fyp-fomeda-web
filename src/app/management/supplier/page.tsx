"use client"

import React, {useEffect, useRef, useState} from "react";
import PageLayout from '@/app/page';
import { Spin, Segmented } from "antd";
import {SUPPLIERS_TAB_CONSTANTS} from "@/constants/suppliers.constant";
import PendingTabContent from "@/components/suppliers/PendingTabContent";
import ApprovedTabContent from "@/components/suppliers/ApprovedTabContent";
import RejectedTabContent from "@/components/suppliers/RejectedTabContent";
import { useAuth } from "@/app/(auth)/context/auth-context";
import { useRouter } from 'next/navigation';
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
        } else if (selected === 'rejected') {
            return (
                <RejectedTabContent setLoading={setLoading}/>
            );
        } else if (selected === 'approved') {
            return (
                <ApprovedTabContent setLoading={setLoading}/>
            );
        }
    };

    useEffect(() => {
        if (redirecting) return;
    }, [router]);

    return (
        <Spin spinning={loading}>
            <PageLayout title={"Suppliers Management"}>
                <div>
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
