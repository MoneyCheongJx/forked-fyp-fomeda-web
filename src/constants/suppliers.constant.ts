import moment from 'moment';
import type {ColumnType} from 'antd/es/table';

export const SUPPLIERS_TAB_CONSTANTS = [
    {
        label: 'Pending',
        value: 'pending',
    },
    {
        label: 'History',
        value: 'history',
    },
]

export const SUPPLIERS_PENDING_TAB_TABLE_HEADER_CONSTANTS: ColumnType<any>[] = [
    {
        key: "fullname",
        title: "Supplier name",
        dataIndex: "fullname",
        width: "20%",
        sorter: (a: any, b: any) => {
            const firstCharA = a.fullname.charAt(0).toLowerCase();
            const firstCharB = b.fullname.charAt(0).toLowerCase();
            return firstCharA.localeCompare(firstCharB);
        },
    },
    {
        key: "company_name",
        title: "Trading company",
        dataIndex: "company_name",
        sorter: (a: any, b: any) => {
            const firstCharA = a.company_name.charAt(0).toLowerCase();
            const firstCharB = b.company_name.charAt(0).toLowerCase();
            return firstCharA.localeCompare(firstCharB);
        },
    },
    {
        key: "registered_on",
        title: "Registered date",
        dataIndex: "registered_on",
        width: "15%",
        render: (text: any) => moment(text).format('DD-MM-YYYY'),
        sorter: (a: any, b: any) => {
            const dateA = moment(a.created_on);
            const dateB = moment(b.created_on);
            return dateB.valueOf() - dateA.valueOf();
        },
    },
    {
        key: "actions",
        align: 'center',
        title: "Actions",
        width: "15%",
    }
]

export const SUPPLIERS_REVIEW_MODAL_LABEL_MAPPING: Record<string, string> = {
    "fullname": "Supplier name",
    "username": "Supplier username",
    "email_address": "Supplier email address",
    "company_name": "Trading company",
    "company_no": "Trading company no",
    "company_address": "Trading company address",
    "registered_on": "Registered date",
};

export const SUPPLIERS_HISTORY_TAB_TABLE_HEADER_CONSTANTS: ColumnType<any>[] = [
    {
        key: "fullname",
        title: "Supplier name",
        dataIndex: "fullname",
        width: "20%",
        sorter: (a: any, b: any) => {
            const firstCharA = a.fullname.charAt(0).toLowerCase();
            const firstCharB = b.fullname.charAt(0).toLowerCase();
            return firstCharA.localeCompare(firstCharB);
        },
    },
    {
        key: "company_name",
        title: "Trading company",
        dataIndex: "company_name",
        sorter: (a: any, b: any) => {
            const firstCharA = a.company_name.charAt(0).toLowerCase();
            const firstCharB = b.company_name.charAt(0).toLowerCase();
            return firstCharA.localeCompare(firstCharB);
        },
    },
    {
        key: "approved_on",
        title: "Approval date",
        dataIndex: "approved_on",
        width: "15%",
        render: (text: any) => moment(text).format('DD-MM-YYYY'),
        sorter: (a: any, b: any) => {
            const dateA = moment(a.created_on);
            const dateB = moment(b.created_on);
            return dateB.valueOf() - dateA.valueOf();
        },
    },
    {
        key: "actions",
        align: 'center',
        title: "Actions",
        width: "15%",
    }
]

export const SUPPLIERS_VIEW_MODAL_LABEL_MAPPING: Record<string, string> = {
    "fullname": "Supplier name",
    "username": "Supplier username",
    "email_address": "Supplier email address",
    "company_name": "Trading company",
    "company_no": "Trading company no",
    "company_address": "Trading company address",
    "registered_on": "Registered date",
    "approved_by": "Approved by",
    "approved_on": "Approved date",
};