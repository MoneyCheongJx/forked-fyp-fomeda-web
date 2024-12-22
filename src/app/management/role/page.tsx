"use client"

import React, {useEffect, useState} from "react";
import {Button, Col, Row, Table, Dropdown, Tag} from "antd";
import {
    ROLES_MANAGEMENT_TABLE_ACTIONS_CONSTANTS,
    ROLES_MANAGEMENT_TABLE_HEADER_CONSTANTS
} from "@/constants/roles.constant";
import RoleService from "@/services/role.service";
import {PlusOutlined} from "@ant-design/icons";
import {DateTimeUtils} from "@/utils/date-time.utils";
import PageLayout from "@/app/page";
import AddRoleModal from "@/components/roles/AddRoleModal";
import EditRoleModal from "@/components/roles/EditRoleModal";
import ConfirmModal from "@/components/roles/ConfirmModal";
import { useAuth } from "@/app/(auth)/context/auth-context";
import { useRouter } from 'next/navigation';
import { CustomJwtPayload } from "@/models/jwt.model"

type ConfirmType = 'activate' | 'deactivate';

const RoleManagementPage = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
    const [confirmType, setConfirmType] = useState<ConfirmType | undefined>(undefined);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [userData, setUserData] = useState<CustomJwtPayload>();
    const router = useRouter();

    const showEditModal = () => {
        setEditModalVisible(true);
    }

    const unshowEditModal = () => {
        setEditModalVisible(false);
        setSelectedRecord(null);
        fetchData();
    }

    const showAddModal = () => {
        setAddModalVisible(true);
    };

    const unshowAddModal = () => {
        setAddModalVisible(false);
        fetchData();
    };

    const showConfirmModal = () => {
        setConfirmModalVisible(true);
    };

    const unshowConfirmModal = () => {
        setConfirmModalVisible(false);
        fetchData();
    };

    const fetchData = async () => {
        try {
            const response = await RoleService.getAllRoles();
            setData(response)
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [router]);

    const handleActionsOnClick = (key: string, record: any) => {
        if (key === 'edit_role') {
            setSelectedRecord(record);
            showEditModal();
        } else if (key === 'activate_role') {
            setSelectedRecord(record)
            setConfirmType("activate");
            showConfirmModal();
        } else if (key === 'deactivate_role') {
            setSelectedRecord(record);
            setConfirmType("deactivate");
            showConfirmModal();
        }
    }

    const defineMenuItem = (record: any) => {
        return ROLES_MANAGEMENT_TABLE_ACTIONS_CONSTANTS.map((item) => {
            if (record.is_active && item.key === 'activate_role') {
                return null;
            }
            if (!record.is_active && item.key === 'deactivate_role') {
                return null;
            }

            return {
                key: item.key,
                label: (
                    <div onClick={() => handleActionsOnClick(item.key, record)}>
                        {item.label}
                    </div>
                ),
            };
        }).filter(item => item !== null);
    };

    const renderActionsDropdown = (record: any) => (
        <Dropdown menu={{items: defineMenuItem(record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

    const renderStatus = (is_active: boolean) => {
        if (is_active)
            return <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag>
        else
            return <Tag color={'red'} bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
    }

    const updateStatus = async (id: string, is_active: boolean) => {
        try {
            await RoleService.updateRole(id, {is_active});
        } catch (error) {
            console.error(error);
            throw error;
        }
        setConfirmModalVisible(false);
        fetchData()
    }

    const TABLE_HEADER = ROLES_MANAGEMENT_TABLE_HEADER_CONSTANTS.map((column) => {
        switch (column.key) {
            case 'actions':
                return {
                    ...column,
                    render: (text: any, record: any) => renderActionsDropdown(record)
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
        <PageLayout title={"Roles Management"}>
            <AddRoleModal
                visible={isAddModalVisible}
                onClose={unshowAddModal}
            />
            <EditRoleModal
                visible={isEditModalVisible}
                onClose={unshowEditModal}
                data={selectedRecord}
            />
            <ConfirmModal
                data={selectedRecord}
                type={confirmType}
                isOpen={isConfirmModalVisible}
                onSubmit={updateStatus}
                onCancel={unshowConfirmModal}
            />

            <div style={{width: '100%'}}>
                <Row style={{justifyContent: "space-between", marginBottom: 16}}>
                    <Col style={{display: "flex", gap: "8px"}} span={16}>
                    </Col>
                    <Button type="primary" icon={<PlusOutlined/>} iconPosition="start"
                            onClick={showAddModal}>Add role</Button>
                </Row>
                <Table
                    columns={TABLE_HEADER}
                    dataSource={data.map((supplier: { _id: any; }) => ({
                        ...supplier,
                        key: supplier._id,
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

export default RoleManagementPage;
