export const ANNOUNCEMENT_MANAGEMENT_TABLE_HEADER_CONSTANTS = [
    {
        key: "title",
        title: "Announcement title",
        dataIndex: "title",
        width: "40%",
    },
    {
        key: "created_on",
        title: "Date",
        dataIndex: "created_on",
    },
    {
        key: "created_by",
        title: "Created by",
        dataIndex: "created_by",
    },
    {
        key: "visibility",
        title: "Visibility",
        dataIndex: "visibility",
        filters: [
            {
                text: 'Invisibile',
                value: false,
            },
            {
                text: 'Visible',
                value: true,
            },
        ],
    },
    {
        key: "actions",
        title: "Actions"
    }
]

export const ANNOUNCEMENT_MANAGEMENT_TABLE_ACTIONS_CONSTANTS = [
    {key: "edit_announcement", label: "Edit Announcement"},
    {key: "hide_announcement", label: "Hide Announcement"},
    {key: "unhide_announcement", label: "Unhide Announcement"}
]


