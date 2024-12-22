import {Button, Dropdown, Modal, Rate, Table, Tag, Typography} from "antd";
import {
    SUPPLIER_PRODUCT_LIST_ACTION_CONSTANT,
    SUPPLIER_PRODUCT_LIST_TABLE_HEADER
} from "@/constants/suppliers.constant";
import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ProductService from "@/services/product.service";
import {ProductModel} from "@/models/product.model";
import ProductConfirmationContent from "@/components/common/ProductConfirmationContent";
import Link from "next/link";
import NotificationService from "@/services/notification.service";
import {StringUtils} from "@/utils/string.utils";
import {DateTimeUtils} from "@/utils/date-time.utils";


const SupplierProductTable = ({filterData}: any) => {
    const router = useRouter();
    const [productList, setProductList] = useState<ProductModel[]>([]);
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

    const handleAfterAction = async (key: string, product: string) => {
        await getTableData().then(() => setLoading(false))
        NotificationService.success(
            `${StringUtils.formatTitleCase(key)} Product`,
            `${StringUtils.formatTitleCase(product)} has been ${key} successfully.` )
    }

    const handleActionsOnClick = async (key: string, record: any) => {
        try {
            if (key === "activate") {
                await ProductService.updateProductIsActive(record._id).then(() => handleAfterAction(key, record.product_name));
            } else if (key === "deactivate") {
                await ProductService.updateProductIsActive(record._id).then(() => handleAfterAction(key, record.product_name));
            } else if (key === "delete") {
                await ProductService.deleteProductById(record._id).then(() => handleAfterAction(key, record.product_name));
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

    const getTableData = useCallback(async () => {
        try {
            setLoading(true);
            if(filterData.search){
                filterData.search = filterData.search.trim();
            }
            const response = await ProductService.getProductListByFilter(filterData);
            const sortedResponse = response.toSorted((a: any, b: any) => a.product_name.localeCompare(b.product_name));
            setProductList(sortedResponse);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [filterData])

    useEffect(() => {
        getTableData().then();
    }, [getTableData]);

    const renderActions = (record: any) => (
        <Dropdown menu={{items: defineMenuItem(record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

    const renderIsActive = (is_active: boolean) => (
        is_active ? <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag> :
            <Tag bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
    );

    const SUPPLIER_PRODUCT_TABLE_HEADER = SUPPLIER_PRODUCT_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'product_name':
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                    render: (text: any, record: any) => (
                        <Link href={`product/view-product?id=${record._id}`}>{record.product_name}</Link>
                    )
                }
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
        <Table className="mt-4"
               columns={SUPPLIER_PRODUCT_TABLE_HEADER}
               showSorterTooltip={false}
               dataSource={productList}
               rowKey="_id"
               loading={loading}
               pagination={{
                   defaultPageSize: 10,
                   showSizeChanger: true,
                   pageSizeOptions: [10, 20, 50, 100],
               }}/>
    )
}

export default SupplierProductTable;