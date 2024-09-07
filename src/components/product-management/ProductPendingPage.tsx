import {Button, Col, Dropdown, Input, Modal, Row, Select, Table, Typography} from "antd";
import {
    PRODUCT_PENDING_LIST_TABLE_HEADER,
    SUPPLIER_PRODUCT_LIST_ACTION_CONSTANT,
} from "@/constants/suppliers.constant";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {ProductConstant} from "@/constants/product.constant";
import ProductService from "@/services/product.service";
import {ProductFilterModel} from "@/models/product-filter.model";
import {ProductModel} from "@/models/product.model";
import {DateTimeUtils} from "@/utils/date-time.utils";
import {useRouter} from "next/navigation";

const ProductPendingPage = () => {
    const router = useRouter();
    const [searchFilter, setSearchFilter] = useState<ProductFilterModel>({});
    const [pendingList, setPendingList] = useState<ProductModel[]>([]);

    const renderActions = (record: any) => (
        <Dropdown menu={{items: defineMenuItem(record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

    const handleConfirmationModelOpen = (key: string, record: any) => {
        if (key === 'view_product') {
            router.push(`product/view-product?id=${record._id}`)
        } else {
            return null;
            // return Modal.confirm({
            //     title: <h3>Confirmation</h3>,
            //     content: <ConfirmationContent action={key} record={record}/>,
            //     className: "confirmation-modal",
            //     centered: true,
            //     width: "35%",
            //     okText: "Confirm",
            //     onOk: () => handleActionsOnClick(key, record),
            // })
        }
    }

    const defineMenuItem = (record: any) => {
        return SUPPLIER_PRODUCT_LIST_ACTION_CONSTANT.map((item) => {
            if ((record.is_active && item.key === 'activate') || (!record.is_active && item.key === 'deactivate')) {
                return null;
            }
            return {
                key: item.key,
                label: (
                    <Typography onClick={() => handleConfirmationModelOpen(item.key, record)}>
                        {item.label}
                    </Typography>
                ),
            }
        }).filter(item => item !== null);
    };

    useEffect(() => {
        const getTableData = async () => {
            try {
                searchFilter.status = ProductConstant.PENDING;
                const response = await ProductService.getProductByFilter(searchFilter);
                setPendingList(response);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        getTableData().then()
    }, [searchFilter]);

    const PRODUCT_PENDING_TABLE_HEADER = PRODUCT_PENDING_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'last_updated_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key], DateTimeUtils.CATEGORY_DATE_FORMAT),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
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
            <Table className="mt-4" columns={PRODUCT_PENDING_TABLE_HEADER} showSorterTooltip={false}
                   dataSource={pendingList} rowKey="_id"/>
        </div>
    )
}

export default ProductPendingPage;