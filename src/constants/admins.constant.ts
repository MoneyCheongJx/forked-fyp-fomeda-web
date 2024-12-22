export const ADMINS_MANAGEMENT_TABLE_HEADER_CONSTANTS = [
    {
        key: "fullname",
        title: "Admin name",
        dataIndex: "fullname",
        width: "15%",
    },
    {
        key: "email_address",
        title: "Admin email",
        dataIndex: "email_address",
    },
    {
        key: "created_on",
        title: "Created on",
        dataIndex: "created_on",
        width: "10",
    },
    {
        key: "created_by",
        title: "Created by",
        dataIndex: "created_by",
        width: "10%",
    },
    {
        key: "last_updated_on",
        title: "Last updated on",
        dataIndex: "last_updated_on",
        width: "12%",
    },
    {
        key: "last_updated_by",
        title: "Last updated by",
        dataIndex: "last_updated_by",
        width: "12%",
    },
    {
        key: "is_active",
        title: "Status",
        dataIndex: "is_active",
        width: "10%",
        filters: [
            {
                text: 'Inactive',
                value: false,
            },
            {
                text: 'Active',
                value: true,
            },
        ],
    },
    {
        key: "actions",
        title: "Actions",
        width: "10%",
    }
]

export const ADMINS_STATUS_OPTIONS = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
]



