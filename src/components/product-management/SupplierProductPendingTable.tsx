import {Button, Dropdown, Modal, Table, Typography} from "antd";
import {
    PRODUCT_PENDING_LIST_TABLE_HEADER, SUPPLIER_PENDING_LIST_ACTION_CONSTANT,
} from "@/constants/suppliers.constant";
import React, {useEffect, useState} from "react";
import {ProductConstant} from "@/constants/product.constant";
import ProductService from "@/services/product.service";
import {ProductModel} from "@/models/product.model";
import {DateTimeUtils} from "@/utils/date-time.utils";
import {useRouter} from "next/navigation";
import ProductConfirmationContent from "@/components/common/ProductConfirmationContent";
import Link from "next/link";

const SupplierProductPendingTable = ({filterData}: any) => {
    const router = useRouter();
    const [pendingList, setPendingList] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(false);

    const handleConfirmationModelOpen = (key: string, record: any) => {
        if (key === 'view_product') {
            router.push(`product/view-product?id=${record._id}`)
        } else {
            return Modal.confirm({
                title: <h3>Confirmation</h3>,
                content: <ProductConfirmationContent action={key} record={record} details={"product"}/>,
                className: "confirmation-modal",
                centered: true,
                width: "35%",
                okText: "Confirm",
                onOk: () => handleActionsOnClick(key, record),
            })
        }
    }

    const handleActionsOnClick = async (key: string, record: any) => {
        try {
            await ProductService.deleteProductById(record._id).then(getTableData);
        } catch (error) {
            console.error(error);
        }
    }

    const defineMenuItem = (record: any) => {
        return SUPPLIER_PENDING_LIST_ACTION_CONSTANT.map((item) => {
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

    const getTableData = async () => {
        try {
            setLoading(true)
            filterData.status = [ProductConstant.PENDING];
            const response = await ProductService.getProductByFilter(filterData);
            setPendingList(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        getTableData().then(() => setLoading(false));
    }, []);

    useEffect(() => {
        getTableData().then(() => setLoading(false));
    }, [filterData]);

    const PRODUCT_PENDING_TABLE_HEADER = PRODUCT_PENDING_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'product_name':
                return {
                    ...column,
                    render: (text: any, record: any) => (
                        <Link href={`product/view-product?id=${record._id}`}>{record.product_name}</Link>
                    )
                }
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

    const renderActions = (record: any) => (
        <Dropdown menu={{items: defineMenuItem(record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

    return (
        <Table className="mt-4"
               columns={PRODUCT_PENDING_TABLE_HEADER}
               showSorterTooltip={false}
               dataSource={pendingList}
               rowKey="_id"
               loading={loading}
               pagination={{
                   defaultPageSize: 10,
                   showSizeChanger: true,
                   pageSizeOptions: [10, 20, 50, 100],
               }}/>
    )
}

export default SupplierProductPendingTable;