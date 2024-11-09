"use client"

import React, {useEffect, useState} from "react";
import {Button, Col, Row, Table} from "antd";
import {ADMINS_MANAGEMENT_TABLE_HEADER_CONSTANTS} from "@/constants/admins.constant";
import AuthenticationService from "@/services/authentication.service";
import {PlusOutlined} from "@ant-design/icons";
import {DateTimeUtils} from "@/utils/date-time.utils";
import PageLayout from "@/app/page";
import AddAdminModal from "@/components/admins/AddAdminModal";
import EditAdminModal from "@/components/admins/EditAdminModal";
import { useAuth } from "@/app/(auth)/context/auth-context";
import { useRouter } from 'next/navigation';
import { Tag } from "antd/lib";

const AdminManagementPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [searchName, setSearchName] = useState('');
    const [searchCompany, setSearchCompany] = useState('');
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const router = useRouter();

    const showEditModal = () => {
        setEditModalVisible(true);
    }

    const unshowEditModal = () => {
        setEditModalVisible(false);
        setSelectedRecord(null);
        fetchData();
    }

    const unshowAddModal = () => {
        setAddModalVisible(false);
        fetchData();
    };

    const showAddModal = () => {
        setAddModalVisible(true);
    };
    
    const fetchData = async () => {
        try {
            const response = await AuthenticationService.getAdmins();
            setData(response)
            setFilteredData(response)
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [router]);

    useEffect(() => {
        const filterData = () => {
            const filtered = data.filter((admin) => {
                const matchesName = searchName === '' || new RegExp(searchName, 'i').test(admin.fullname)
                const matchesCompany = searchCompany === '' || new RegExp(searchCompany, 'i').test(admin.company_name)
                return matchesName && matchesCompany;
            })
            setFilteredData(filtered);
        };

        filterData();
    }, [searchName, searchCompany, data]);


    const handleOnClick = (text: any, record: any) => {
        setSelectedRecord(record)
        setEditModalVisible(true);
    }

    const renderStatus = (status: boolean) => {
        if (status)
            return <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag>
        else
            return <Tag color={'red'} bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
    }

    const TABLE_HEADER = ADMINS_MANAGEMENT_TABLE_HEADER_CONSTANTS.map((column) => {
        switch (column.key) {
            case 'actions':
                return {
                    ...column,
                    render: (text: any, record: any) => (
                        <Button onClick={() => handleOnClick(text, record)}>Edit</Button>
                    )
                };
            case 'created_on':
            case 'last_updated_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key]),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
                };
            case 'is_active':
                return {
                    ...column,
                    render: (is_active: boolean) => renderStatus(is_active),
                    onFilter: (value: any, record: any) => record.is_active === value,
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    });

    return (
        <PageLayout title={"Admins Management"}>
            <AddAdminModal
                visible={isAddModalVisible}
                onClose={unshowAddModal}
            />
            <EditAdminModal
                visible={isEditModalVisible}
                onClose={unshowEditModal}
                data={selectedRecord}
            />
            <div style={{width: '100%'}}>
                <Row style={{justifyContent: "space-between", marginBottom: 16}}>
                    <Col style={{display: "flex", gap: "8px"}} span={16}></Col>
                    <Button type="primary" icon={<PlusOutlined/>} iconPosition="start"
                            onClick={showAddModal}>Add admin</Button>
                </Row>
                <Table
                    columns={TABLE_HEADER}
                    dataSource={filteredData.map((admin: { _id: any; }) => ({
                        ...admin,
                        key: admin._id,
                    }))}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: [10, 20, 50, 100],
                    }}
                    showSorterTooltip={false}
                />
            </div>
        </PageLayout>
    );
};

export default AdminManagementPage;
