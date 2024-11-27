import {usePathname, useRouter} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {ProductModel} from "@/models/product.model";
import {
    ProductConstant,
    VERIFICATION_HISTORY_LIST_TABLE_HEADER,
} from "@/constants/product.constant";
import ProductService from "@/services/product.service";
import {DateTimeUtils} from "@/utils/date-time.utils";
import {Button, Table, Tag} from "antd";

const VerificationHistoryTable = ({filterData}: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const [historyList, setHistoryList] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(false);

    const getTableData = useCallback(async () => {
        try {
            setLoading(true)
            if(filterData.search){
                filterData.search = filterData.search.trim();
            }
            filterData.status = [ProductConstant.REJECTED, ProductConstant.APPROVED];
            filterData.is_supplier = false;
            const response = await ProductService.getProductVerificationListByFilter(await filterData);
            const sortedResponse = response.toSorted((a: any, b: any) => new Date(b.reviewed_on).getTime() - new Date(a.reviewed_on).getTime());
            setHistoryList(sortedResponse);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [filterData]);

    useEffect(() => {
        getTableData().then()
    }, [getTableData]);

    const PRODUCT_PENDING_TABLE_HEADER = VERIFICATION_HISTORY_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'reviewed_on':
            case 'last_updated_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key], DateTimeUtils.CATEGORY_DATE_FORMAT),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
                };
            case 'status':
                return {
                    ...column,
                    render: (text: any, record: any) => renderStatus(record.status)
                };
            case 'action':
                return {
                    ...column,
                    render: (text: any, record: any) =>
                        <Button onClick={() => router.push(`${pathname}/details?id=${record._id}`)}>View
                            Details</Button>,
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    })

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
               columns={PRODUCT_PENDING_TABLE_HEADER}
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

export default VerificationHistoryTable;