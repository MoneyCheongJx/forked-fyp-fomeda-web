"use client"

import React, {useEffect, useState} from "react";
import PageLayout from '@/app/page';
import {Button, Col, Dropdown, Input, Row, Table, Tag, DatePicker, Spin} from "antd";
import {
    ANNOUNCEMENT_MANAGEMENT_TABLE_HEADER_CONSTANTS,
    ANNOUNCEMENT_MANAGEMENT_TABLE_ACTIONS_CONSTANTS
} from "@/constants/announcements.constant";
import AnnouncementService from "@/services/announcement.service";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import AddAnnouncementModal from "@/components/announcement/AddAnnouncementModal";
import EditAnnouncementModal from "@/components/announcement/EditAnnouncementModal";
import moment from 'moment';
import {DateTimeUtils} from "@/utils/date-time.utils";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/models/jwt.model";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/(auth)/context/auth-context";

const AnnouncementManagementPage = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any>([])
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [userData, setUserData] = useState<CustomJwtPayload>();
    const { redirecting } = useAuth();
    const {RangePicker} = DatePicker;
    const router = useRouter();

    const fetchData = async () => {
        try {
            const response = await AnnouncementService.getAllAnnouncements();
            setData(response);
            setFilteredData(response);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setUserData(jwtDecode<CustomJwtPayload>(token));
        }


        if (redirecting) {
            return;
        }
        if (!userData || !userData.modules?.includes('announcement_management')) {
            router.push('/content');
        } else {
            fetchData();
        }
    }, [router]);

    const showAddModal = () => {
        setAddModalVisible(true);
    };

    const unshowAddModal = () => {
        setAddModalVisible(false);
        fetchData();
    };

    const showEditModal = () => {
        setEditModalVisible(true);
    }

    const unshowEditModal = () => {
        setEditModalVisible(false);
        setSelectedRecord(null);
        fetchData();
    }

    const handleActionsOnClick = (key: string, record: any) => {
        if (key === 'edit_announcement') {
            setSelectedRecord(record);
            setEditModalVisible(true);
        } else if (key === 'hide_announcement') {
            updateVisibility(record._id, false);
        } else if (key === 'unhide_announcement') {
            updateVisibility(record._id, true);
        }
    }

    const handleSearch = (value: any) => {
        filterData(value, selectedDateRange);
    };

    const handleDateChange = (dates: any) => {
        setSelectedDateRange(dates);
        filterData(searchText, dates);
    };

    const filterData = (text: any, dates: any) => {
        const regex = new RegExp(text, 'i'); // 'i' for case-insensitive search
        const [start, end] = dates || [null, null];

        const filtered = data.filter(item => {
            const matchesText = regex.test(item.title);
            const created_on_date = moment(item.created_on).format('YYYY-MM-DD')

            const matchesDate = start && end ? moment(created_on_date)?.isBetween(start?.format('YYYY-MM-DD'), end?.format('YYYY-MM-DD'), null, '[]') : true;
            return matchesText && matchesDate;
        });
        setFilteredData(filtered);
    };

    const defineMenuItem = (record: any) => {
        return ANNOUNCEMENT_MANAGEMENT_TABLE_ACTIONS_CONSTANTS.map((item) => {
            if (record.visibility && item.key === 'unhide_announcement') {
                return null;
            }
            if (!record.visibility && item.key === 'hide_announcement') {
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

    const renderVisibility = (visibility: boolean) => {
        if (visibility)
            return <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Visible</Tag>
        else
            return <Tag color={'red'} bordered={false} className="px-3 py-0.5 rounded-xl">Invisible</Tag>
    }

    const updateVisibility = async (id: string, visibility: boolean) => {
        try {
            await AnnouncementService.updateAnnouncementVisibility(id, visibility);
        } catch (error) {
            console.error(error);
            throw error;
        }
        fetchData()
    }

    const TABLE_HEADER = ANNOUNCEMENT_MANAGEMENT_TABLE_HEADER_CONSTANTS.map((column) => {
        switch (column.key) {
            case 'actions':
                return {
                    ...column,
                    render: (text: any, record: any) => renderActionsDropdown(record)
                };
            case 'created_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key]),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
                };
            case 'visibility':
                return {
                    ...column,
                    render: (visibility: boolean) => renderVisibility(visibility),
                    onFilter: (value: any, record: any) => record.visibility === value,
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    });

    if (!userData || !userData.modules?.includes('announcement_management')) {
        return null;
    }

    return (
            <PageLayout title={"Announcement Management"}>
                <AddAnnouncementModal
                    visible={isAddModalVisible}
                    onClose={unshowAddModal}
                />
                <EditAnnouncementModal
                    visible={isEditModalVisible}
                    onClose={unshowEditModal}
                    data={selectedRecord}
                />
                <div>
                    <Row style={{justifyContent: "space-between", marginBottom: 16}}>
                        <Col style={{display: "flex", gap: "8px"}} span={16}>
                            <Input
                                placeholder="Search Announcement"
                                onChange={(e) => handleSearch(e.target.value ? [e.target.value] : [])}
                                prefix={<SearchOutlined/>}
                                size="large"
                                style={{width: '60%'}}
                            />
                            <RangePicker onChange={handleDateChange} style={{width: '25%'}}/>
                        </Col>

                        <Button type="primary" icon={<PlusOutlined/>} iconPosition="start"
                                onClick={showAddModal}>Add Announcement</Button>
                    </Row>
                    <Table
                        columns={TABLE_HEADER}
                        dataSource={filteredData.map((announcement: { _id: any; }) => {
                            const dataItem = {...announcement, key: announcement._id};
                            return dataItem;
                        })}
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

export default AnnouncementManagementPage;
