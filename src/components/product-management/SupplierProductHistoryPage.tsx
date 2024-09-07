import {Button, Col, Dropdown, Input, Rate, Row, Select, Table, Tag, Typography} from "antd";
import {
    PRODUCT_HISTORY_LIST_TABLE_HEADER,
    SUPPLIER_PRODUCT_LIST_ACTION_CONSTANT,
    SUPPLIER_PRODUCT_LIST_TABLE_HEADER
} from "@/constants/suppliers.constant";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import ProductService from "@/services/product.service";
import {ProductFilterModel} from "@/models/product-filter.model";
import {ProductModel} from "@/models/product.model";
import {ProductConstant} from "@/constants/product.constant";

const SupplierProductHistoryPage = () => {
    const [searchFilter, setSearchFilter] = useState<ProductFilterModel>({});
    const [historyList, setHistoryList] = useState<ProductModel[]>([]);

    const renderActions = (record: any) => (
        <Dropdown menu={{items: defineMenuItem(record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

    const renderStatus = (status: string) => {
        switch (status) {
            case ProductConstant.APPROVED: {
                return <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Approved</Tag>
            }
            case ProductConstant.PENDING: {
                return <Tag color={'yellow'} bordered={false} className="px-3 py-0.5 rounded-xl">Pending</Tag>
            }
            case ProductConstant.REJECTED: {
                return <Tag color={'red'} bordered={false} className="px-3 py-0.5 rounded-xl">Rejected</Tag>
            }
        }
    };

    const defineMenuItem = (record: any) => {
        return SUPPLIER_PRODUCT_LIST_ACTION_CONSTANT.map((item) => {
            if ((record.is_active && item.key === 'activate') || (!record.is_active && item.key === 'deactivate')) {
                return null;
            }
            return {
                key: item.key,
                label: (
                    <Typography
                        // onClick={() => handleConfirmationModelOpen(item.key, record)}
                    >
                        {item.label}
                    </Typography>
                ),
            }
        }).filter(item => item !== null);
    };

    useEffect(() => {
        const getTableData = async () => {
            try {
                const response = await ProductService.getProductByFilter(searchFilter);
                setHistoryList(response);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        getTableData().then()
    }, [searchFilter]);

    const PRODUCT_HISTORY_TABLE_HEADER = PRODUCT_HISTORY_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'status':
                return {
                    ...column,
                    render: (text: any, record: any) => renderStatus(record.status)
                };
            case 'rating':
                return {
                    ...column,
                    render: (text: any, record: any) => <Rate disabled defaultValue={record.rating} allowHalf/>
                };
            case 'actions':
                return {
                    ...column,
                    render: (text: any, record: any) => renderActions(record),
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    })


    return (
        <div className="mt-4">
            <Row className="flex justify-between items-center space-x-3">
                <Col flex={"auto"}>
                    <Row className="flex space-x-3">
                        <Input prefix={<SearchOutlined/>} placeholder="Product Name / Model Number"
                               className="max-w-lg"/>
                        <Select placeholder="Category"/>
                        <Button type="primary">Search</Button>
                        <Button type="default">Reset</Button>
                    </Row>
                </Col>
                <Button type="primary" icon={<PlusOutlined/>}>Add Product</Button>
            </Row>
            <Table className="mt-4" columns={PRODUCT_HISTORY_TABLE_HEADER} showSorterTooltip={false}
                   dataSource={historyList} rowKey="_id"/>
        </div>
    )
}

export default SupplierProductHistoryPage;