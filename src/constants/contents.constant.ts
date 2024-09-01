export class ContentActionsConstant {
    static readonly ADD_CAROUSEL: string = "add_carousel";
    static readonly EDIT_CAROUSEL: string = "edit_carousel";
    static readonly DELETE_CAROUSEL: string = "delete_carousel";
    static readonly ADD_HISTORY_TIMELINE: string = "add_history_timeline";
    static readonly EDIT_HISTORY_TIMELINE: string = "edit_history_timeline";
    static readonly DELETE_HISTORY_TIMELINE: string = "delete_history_timeline";
    static readonly ADD_CONTENT: string = "add_content";
    static readonly EDIT_CONTENT: string = "edit_content";
    static readonly DELETE_CONTENT = "delete_content";
}

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
    {key: "no", title: "No", dataIndex: "no", width: "5%"},
    {key: "image", title: "Image", dataIndex: "image", width: "85%", },
    {key: "actions", title: "Actions", actionList: CAROUSEL_ACTIONS_CONSTANTS}
]

export const CONTENT_TABLE_HEADER_CONSTANTS = [
    {key: "no", title: "No", dataIndex: "subcat_spec_name", width: "5%"},
    {key: "title", title: "Content title", dataIndex: "title", width: "25%"},
    {key: "description", title: "Content description", dataIndex: "description", width: "60%"},
    {key: "actions", title: "Actions", actionList: CONTENT_ACTIONS_CONSTANTS}
]

export const HISTORY_TIMELINE_TABLE_HEADER_CONSTANTS = [
    {key: "no", title: "No", dataIndex: "subcat_spec_name", width: "5%"},
    {key: "title", title: "Timeline title", dataIndex: "title", width: "25%"},
    {key: "description", title: "Timeline description", dataIndex: "description", width: "45%"},
    {key: "date", title: "Timeline date", dataIndex: "date", width: "15%"},
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

export const MODAL_CONFIGS = {
    add_carousel: {
        type: 'add_carousel',
        title: 'Add Carousel',
        fields: [{ name: 'image', label: 'Upload Image', type: 'file' }],
    },
    edit_carousel: {
        type: 'edit_carousel',
        title: 'Edit Carousel',
        fields: [{ name: 'image', label: 'Upload Image', type: 'file' }],
    },
    delete_carousel: {
        type: 'delete_carousel',
        title: 'Delete Carousel',
        fields: [],
    },
    add_content: {
        type: 'add_content',
        title: 'Add Content',
        fields: [
            { name: 'title', label: 'Content title', type: 'text' },
            { name: 'description', label: 'Content description', type: 'textarea' },
        ],
    },
    edit_content: {
        type: 'edit_content',
        title: 'Edit Content',
        fields: [
            { name: 'title', label: 'Content title', type: 'text' },
            { name: 'description', label: 'Content description', type: 'textarea' },
        ],
    },
    delete_content: {
        type: 'delete_content',
        title: 'Delete Content',
        fields: [],
    },
    add_history_timeline: {
        type: 'add_history_timeline',
        title: 'Add History Timeline',
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'date', label: 'Date', type: 'date' },
        ],
    },
    edit_history_timeline: {
        type: 'edit_history_timeline',
        title: 'Edit History Timeline',
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'date', label: 'Date', type: 'date' },
        ],
    },
    delete_history_timeline: {
        type: 'delete_history_timeline',
        title: 'Delete History Timeline',
        fields: [],
    },
};
