import {usePathname, useRouter} from "next/navigation";
import {Button, Table} from "antd";
import React, {useEffect, useState} from "react";
import {ProductModel} from "@/models/product.model";
import ProductService from "@/services/product.service";
import {ProductConstant, VERIFICATION_PENDING_LIST_TABLE_HEADER} from "@/constants/product.constant";
import {DateTimeUtils} from "@/utils/date-time.utils";


const VerificationPendingTable = ({filterData}: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const [pendingList, setPendingList] = useState<ProductModel[]>([]);

    const getTableData = async () => {
        try {
            console.log(filterData)
            filterData.status = ProductConstant.PENDING;
            const response = await ProductService.getProductVerificationDetailsByFilter(filterData);
            setPendingList(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        getTableData().then()
    }, []);

    useEffect(() => {
        getTableData().then()
    }, [filterData]);

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
        <Table className="mt-4" columns={PRODUCT_PENDING_TABLE_HEADER} showSorterTooltip={false}
               dataSource={pendingList} rowKey="_id"/>
    )
}

export default VerificationPendingTable;