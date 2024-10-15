export const HEADER_MANAGEMENT_DROPDOWN_LIST_CONSTANTS = [
    {key: "product_management", label: "Product Management", link: "/management/product"},
    {key: "product_category_management", label: "Product Category Management", link: "/management/product-category"},
    {key: "product_verification", label: "Product Verification", link: "/management/product-verification"},
    {key: "report_management", label: "Report Management", link: "/management/report"},
    {key: "supplier_management", label: "Supplier Management", link: "/management/supplier"},
    {key: "administrator_management", label: "Administrator Management", link: "/management/admin"},
    {key: "role_management", label: "Role Management", link: "/management/role"},
    {key: "announcement_management", label: "Announcement Management", link: "/management/announcement"},
    {key: "content_management", label: "Content Management", link: "/management/content"},
]

export const HEADER_USER_DROPDOWN_CONSTANTS = [
    {key: "manage_profile", label: "Manage Profile", link: ""},
    {key: "logout", label: "Logout", link: ""},
]

/* can be used in the future. Current State we just hardcode it */
export const HEADER_MENU_LIST_CONSTANTS = [
    {
        key: "home",
        label: "Home",
        link: "/content",
        disabled: false,
        visible: true,
        hasChild: false,
        children: [],
    },
    {
        key: "announcement",
        label: "Announcement",
        link: "/announcement",
        disabled: false,
        visible: true,
        hasChild: false,
        children: [],
    },
    {
        key: "product",
        label: "Product",
        link: "/product",
        disabled: false,
        visible: true,
        hasChild: false,
        children: [],
    },
    {
        key: "divider",
        type: "divider"
    },
    {
        key: "management",
        label: "Management",
        link: "/management",
        disabled: false,
        visible: true,
        hasChild: true,
        children: HEADER_MANAGEMENT_DROPDOWN_LIST_CONSTANTS,
    },
]