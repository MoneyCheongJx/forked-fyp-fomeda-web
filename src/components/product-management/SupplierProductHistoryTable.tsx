import {Button, Dropdown, Modal, Rate, Table, Tag, Typography} from "antd";
import {
    PRODUCT_HISTORY_LIST_TABLE_HEADER, SUPPLIER_HISTORY_LIST_ACTION_CONSTANT,
} from "@/constants/suppliers.constant";
import React, {useEffect, useState} from "react";
import ProductService from "@/services/product.service";
import {ProductModel} from "@/models/product.model";
import {ProductConstant} from "@/constants/product.constant";
import {useRouter} from "next/navigation";
import ProductConfirmationContent from "@/components/common/ProductConfirmationContent";
import Link from "next/link";

const SupplierProductHistoryTable = ({filterData}: any) => {
    const router = useRouter();
    const [historyList, setHistoryList] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(false);

    const handleConfirmationModelOpen = (key: string, record: any) => {
        if (key === 'view_product') {
            router.push(`product/view-product?v_id=${record._id}`)
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
            if (key === "resubmit") {
                record.verification_id = record._id;
                await ProductService.createProductVerification(record).then(getTableData).then(() => setLoading(false));
            } else if (key === "delete") {
                await ProductService.deleteProductVerificationDetailsById(record._id).then(getTableData).then(() => setLoading(false));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const defineMenuItem = (record: any) => {
        return SUPPLIER_HISTORY_LIST_ACTION_CONSTANT.map((item) => {
            if ((record.status === ProductConstant.PENDING && item.key === 'resubmit') ||
                (record.status === ProductConstant.APPROVED && item.key === 'delete')) {
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

    const getTableData = async () => {
        try {
            setLoading(true)
            filterData.status = null;
            const response = await ProductService.getProductVerificationListByFilter(filterData);
            setHistoryList(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        getTableData().then(() => setLoading(false))
    }, []);

    useEffect(() => {
        getTableData().then(() => setLoading(false))
    }, [filterData]);

    const PRODUCT_HISTORY_TABLE_HEADER = PRODUCT_HISTORY_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'product_name':
                return {
                    ...column,
                    render: (text: any, record: any) => (
                        <Link href={`product/view-product?v_id=${record._id}`}>{record.product_name}</Link>
                    )
                }
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


    return (
        <Table className="mt-4"
               columns={PRODUCT_HISTORY_TABLE_HEADER}
               showSorterTooltip={false}
               dataSource={historyList}
               rowKey="_id"
               loading={loading}
               pagination={{
                   defaultPageSize: 10,
                   showSizeChanger: true,
                   pageSizeOptions: [10, 20, 50, 100],
               }}/>
    )
}

export default SupplierProductHistoryTable;