import {Button, Col, Dropdown, Input, Rate, Row, Select, Table, Tag, Typography} from "antd";
import {PlusOutlined, SearchOutlined, StarFilled} from "@ant-design/icons";
import {
    SUPPLIER_PRODUCT_LIST_ACTION_CONSTANT,
    SUPPLIER_PRODUCT_LIST_TABLE_HEADER
} from "@/constants/suppliers.constant";
import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import ProductService from "@/services/product.service";
import {ProductModel} from "@/models/product.model";
import {ProductFilterModel} from "@/models/product-filter.model";
import {ProductConstant} from "@/constants/product.constant";

const SupplierProductPage = () => {

    const router = useRouter();
    const pathname = usePathname();
    const [searchFilter, setSearchFilter] = useState<ProductFilterModel>({});
    const [productList, setProductList] = useState<ProductModel[]>([]);

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
                searchFilter.status = ProductConstant.APPROVED;
                const response = await ProductService.getProductByFilter(searchFilter);
                setProductList(response);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        getTableData().then()
    }, [searchFilter]);

    const renderIsActive = (is_active: boolean) => (
        is_active ? <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag> :
            <Tag bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
    );

    const SUPPLIER_PRODUCT_TABLE_HEADER = SUPPLIER_PRODUCT_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'rating':
                return {
                    ...column,
                    render: (text: any, record: any) => <Rate disabled defaultValue={record.rating} allowHalf/>
                };
            case 'is_active':
                return {
                    ...column,
                    render: (is_active: boolean) => renderIsActive(is_active),
                    sorter: (a: any, b: any) => b.is_active - a.is_active,
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
                <Button type="primary" icon={<PlusOutlined/>} onClick={() => router.push(`${pathname}/add-product`)}>Add
                    Product</Button>
            </Row>
            <Table className="mt-4" columns={SUPPLIER_PRODUCT_TABLE_HEADER} showSorterTooltip={false}
                   dataSource={productList} rowKey="_id"/>
        </div>
    )
}

export default SupplierProductPage;