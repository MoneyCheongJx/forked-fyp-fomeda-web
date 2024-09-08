export const ROLES_MANAGEMENT_TABLE_HEADER_CONSTANTS = [
    {
        key: "role_name",
        title: "Roles name",
        dataIndex: "role_name",
        width: "20%",
    },
    {
        key: "created_on",
        title: "Created date",
        dataIndex: "created_on",
    },
    {
        key: "last_updated_on",
        title: "Last modified",
        dataIndex: "last_updated_on",
    },
    {
        key: "is_active",
        title: "Status",
        dataIndex: "is_active",
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
        width: "15%",
    }
]

export const ROLES_MANAGEMENT_TABLE_ACTIONS_CONSTANTS = [
    {key: "edit_role", label: "Edit Role"},
    {key: "activate_role", label: "Activate Role"},
    {key: "deactivate_role", label: "Deactivate Role"}
]

