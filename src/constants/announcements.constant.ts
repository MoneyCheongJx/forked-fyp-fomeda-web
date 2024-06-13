import moment from 'moment';
import type { ColumnType } from 'antd/es/table';

export const ANNOUNCEMENT_MANAGEMENT_TABLE_HEADER_CONSTANTS: ColumnType<any>[] = [
    {
        key: "title",
        title: "Announcement title",
        dataIndex: "title",
        width: "40%",
        sorter: (a: any, b: any) => {
            const firstCharA = a.title.charAt(0).toLowerCase();
            const firstCharB = b.title.charAt(0).toLowerCase();
            return firstCharA.localeCompare(firstCharB);
        },
    },
    {
        key: "created_on",
        title: "Date",
        dataIndex: "created_on",
        render: (text: any) => moment(text).format('DD-MM-YYYY'),
        sorter: (a: any, b: any) => {
            const dateA = moment(a.created_on);
            const dateB = moment(b.created_on);
            // @ts-ignore
            return dateB - dateA;
        },
    },
    {
        key: "created_by",
        title: "Created by",
        dataIndex: "created_by",
        sorter: (a: any, b: any) => {
            const firstCharA = a.created_by.charAt(0).toLowerCase();
            const firstCharB = b.created_by.charAt(0).toLowerCase();
            return firstCharA.localeCompare(firstCharB);
        },
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
        onFilter: (value: any, record: any) => record.visibility === value,
    },
    {
        key: "actions",
        align: 'center',
        title: "Actions"
    }
]

export const ANNOUNCEMENT_MANAGEMENT_TABLE_ACTIONS_CONSTANTS = [
    {key: "edit_announcement", label: "Edit Announcement"},
    {key: "hide_announcement", label: "Hide Announcement"},
    {key: "unhide_announcement", label: "Unhide Announcement"}
]


