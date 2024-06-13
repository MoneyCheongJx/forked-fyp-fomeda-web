import dayjs from 'dayjs';

export const CAROUSEL_ACTIONS_CONSTANTS = [
    {key: "edit_carousel", label: "Edit Carousel", link: ""},
    {key: "delete_carousel", label: "Delete Carousel", link: ""}
]

export const CONTENT_ACTIONS_CONSTANTS = [
    {key: "edit_content", label: "Edit Content"},
    {key: "delete_content", label: "Delete Content"},
]

export const HISTORY_TIMELINE_ACTIONS_CONSTANTS = [
    {key: "edit_history_timeline", label: "Edit History Timeline"},
    {key: "delete_history_timeline", label: "Delete History Timeline"},
]

export const CAROUSEL_TABLE_HEADER_CONSTANTS = [
    {key: "no", title: "No", dataIndex: "no", width: "5%", render: (_: any, __: any, index: number) => index + 1},
    {key: "image", title: "Image", dataIndex: "image", width: "85%", },
    {key: "actions", title: "Actions", actionList: CAROUSEL_ACTIONS_CONSTANTS}
]

export const CONTENT_TABLE_HEADER_CONSTANTS = [
    {key: "no", title: "No", dataIndex: "subcat_spec_name", width: "5%", render: (_: any, __: any, index: number) => index + 1},
    {key: "title", title: "Content title", dataIndex: "title", width: "25%"},
    {key: "description", title: "Content description", dataIndex: "description", width: "60%"},
    {key: "actions", title: "Actions", actionList: CONTENT_ACTIONS_CONSTANTS}
]

export const HISTORY_TIMELINE_TABLE_HEADER_CONSTANTS = [
    {key: "no", title: "No", dataIndex: "subcat_spec_name", width: "5%", render: (_: any, __: any, index: number) => index + 1},
    {key: "title", title: "Timeline title", dataIndex: "title", width: "25%"},
    {key: "description", title: "Timeline description", dataIndex: "description", width: "45%"},
    {key: "date", title: "Timeline date", dataIndex: "date", width: "15%",   render: (text: any) => dayjs(text).format('DD-MM-YYYY'),},
    {key: "actions", title: "Actions", actionList: HISTORY_TIMELINE_ACTIONS_CONSTANTS}
]

export const CONTENT_MANAGEMENT_CONSTANTS = [
    {
        key: 'carousel',
        title: "Carousel",
        button: "Add Carousel",
        group: "Carousel",
        tableHeader: CAROUSEL_TABLE_HEADER_CONSTANTS
    },
    {
        key: 'content',
        title: "Content",
        button: "Add Content",
        group: "Content",
        tableHeader: CONTENT_TABLE_HEADER_CONSTANTS
    },
    {
        key: 'history_timeline',
        title: "History timeline",
        button: "Add timeline",
        group: "History Timeline",
        tableHeader: HISTORY_TIMELINE_TABLE_HEADER_CONSTANTS
    },
]