"use client"

import React, {useEffect, useState} from "react";
import {Button, Col, Input, Row, Table, DatePicker} from "antd";
import {SUPPLIERS_PENDING_TAB_TABLE_HEADER_CONSTANTS} from "@/constants/suppliers.constant";
import AuthenticationService from "@/services/authentication.service";
import {SearchOutlined} from "@ant-design/icons";
import ReviewModal from "@/components/suppliers/ReviewModal";
import { DateTimeUtils } from "@/utils/date-time.utils";

interface PendingTabContentProps {
    setLoading: (loading: boolean) => void;
}

const PendingTabContent : React.FC<PendingTabContentProps> = ({setLoading}) => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [searchName, setSearchName] = useState('');
    const [searchCompany, setSearchCompany] = useState('');
    const [dateRange, setDateRange] = useState<[Date | null, Date | null] | null>([null, null]);
    const [isReviewModalVisible, setReviewModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const {RangePicker} = DatePicker;

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
    }, [searchName, searchCompany, dateRange, data]);

    const filterData = () => {
        const filtered = data.filter((supplier) => {
            const matchesName = searchName === '' || new RegExp(searchName, 'i').test(supplier.fullname)
            const matchesCompany = searchCompany === '' || new RegExp(searchCompany, 'i').test(supplier.company_name)

            const registerDate = new Date(supplier.registered_on);
            const [start, end] = dateRange || [null, null];
            const matchesDate = start && end ? registerDate >= start && registerDate <= end : true;
            
            return matchesName && matchesCompany && matchesDate;
        })
        setFilteredData(filtered);
    };

    const handleOnClick = (text: any, record: any) => {
        setSelectedRecord(record)
        setReviewModalVisible(true)
    }

    const TABLE_HEADER = SUPPLIERS_PENDING_TAB_TABLE_HEADER_CONSTANTS.map((column) => {
        switch(column.key) {
            case 'actions':
                return {
                    ...column,
                    render: (text: any, record: any) => (
                        <Button onClick={() => handleOnClick(text, record)}>Review</Button>
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
        <div>
            <ReviewModal
                visible={isReviewModalVisible}
                onClose={() => setReviewModalVisible(false)}
                data={selectedRecord}
                fetchData={fetchData}
            />
            <div style={{width: '100%'}}>
                <Row style={{marginBottom: 16}}>
                    <Col span={24} style={{display: "flex", gap: "8px"}}>
                        <Input
                            placeholder="Supplier name"
                            onChange={(e) => setSearchName(e.target.value)}
                            prefix={<SearchOutlined/>}
                            size="large"
                            style={{width: '20%'}}
                        />
                        <Input
                            placeholder="Trading company"
                            onChange={(e) => setSearchCompany(e.target.value)}
                            prefix={<SearchOutlined/>}
                            size="large"
                            style={{width: '49%'}}
                        />
                        <RangePicker onChange={(dates: any) => setDateRange(dates)}/>
                    </Col>
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
        </div>
    );
};

export default PendingTabContent;
