"use client"

import React, {useEffect, useState} from "react";
import {Button, Col, Row, Table, DatePicker} from "antd";
import {ADMINS_MANAGEMENT_TABLE_HEADER_CONSTANTS} from "@/constants/admins.constant";
import AuthenticationService from "@/services/authentication.service";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import moment, {Moment} from 'moment';
import {DateTimeUtils} from "@/utils/date-time.utils";
import PageLayout from "@/app/page";
import AddAdminModal from "@/components/admins/AddAdminModal";
import EditAdminModal from "@/components/admins/EditAdminModal";

interface PendingTabContentProps {
    setLoading: (loading: boolean) => void;
}

const AdminManagementPage: React.FC<PendingTabContentProps> = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [searchName, setSearchName] = useState('');
    const [searchCompany, setSearchCompany] = useState('');
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const {RangePicker} = DatePicker;

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
            const response = await AuthenticationService.getInactiveSuppliers();
            setData(response)
            setFilteredData(response)
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchName, searchCompany, data]);

    const filterData = () => {
        const filtered = data.filter((supplier) => {
            const matchesName = searchName === '' || new RegExp(searchName, 'i').test(supplier.fullname)
            const matchesCompany = searchCompany === '' || new RegExp(searchCompany, 'i').test(supplier.company_name)
            return matchesName && matchesCompany;
        })
        setFilteredData(filtered);
    };

    const handleOnClick = (text: any, record: any) => {
        setSelectedRecord(record)
        setEditModalVisible(true);
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
            case 'registered_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key]),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
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
                    <Col style={{display: "flex", gap: "8px"}} span={16}>
                        {/*<Input*/}
                        {/*    placeholder="Admin name"*/}
                        {/*    onChange={(e) => setSearchName(e.target.value)}*/}
                        {/*    prefix={<SearchOutlined/>}*/}
                        {/*    size="large"*/}
                        {/*    style={{width: '20%'}}*/}
                        {/*/>*/}
                        {/*<Input*/}
                        {/*    placeholder="Admin email"*/}
                        {/*    onChange={(e) => setSearchCompany(e.target.value)}*/}
                        {/*    prefix={<SearchOutlined/>}*/}
                        {/*    size="large"*/}
                        {/*    style={{width: '49%'}}*/}
                        {/*/>*/}
                    </Col>
                    <Button type="primary" icon={<PlusOutlined/>} iconPosition="start"
                            onClick={showAddModal}>Add admin</Button>
                </Row>
                <Table
                    columns={TABLE_HEADER}
                    dataSource={filteredData.map((supplier: { _id: any; }) => ({
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

export default AdminManagementPage;
