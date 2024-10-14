export class ReportConstant {
    static readonly PENDING = "PENDING";
    static readonly NOTIFIED = "NOTIFIED";
    static readonly CLOSED = "CLOSED";
}

export const REPORT_MANAGEMENT_TAB = [
    {key: "pending", label: "Pending", value: "pending"},
    {key: "history", label: "History", value: "history"},
]

export const REPORT_PENDING_TABLE_HEADER = [
    {key: "product_name", title: "Product Name", dataIndex: "product_name", width: "30%"},
    {key: "model_no", title: "Model No", dataIndex: "model_no", width: "10%"},
    {key: "cat_name", title: "Category", dataIndex: "cat_name", width: "10%"},
    {key: "subcat_name", title: "Subcategory", dataIndex: "subcat_name", width: "10%"},
    {key: "created_on", title: "Reported On", dataIndex: "created_on", width: "10%"},
    {key: "sup_status", title: "Supplier Action", dataIndex: "sup_status", width: "10%"},
    {key: "adm_status", title: "Status", dataIndex: "adm_status", width: "10%"},
    {key: "actions", title: "Actions", dataIndex: "action", width: "10%"},
]

export const REPORT_HISTORY_TABLE_HEADER = [
    {key: "product_name", title: "Product Name", dataIndex: "product_name", width: "30%"},
    {key: "model_no", title: "Model No", dataIndex: "model_no", width: "10%"},
    {key: "cat_name", title: "Category", dataIndex: "cat_name", width: "10%"},
    {key: "subcat_name", title: "Subcategory", dataIndex: "subcat_name", width: "10%"},
    {key: "reviewed_on", title: "Reviewed on", dataIndex: "reviewed_on", width: "10%"},
    {key: "reviewed_by", title: "Reviewed by", dataIndex: "reviewed_by", width: "10%"},
    {key: "adm_status", title: "Status", dataIndex: "adm_status", width: "10%"},
    {key: "actions", title: "Actions", dataIndex: "action", width: "10%"},
]

export const DISPLAY_STATUS: { [key: string]: string } = {
    NOTIFIED: "notified owner",
    CLOSED: "closed",
}

export const DISPLAY_STATUS_MESSAGE: { [key: string]: string } = {
    NOTIFIED: "inform owner",
    CLOSED: "resolve",
}