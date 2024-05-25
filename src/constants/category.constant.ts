export const CATEGORY_TAB_CONSTANTS = [
    {key: "category", label: "Category"},
    {key: "general", label: "General Information"},
]

export const CATEGORY_TABLE_HEADER_CONSTANTS = [
    {key: "cat_name", title: "Category", dataIndex: "cat_name", width: "40%"},
    {key: "created_by", title: "Created by", dataIndex: "created_by", width: "10%"},
    {key: "created_on", title: "Created on", dataIndex: "created_on", width: "10%"},
    {key: "last_updated_by", title: "Updated by", dataIndex: "last_updated_by", width: "10%"},
    {key: "last_updated_on", title: "Updated on", dataIndex: "last_updated_on", width: "10%"},
    {key: "is_active", title: "Status", dataIndex: "is_active", width: "10%"},
    {key: "actions", title: "Actions"}
]

export const CATEGORY_TABLE_ACTIONS_CONSTANTS = [
    {key: "edit_category", label: "Edit Category", link: ""},
    {key: "deactivate", label: "Deactivate", link: ""}
]

export const GENERAL_INFORMATION_ACTIONS_CONSTANTS = [
    {key: "edit_information", label: "Edit Information", link: ""},
    {key: "deactivate", label: "Deactivate", link: ""}
]

export const CERTIFICATION_ACTIONS_CONSTANTS = [
    {key: "edit_certification", label: "Edit Certification", link: ""},
    {key: "deactivate", label: "Deactivate", link: ""}
]

export const SERVICES_PROVIDED_ACTIONS_CONSTANTS = [
    {key: "edit_services", label: "Edit Services", link: ""},
    {key: "deactivate", label: "Deactivate", link: ""}
]

export const PRODUCT_SPECIFICATION_ACTIONS_CONSTANTS = [
    {key: "edit_specification", label: "Edit Specification", link: ""},
    {key: "deactivate", label: "Deactivate", link: ""}
]

export const GENERAL_SPECIFICATIONS_TABLE_HEADER_CONSTANTS = [
    {key: "subcat_spec_name", title: "General Field", dataIndex: "subcat_spec_name", width: "40%"},
    {key: "created_by", title: "Created by", dataIndex: "created_by", width: "10%"},
    {key: "created_on", title: "Created on", dataIndex: "created_on", width: "10%"},
    {key: "last_updated_by", title: "Updated by", dataIndex: "last_updated_by", width: "10%"},
    {key: "last_updated_on", title: "Updated on", dataIndex: "last_updated_on", width: "10%"},
    {key: "is_active", title: "Status", dataIndex: "is_active", width: "10%"},
    {key: "actions", title: "Actions", actionList: GENERAL_INFORMATION_ACTIONS_CONSTANTS}
]

export const CERTIFICATION_TABLE_HEADER_CONSTANTS = [
    {key: "subcat_spec_name", title: "Certification", dataIndex: "subcat_spec_name", width: "40%"},
    {key: "created_by", title: "Created by", dataIndex: "created_by", width: "10%"},
    {key: "created_on", title: "Created on", dataIndex: "created_on", width: "10%"},
    {key: "last_updated_by", title: "Updated by", dataIndex: "last_updated_by", width: "10%"},
    {key: "last_updated_on", title: "Updated on", dataIndex: "last_updated_on", width: "10%"},
    {key: "is_active", title: "Status", dataIndex: "is_active", width: "10%"},
    {key: "actions", title: "Actions", actionList: CERTIFICATION_ACTIONS_CONSTANTS}
]

export const SERVICE_PROVIDED_HEADER_CONSTANTS = [
    {key: "subcat_spec_name", title: "Service Provided", dataIndex: "subcat_spec_name", width: "40%"},
    {key: "created_by", title: "Created by", dataIndex: "created_by", width: "10%"},
    {key: "created_on", title: "Created on", dataIndex: "created_on", width: "10%"},
    {key: "last_updated_by", title: "Updated by", dataIndex: "last_updated_by", width: "10%"},
    {key: "last_updated_on", title: "Updated on", dataIndex: "last_updated_on", width: "10%"},
    {key: "is_active", title: "Status", dataIndex: "is_active", width: "10%"},
    {key: "actions", title: "Actions", actionList: SERVICES_PROVIDED_ACTIONS_CONSTANTS}
]

export const PRODUCT_SPECIFICATION_HEADER_CONSTANTS = [
    {key: "subcat_spec_name", title: "Specification", dataIndex: "subcat_spec_name", width: "40%"},
    {key: "created_by", title: "Created by", dataIndex: "created_by", width: "10%"},
    {key: "created_on", title: "Created on", dataIndex: "created_on", width: "10%"},
    {key: "last_updated_by", title: "Updated by", dataIndex: "last_updated_by", width: "10%"},
    {key: "last_updated_on", title: "Updated on", dataIndex: "last_updated_on", width: "10%"},
    {key: "is_active", title: "Status", dataIndex: "is_active", width: "10%"},
    {key: "actions", title: "Actions", actionList: PRODUCT_SPECIFICATION_ACTIONS_CONSTANTS}
]

export const GENERAL_SPECIFICATIONS_CONSTANTS = [
    {
        key: 'general_information',
        title: "General Information",
        button: "Add Information",
        group: "Information",
        type: "GENERAL",
        tableHeader: GENERAL_SPECIFICATIONS_TABLE_HEADER_CONSTANTS
    },
    {
        key: 'certification',
        title: "Certification",
        button: "Add Certification",
        group: "Certification",
        type: "CERTIFICATION",
        tableHeader: CERTIFICATION_TABLE_HEADER_CONSTANTS
    },
    {
        key: 'services_provided',
        title: "Services Provided",
        button: "Add Service",
        group: "Service",
        type: "SERVICE",
        tableHeader: SERVICE_PROVIDED_HEADER_CONSTANTS
    },
    {
        key: 'product_specification',
        title: "Product Specification",
        button: "Add Specification",
        group: "Specification",
        type: "SPECIFICATION",
        tableHeader: PRODUCT_SPECIFICATION_HEADER_CONSTANTS
    },
]

