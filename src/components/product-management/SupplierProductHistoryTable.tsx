import {Button, Dropdown, Modal, Rate, Table, Tag, Typography} from "antd";
import {
    PRODUCT_HISTORY_LIST_TABLE_HEADER, SUPPLIER_HISTORY_LIST_ACTION_CONSTANT,
} from "@/constants/suppliers.constant";
import React, {useCallback, useEffect, useState} from "react";
import ProductService from "@/services/product.service";
import {ProductModel} from "@/models/product.model";
import {ProductConstant} from "@/constants/product.constant";
import {useRouter} from "next/navigation";
import ProductConfirmationContent from "@/components/common/ProductConfirmationContent";
import Link from "next/link";
import NotificationService from "@/services/notification.service";
import {StringUtils} from "@/utils/string.utils";
import {DateTimeUtils} from "@/utils/date-time.utils";

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

    const handleAfterAction = async (key: string, product: string) => {
        await getTableData().then(() => setLoading(false))
        NotificationService.success(
            `${StringUtils.formatTitleCase(key)} Product`,
            `${StringUtils.formatTitleCase(product)} has been ${key} successfully.` )
    }

    const handleActionsOnClick = async (key: string, record: any) => {
        try {
            if (key === "resubmit") {
                record.verification_id = record._id;
                await ProductService.createProductVerification(record).then(() => handleAfterAction(key, record.product_name));
            } else if (key === "delete") {
                await ProductService.deleteProductVerificationDetailsById(record._id).then(() => handleAfterAction(key, record.product_name));
            }
        } catch (error) {
            console.error(error);
            NotificationService.error(
                `${StringUtils.formatTitleCase(key)} Product`,
                `${StringUtils.formatTitleCase(record.product_name)} failed to ${key}.`
            )
        }
    }

    const defineMenuItem = (record: any) => {
        return SUPPLIER_HISTORY_LIST_ACTION_CONSTANT.map((item) => {
            if (record.status === ProductConstant.APPROVED && item.key === 'delete') {
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

    const getTableData = useCallback(async () => {
        try {
            setLoading(true)
            if(filterData.search){
                filterData.search = filterData.search.trim();
            }
            filterData.status = [ProductConstant.APPROVED, ProductConstant.REJECTED];
            filterData.is_supplier = true;
            const response = await ProductService.getProductVerificationListByFilter(await filterData);
            const sortedResponse = response.toSorted((a: any, b: any) => new Date(b.reviewed_on).getTime() - new Date(a.reviewed_on).getTime());
            setHistoryList(sortedResponse);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [filterData])

    useEffect(() => {
        getTableData().then()
    }, [getTableData]);

    const PRODUCT_HISTORY_TABLE_HEADER = PRODUCT_HISTORY_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'product_name':
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
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
            case 'reviewed_on':
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

    const renderStatus = (status: string) => {
        switch (status) {
            case ProductConstant.APPROVED: {
                return <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Approved</Tag>
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