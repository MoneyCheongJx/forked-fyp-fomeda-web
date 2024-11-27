import {usePathname, useRouter} from "next/navigation";
import {Button, Table} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {ProductModel} from "@/models/product.model";
import ProductService from "@/services/product.service";
import {ProductConstant, VERIFICATION_PENDING_LIST_TABLE_HEADER} from "@/constants/product.constant";
import {DateTimeUtils} from "@/utils/date-time.utils";


const VerificationPendingTable = ({filterData}: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const [pendingList, setPendingList] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(false);

    const getTableData = useCallback(async () => {
        try {
            setLoading(true)
            if(filterData.search){
                filterData.search = filterData.search.trim();
            }
            filterData.status = [ProductConstant.PENDING];
            filterData.is_supplier = false;
            const response = await ProductService.getProductVerificationListByFilter(await filterData);
            const sortedResponse = response.toSorted((a: any, b: any) => new Date(b.last_updated_on).getTime() - new Date(a.last_updated_on).getTime());
            setPendingList(sortedResponse);
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

    const PRODUCT_PENDING_TABLE_HEADER = VERIFICATION_PENDING_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'last_updated_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key], DateTimeUtils.CATEGORY_DATE_FORMAT),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
                };
            case 'action':
                return {
                    ...column,
                    render: (text: any, record: any) =>
                        <Button onClick={() => router.push(`${pathname}/review?id=${record._id}`)}>Review</Button>,
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

export default VerificationPendingTable;