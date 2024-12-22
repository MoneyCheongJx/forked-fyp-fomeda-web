export const SUPPLIERS_TAB_CONSTANTS = [
    {
        label: 'Pending',
        value: 'pending',
    },
    {
        label: 'Rejected',
        value: 'rejected',
    },
    {
        label: 'Approved',
        value: 'approved',
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
        title: "Approved on",
        dataIndex: "approved_on",
        width: "15%",
    },
    {
        key: "approved_by",
        title: "Approved by",
        dataIndex: "approved_by",
        width: "15%",
    },
    {
        key: "actions",
        title: "Actions",
        width: "10%",
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
    "last_rejected_by": "Last rejected by",
    "last_rejected_on": "Last rejected date"
};

export const SUPPLIERS_REJECTED_TAB_TABLE_HEADER_CONSTANTS = [
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
        key: "last_rejected_on",
        title: "Last rejected on",
        dataIndex: "last_rejected_on",
        width: "15%",
    },
    {
        key: "last_rejected_by",
        title: "Last rejected by",
        dataIndex: "last_rejected_by",
        width: "15%",
    },
    {
        key: "actions",
        title: "Actions",
        width: "10%",
    }
]

export const REJECTION_HISTORY_TABLE_HEADER_CONSTANTS = [
    {
        key: "reason",
        title: "Reason",
        dataIndex: "reason",
        width: "60%",
    },
    {
        key: "rejected_on",
        title: "Rejected on",
        dataIndex: "rejected_on",
        width: "20%",
    },
    {
        key: "rejected_by",
        title: "Rejected by",
        dataIndex: "rejected_by",
        width: "20%",
    },
]

export const SUPPLIER_PRODUCT_MANAGEMENT_TAB = [
    {key: "product", label: "Product", value: "product"},
    {key: "pending", label: "Pending", value: "pending"},
    {key: "history", label: "History", value: "history"},
    {key: "report", label: "Report", value: "report"},
]

export const SUPPLIER_PRODUCT_LIST_TABLE_HEADER = [
    {key: "product_name", title: "Product Name", dataIndex: "product_name", width: "30%"},
    {key: "model_no", title: "Model No", dataIndex: "model_no", width: "10%"},
    {key: "cat_name", title: "Category", dataIndex: "cat_name", width: "10%"},
    {key: "subcat_name", title: "Subcategory", dataIndex: "subcat_name", width: "10%"},
    {key: "rating", title: "Rating", dataIndex: "rating", width: "10%"},
    {key: "last_updated_on", title: "Last Updated", dataIndex: "last_updated_on", width: "10%"},
    {key: "is_active", title: "Active", dataIndex: "is_active", width: "10%"},
    {key: "actions", title: "Actions", dataIndex: "action", width: "10%"},
]

export const PRODUCT_PENDING_LIST_TABLE_HEADER = [
    {key: "product_name", title: "Product Name", dataIndex: "product_name", width: "50%"},
    {key: "model_no", title: "Model No", dataIndex: "model_no", width: "10%"},
    {key: "cat_name", title: "Category", dataIndex: "cat_name", width: "10%"},
    {key: "subcat_name", title: "Subcategory", dataIndex: "subcat_name", width: "10%"},
    {key: "last_updated_on", title: "Last Updated", dataIndex: "last_updated_on", width: "10%"},
    {key: "actions", title: "Actions", dataIndex: "action", width: "10%"},
]

export const PRODUCT_HISTORY_LIST_TABLE_HEADER = [
    {key: "product_name", title: "Product Name", dataIndex: "product_name", width: "30%"},
    {key: "model_no", title: "Model No", dataIndex: "model_no", width: "10%"},
    {key: "cat_name", title: "Category", dataIndex: "cat_name", width: "10%"},
    {key: "subcat_name", title: "Subcategory", dataIndex: "subcat_name", width: "10%"},
    {key: "rating", title: "Rating", dataIndex: "rating", width: "10%"},
    {key: "reviewed_on", title: "Reviewed on", dataIndex: "reviewed_on", width: "10%"},
    {key: "status", title: "Status", dataIndex: "status", width: "10%"},
    {key: "actions", title: "Actions", dataIndex: "action", width: "10%"},
]

export const SUPPLIER_REPORT_TABLE_HEADER = [
    {key: "product_name", title: "Product Name", dataIndex: "product_name", width: "40%"},
    {key: "model_no", title: "Model No", dataIndex: "model_no", width: "10%"},
    {key: "cat_name", title: "Category", dataIndex: "cat_name", width: "10%"},
    {key: "subcat_name", title: "Subcategory", dataIndex: "subcat_name", width: "10%"},
    {key: "created_on", title: "Reported On", dataIndex: "created_on", width: "10%"},
    {key: "sup_status", title: "Supplier Action", dataIndex: "sup_status", width: "10%"},
    {key: "actions", title: "Actions", dataIndex: "action", width: "10%"},
]

export const SUPPLIER_PRODUCT_LIST_ACTION_CONSTANT = [
    {key: "view_product", label: "View Product", link: ""},
    {key: "deactivate", label: "Deactivate Product", link: ""},
    {key: "activate", label: "Activate Product", link: ""},
    {key: "delete", label: "Delete Product", link: ""},
]

export const SUPPLIER_PENDING_LIST_ACTION_CONSTANT = [
    {key: "view_product", label: "View Application", link: ""},
    {key: "delete", label: "Delete Application", link: ""},
]

export const SUPPLIER_HISTORY_LIST_ACTION_CONSTANT = [
    {key: "view_product", label: "View Application", link: ""},
    {key: "resubmit", label: "Resubmit Application", link: ""},
    {key: "delete", label: "Delete Application", link: ""},
]