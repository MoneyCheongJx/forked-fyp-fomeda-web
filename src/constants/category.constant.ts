export class CategoryConstant {
    static readonly DISPLAY_SPECIFICATION: string = "Specification";
    static readonly DISPLAY_INFORMATION: string = "Information";
    static readonly DISPLAY_WARRANTY: string = "Warranty";
    static readonly DISPLAY_CERTIFICATION: string = "Certification";
    static readonly SPECIFICATION: string = "SPECIFICATION";
    static readonly INFORMATION: string = "INFORMATION";
    static readonly WARRANTY: string = "WARRANTY";
    static readonly CERTIFICATION: string = "CERTIFICATION";
    static readonly SUBCATEGORY_PREFIX = "SCAT";
    static readonly CATEGORY_PREFIX = "CAT";
    static readonly SPECIFICATION_PREFIX = "SPEC";
    static readonly SUBSPECIFICATION_PREFIX = "SSPEC";
    static readonly BASE_SPECIFICATION_PREFIX = "BSPEC";
    static readonly BASE_SUBSPECIFICATION_PREFIX = "BSSPEC";
    static readonly GENERAL_SPECIFICATION_PREFIX = "GSPEC";
    static readonly GENERAL_SUBSPECIFICATION_PREFIX = "GSSPEC";
    static readonly HAVE_VALUE = "HAVE_VALUE";
    static readonly MORE_THAN = "MORE_THAN";
    static readonly LESS_THAN = "LESS_THAN";
    static readonly EQUAL_TO = "EQUAL_TO";
    static readonly CONTAINS = "CONTAINS";
}

export const CATEGORY_TAB_CONSTANTS = [
    {key: "category", label: "Category"},
    {key: "general", label: "General Specification"},
]

export const CATEGORY_TABLE_HEADER_CONSTANTS = [
    {key: "cat_name", title: "Category", dataIndex: "cat_name", width: "40%"},
    {key: "created_name", title: "Created by", dataIndex: "created_name", width: "10%"},
    {key: "created_on", title: "Created on", dataIndex: "created_on", width: "10%"},
    {key: "last_updated_name", title: "Updated by", dataIndex: "last_updated_name", width: "10%"},
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

export const SUBCATEGORY_TABLE_ACTIONS_CONSTANTS = [
    {key: "view_details", label: "View Details"},
    {key: "edit_category", label: "Edit Subcategory"},
    {key: "deactivate", label: "Deactivate Subcategory"},
    {key: "activate", label: "Activate Subcategory"},
    {key: "delete", label: "Delete Subcategory", link: ""},
]

export const GENERAL_INFORMATION_ACTIONS_CONSTANTS = [
    {key: "view_specification", label: "View Information", link: ""},
    {key: "deactivate", label: "Deactivate Information", link: ""},
    {key: "activate", label: "Activate Information"},
    {key: "delete", label: "Delete Information", link: ""},
]

export const CERTIFICATION_ACTIONS_CONSTANTS = [
    {key: "view_specification", label: "View Certification", link: ""},
    {key: "deactivate", label: "Deactivate Certification", link: ""},
    {key: "activate", label: "Activate Certification"},
    {key: "delete", label: "Delete Certification", link: ""},
]

export const WARRANTY_ACTIONS_CONSTANTS = [
    {key: "view_specification", label: "View Warranty", link: ""},
    {key: "deactivate", label: "Deactivate Warranty", link: ""},
    {key: "activate", label: "Activate Warranty"},
    {key: "delete", label: "Delete Warranty", link: ""},
]

export const PRODUCT_SPECIFICATION_ACTIONS_CONSTANTS = [
    {key: "view_specification", label: "View Specification", link: ""},
    {key: "deactivate", label: "Deactivate Specification", link: ""},
    {key: "activate", label: "Activate Specification"},
    {key: "delete", label: "Delete Specification", link: ""},
]

export const SUBCATEGORY_RATING_SCORE_HEADER_CONSTANTS = [
    {key: "rating", title: "Rating", dataIndex: "rating", width: "50%"},
    {key: "min_score", title: "Minimum Score", dataIndex: "min_score", width: "25%"},
    {key: "max_score", title: "Maximum Score", dataIndex: "max_score", width: "25%"},
]

export const GENERAL_SPECIFICATIONS_TABLE_HEADER_CONSTANTS = [
    {key: "subcat_spec_name", title: "General Information", dataIndex: "subcat_spec_name", width: "40%"},
    {key: "created_name", title: "Created by", dataIndex: "created_name", width: "10%"},
    {key: "created_on", title: "Created on", dataIndex: "created_on", width: "10%"},
    {key: "last_updated_name", title: "Updated by", dataIndex: "last_updated_name", width: "10%"},
    {key: "last_updated_on", title: "Updated on", dataIndex: "last_updated_on", width: "10%"},
    {key: "is_active", title: "Status", dataIndex: "is_active", width: "10%"},
    {key: "actions", title: "Actions", actionList: GENERAL_INFORMATION_ACTIONS_CONSTANTS}
]

export const CERTIFICATION_TABLE_HEADER_CONSTANTS = [
    {key: "subcat_spec_name", title: "Certification", dataIndex: "subcat_spec_name", width: "40%"},
    {key: "created_name", title: "Created by", dataIndex: "created_name", width: "10%"},
    {key: "created_on", title: "Created on", dataIndex: "created_on", width: "10%"},
    {key: "last_updated_name", title: "Updated by", dataIndex: "last_updated_name", width: "10%"},
    {key: "last_updated_on", title: "Updated on", dataIndex: "last_updated_on", width: "10%"},
    {key: "is_active", title: "Status", dataIndex: "is_active", width: "10%"},
    {key: "actions", title: "Actions", actionList: CERTIFICATION_ACTIONS_CONSTANTS}
]

export const WARRANTY_HEADER_CONSTANTS = [
    {key: "subcat_spec_name", title: "Warranty", dataIndex: "subcat_spec_name", width: "40%"},
    {key: "created_name", title: "Created by", dataIndex: "created_name", width: "10%"},
    {key: "created_on", title: "Created on", dataIndex: "created_on", width: "10%"},
    {key: "last_updated_name", title: "Updated by", dataIndex: "last_updated_name", width: "10%"},
    {key: "last_updated_on", title: "Updated on", dataIndex: "last_updated_on", width: "10%"},
    {key: "is_active", title: "Status", dataIndex: "is_active", width: "10%"},
    {key: "actions", title: "Actions", actionList: WARRANTY_ACTIONS_CONSTANTS}
]

export const PRODUCT_SPECIFICATION_HEADER_CONSTANTS = [
    {key: "subcat_spec_name", title: "Specification", dataIndex: "subcat_spec_name", width: "40%"},
    {key: "created_name", title: "Created by", dataIndex: "created_name", width: "10%"},
    {key: "created_on", title: "Created on", dataIndex: "created_on", width: "10%"},
    {key: "last_updated_name", title: "Updated by", dataIndex: "last_updated_name", width: "10%"},
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
        type: "INFORMATION",
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
        key: 'warranty',
        title: "Warranty",
        button: "Add Warranty",
        group: "Warranty",
        type: "WARRANTY",
        tableHeader: WARRANTY_HEADER_CONSTANTS
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

export const SPECIFICATION_TYPE_CONSTANT: { [key: string]: string } = {
    INFORMATION: "Information",
    CERTIFICATION: "Certification",
    WARRANTY: "Warranty",
    SPECIFICATION: "Specification",
};

export const SPECIFICATION_FIELD_TYPE_OPTIONS = [
    {key: "ALPHANUMERIC", label: "Alphanumeric",},
    {key: "ALPHABET", label: "Alphabet",},
    {key: "NUMERIC", label: "Numeric",},
];

export const SCORE_CONTRIBUTION_ACTION_OPTIONS = [
    {key: "MORE_THAN", label: "More Than", type: ["NUMERIC"]},
    {key: "LESS_THAN", label: "Less Than", type: ["NUMERIC"]},
    {key: "EQUAL_TO", label: "Equal To", type: ["NUMERIC"]},
    {key: "CONTAINS", label: "Contains", type: ["ALPHABET", "ALPHANUMERIC"]},
    {key: "HAVE_VALUE", label: "Have Value", type: ["NUMERIC", "ALPHABET", "ALPHANUMERIC"]},
]






