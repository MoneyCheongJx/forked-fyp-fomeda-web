export class ProductConstant {
    static readonly APPROVED = "APPROVED";
    static readonly PENDING = "PENDING";
    static readonly REJECTED = "REJECTED";
}

export const PRODUCT_VERIFICATION_TAB_CONSTANT = [
    {key: "pending", label: "Pending", value: "pending",},
    {key: "history", label: "History", value: "history",},
]

export const VERIFICATION_PENDING_LIST_TABLE_HEADER = [
    {key: "product_name", title: "Product Name", dataIndex: "product_name", width: "40%"},
    {key: "cat_name", title: "Category", dataIndex: "cat_name", width: "10%"},
    {key: "subcat_name", title: "Subcategory", dataIndex: "subcat_name", width: "10%"},
    {key: "model_no", title: "Model No", dataIndex: "model_no", width: "10%"},
    {key: "owner_username", title: "Owner", dataIndex: "owner_username", width: "10%"},
    {key: "last_updated_on", title: "Submitted on", dataIndex: "last_updated_on", width: "10%"},
    {key: "action", title: "Action", dataIndex: "action", width: "10%"},
]

export const VERIFICATION_HISTORY_LIST_TABLE_HEADER = [
    {key: "product_name", title: "Product Name", dataIndex: "product_name", width: "20%"},
    {key: "cat_name", title: "Category", dataIndex: "cat_name", width: "10%"},
    {key: "subcat_name", title: "Subcategory", dataIndex: "subcat_name", width: "10%"},
    {key: "model_no", title: "Model No", dataIndex: "model_no", width: "10%"},
    {key: "owner_username", title: "Owner", dataIndex: "owner_username", width: "10%"},
    {key: "reviewed_on", title: "Reviewed on", dataIndex: "reviewed_on", width: "10%"},
    {key: "admin_username", title: "Reviewed by", dataIndex: "admin_username", width: "10%"},
    {key: "status", title: "Status", dataIndex: "status", width: "10%"},
    {key: "action", title: "Action", dataIndex: "action", width: "10%"},
]

export const VERIFICATION_DETAILS_INFORMATION_TABLE_HEADER = [
    {key: "spec_name", title: "Information", dataIndex: "spec_name", width: "40%"},
    {key: "spec_desc", title: "Value", dataIndex: "spec_desc", width: "40%"},
    {key: "score", title: "Score", dataIndex: "score", width: "20%"},
]

export const VERIFICATION_DETAILS_CERTIFICATION_TABLE_HEADER = [
    {key: "spec_name", title: "Certification", dataIndex: "spec_name", width: "40%"},
    {key: "spec_desc", title: "Value", dataIndex: "spec_desc", width: "40%"},
    {key: "score", title: "Score", dataIndex: "score", width: "20%"},
]

export const VERIFICATION_DETAILS_WARRANTY_TABLE_HEADER = [
    {key: "spec_name", title: "Warranty", dataIndex: "spec_name", width: "40%"},
    {key: "spec_desc", title: "Value", dataIndex: "spec_desc", width: "40%"},
    {key: "score", title: "Score", dataIndex: "score", width: "20%"},
]

export const VERIFICATION_DETAILS_SPECIFICATION_TABLE_HEADER = [
    {key: "spec_name", title: "Specification", dataIndex: "spec_name", width: "40%"},
    {key: "spec_desc", title: "Value", dataIndex: "spec_desc", width: "40%"},
    {key: "score", title: "Score", dataIndex: "score", width: "20%"},
]

export const VERIFICATION_DETAILS_TABLE_CONSTANTS = [
    {
        key: 'general_information',
        title: "General Information",
        group: "Information",
        type: "INFORMATION",
        tableHeader: VERIFICATION_DETAILS_INFORMATION_TABLE_HEADER
    },
    {
        key: 'certification',
        title: "Certification",
        group: "Certification",
        type: "CERTIFICATION",
        tableHeader: VERIFICATION_DETAILS_CERTIFICATION_TABLE_HEADER
    },
    {
        key: 'warranty',
        title: "Warranty",
        group: "Warranty",
        type: "WARRANTY",
        tableHeader: VERIFICATION_DETAILS_WARRANTY_TABLE_HEADER
    },
    {
        key: 'product_specification',
        title: "Product Specification",
        group: "Specification",
        type: "SPECIFICATION",
        tableHeader: VERIFICATION_DETAILS_SPECIFICATION_TABLE_HEADER
    },
]