"use client"

import React, {useState} from "react";
import PageLayout from '@/app/page';
import {Breadcrumb} from "antd";
import { Spin, Segmented } from "antd";
import {SUPPLIERS_TAB_CONSTANTS} from "@/constants/suppliers.constant";
import PendingTabContent from "@/components/suppliers/PendingTabContent";
import HistoryTabContent from "@/components/suppliers/HistoryTabContent";
import moment, {Moment} from 'moment';

const SupplierManagementPage = () => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<string>('pending');

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

    return (
        <Spin spinning={loading}>
            <PageLayout>
                <Breadcrumb items={[{title: 'Suppliers Management', href: '/management/supplier'}]}/>
                <h1 style={{marginBottom: 16}}>Suppliers Management</h1>
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
