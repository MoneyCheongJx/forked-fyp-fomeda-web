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
    {key: "view_details", label: "View Details"},
    {key: "edit_category", label: "Edit Category"},
    {key: "deactivate", label: "Deactivate Category"},
    {key: "activate", label: "Activate Category"},
    {key: "delete", label: "Delete Category", link: ""},
]

export const GENERAL_INFORMATION_ACTIONS_CONSTANTS = [
    {key: "edit_specification", label: "Edit Information", link: ""},
    {key: "deactivate", label: "Deactivate", link: ""},
    {key: "activate", label: "Activate Category"},
    {key: "delete", label: "Delete Category", link: ""},
]

export const CERTIFICATION_ACTIONS_CONSTANTS = [
    {key: "edit_specification", label: "Edit Certification", link: ""},
    {key: "deactivate", label: "Deactivate", link: ""},
    {key: "activate", label: "Activate Category"},
    {key: "delete", label: "Delete Category", link: ""},
]

export const SERVICES_PROVIDED_ACTIONS_CONSTANTS = [
    {key: "edit_specification", label: "Edit Services", link: ""},
    {key: "deactivate", label: "Deactivate", link: ""},
    {key: "activate", label: "Activate Category"},
    {key: "delete", label: "Delete Category", link: ""},
]

export const PRODUCT_SPECIFICATION_ACTIONS_CONSTANTS = [
    {key: "edit_specification", label: "Edit Specification", link: ""},
    {key: "deactivate", label: "Deactivate", link: ""},
    {key: "activate", label: "Activate Category"},
    {key: "delete", label: "Delete Category", link: ""},
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

export const SPECIFICATIONS_TABLE_CONSTANTS = [
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

export const CONFIRMATION_MESSAGE_CONSTANT = [
    {key: "create_category", message: "Are you confirm to create new <b>category</b>?"},
    {key: "create_subcategory", message: "Are you confirm to create new <b>subcategory</b>?"},
    {key: "create_information", message: "Are you confirm to create new <b>General Information</b> field?"},
    {key: "create_certification", message: "Are you confirm to create new <b>Certificate</b> field?"},
    {key: "create_service", message: "Are you confirm to create new <b>Service</b> field?"},
    {key: "create_specification", message: "Are you confirm to create new <b>Specification</b> field?"},
    {key: "create_subspecification", message: "Are you confirm to create new <b>Subspecification</b> field?"},
    {key: "edit_subspecification", message: "Are you confirm to create new <b>Subspecification</b> field?"},
]

