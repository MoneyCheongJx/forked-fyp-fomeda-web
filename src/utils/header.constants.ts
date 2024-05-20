export const HEADER_MANAGEMENT_DROPDOWN_LIST_CONSTANTS = [
    {key: "product_management", label: "Product Management", link: "product"},
    {key: "product_category_management", label: "Product Category Management", link: "category-management"},
    {key: "product_verification", label: "Product Verification", link: ""},
    {key: "report_management", label: "Report Management", link: ""},
    {key: "supplier_management", label: "Supplier Management", link: "/managements/suppliers"},
    {key: "administrator_management", label: "Administrator Management", link: "/managements/admins"},
    {key: "role_management", label: "Role Management", link: "/management/roles"},
    {key: "announcement_management", label: "Announcement Management", link: "/management/announcements"},
    {key: "content_management", label: "Content Management", link: "/management/contents"},
]

export const HEADER_USER_DROPDOWN_CONSTANTS = [
    {key: "logout", label: "Logout", link: ""},
    {key: "manage_profile", label: "Manage Profile", link: ""},
]

/* can be used in the future. Current State we just hardcode it */
export const HEADER_MENU_LIST_CONSTANTS = [
    {
        key: "home",
        label: "Home",
        link: "",
        disabled: false,
        visible: true,
        hasChild: false,
        children: [],
    },
    {
        key: "announcement",
        label: "Announcement",
        link: "",
        disabled: false,
        visible: true,
        hasChild: false,
        children: [],
    },
    {
        key: "product",
        label: "Product",
        link: "",
        disabled: false,
        visible: true,
        hasChild: false,
        children: [],
    },
    {
        key: "management",
        label: "Management",
        link: "",
        disabled: false,
        visible: true,
        children: HEADER_MANAGEMENT_DROPDOWN_LIST_CONSTANTS,
    },
]