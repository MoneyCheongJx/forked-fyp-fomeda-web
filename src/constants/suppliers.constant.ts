import moment from 'moment';

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

export const SUPPLIERS_PENDING_TAB_TABLE_HEADER_CONSTANTS = [
    {
        key: "fullname",
        title: "Supplier name",
        dataIndex: "fullname",
        width: "20%",
    },
    {
        key: "company_name",
        title: "Trading company",
        dataIndex: "company_name",
    },
    {
        key: "registered_on",
        title: "Registered date",
        dataIndex: "registered_on",
        width: "15%",
    },
    {
        key: "actions",
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

export const SUPPLIERS_HISTORY_TAB_TABLE_HEADER_CONSTANTS = [
    {
        key: "fullname",
        title: "Supplier name",
        dataIndex: "fullname",
        width: "20%",
    },
    {
        key: "company_name",
        title: "Trading company",
        dataIndex: "company_name",
    },
    {
        key: "approved_on",
        title: "Approval date",
        dataIndex: "approved_on",
        width: "15%",
    },
    {
        key: "actions",
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