"use client"

import React, {useEffect, useState} from "react";
import PageLayout from "../page";
import {Col, Input, Row, DatePicker, Card, List, Typography} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import AnnouncementService from "@/services/announcement.service";
import {DateTimeUtils} from "@/utils/date-time.utils";
import {useRouter} from 'next/navigation';
import ViewAnnouncementModal from "@/components/announcement/ViewAnnouncementModal";

const {Text} = Typography;

const AnnouncementPage = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const [isViewModalVisible, setViewModalVisible] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [searchText, setSearchText] = useState('');
    const router = useRouter();
    const {RangePicker} = DatePicker;

    const fetchData = async () => {
        try {
            const response = await AnnouncementService.getVisibleAnnouncements();
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
        fetchData();
    }, [router]);

    const handleSearch = (value: any) => {
        filterData(value, selectedDateRange);
    };

    const handleDateChange = (dates: any) => {
        setSelectedDateRange(dates);
        filterData(searchText, dates);
    };

    const unshowViewModal = () => {
        setViewModalVisible(false);
        setSelectedRecord(null);
    }

    const filterData = (text: any, dates: any) => {
        const regex = new RegExp(text, 'i'); // 'i' for case-insensitive search
        const [start, end] = dates || [null, null];

        const filtered = data.filter(item => {
            const matchesText = regex.test(item.title);
            const createdOnDate = new Date(item.created_on);
            const matchesDate = start && end ? createdOnDate >= start && createdOnDate <= end : true;
            return matchesText && matchesDate;
        });
        setFilteredData(filtered);
    };

    const handleOnClick = (data: any) => {
        setSelectedRecord(data)
        setViewModalVisible(true);
    }

    return (
        <PageLayout title={"Announcements"}>
            <ViewAnnouncementModal
                visible={isViewModalVisible}
                onClose={unshowViewModal}
                data={selectedRecord}
            />
            <Row style={{justifyContent: "space-between", marginBottom: 16}}>
                <Col style={{display: "flex", gap: "8px"}} span={16}>
                    <Input
                        placeholder="Search Announcement"
                        onChange={(e) => handleSearch(e.target.value ? [e.target.value] : [])}
                        prefix={<SearchOutlined/>}
                        size="large"
                        style={{width: '60%'}}
                    />
                    <RangePicker onChange={handleDateChange} style={{width: '40%'}}/>
                </Col>
            </Row>
            <div className="custom-list" >
                <List
                    grid={{gutter: 16, column: 4}}
                    dataSource={filteredData}
                    renderItem={(item: any) => (
                        <List.Item>
                                <Card
                                    onClick={() => handleOnClick(item)}
                                    title={item?.title}
                                    cover={item?.file_uploaded?.length ? (
                                        <img alt={item?.title} src={item?.file_uploaded?.[0]?.thumbUrl}/>
                                    ) : null}
                                    hoverable
                                >
                                    <Text>{item?.description}<br/><br/></Text>
                                    <Text>{DateTimeUtils.formatDate(item?.created_on)}</Text>
                                </Card>
                        </List.Item>
                    )}
                />
            </div>
        </PageLayout>
    );
}

export default AnnouncementPage;
