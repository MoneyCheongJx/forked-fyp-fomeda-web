export class ApiConstant{
   /* base url */
    static readonly BASE_URL = 'http://localhost:4000';
    static readonly SUFFIX = "/";
    static readonly HOST_PREFIX = this.BASE_URL + this.SUFFIX;

    /* module */
    static readonly CATEGORY_PREFIX = this.HOST_PREFIX + "category" + this.SUFFIX;
    static readonly ANNOUNCEMENT_PREFIX = this.HOST_PREFIX + "announcement" + this.SUFFIX;
    static readonly CONTENT_PREFIX = this.HOST_PREFIX + "content" + this.SUFFIX

    /* category api */
    static readonly CREATE_CATEGORY = this.CATEGORY_PREFIX + "create-category";
    static readonly CREATE_SUBCATEGORY = this.CATEGORY_PREFIX + "create-subcategory";
    static readonly CREATE_GENERAL_SPECIFICATION = this.CATEGORY_PREFIX + "create-general-specification";
    static readonly CREATE_GENERAL_SUBSPECIFICATION = this.CATEGORY_PREFIX + "create-general-subspecification";
    static readonly FIND_ALL_CATEGORY = this.CATEGORY_PREFIX + "find-all-category";
    static readonly FIND_ALL_GENERAL_SPECIFICATION = this.CATEGORY_PREFIX + "find-all-general-specification";
    static readonly UPDATE_CATEGORY = this.CATEGORY_PREFIX + "update-category";
    static readonly UPDATE_SUBCATEGORY = this.CATEGORY_PREFIX + "update-subcategory";
    static readonly UPDATE_GENERAL_SPECIFICATION = this.CATEGORY_PREFIX + "update-general-specification";
    static readonly UPDATE_GENERAL_SUBSPECIFICATION = this.CATEGORY_PREFIX + "update-general-subspecification";
    static readonly DEACTIVATE_CATEGORY = this.CATEGORY_PREFIX + "deactivate-category";
    static readonly DEACTIVATE_SUBCATEGORY = this.CATEGORY_PREFIX + "deactivate-subcategory";

    /* announcement api */
    static readonly FIND_ALL_ANNOUNCEMENT = this.ANNOUNCEMENT_PREFIX + "find-all-announcement";
    static readonly CREATE_ANNOUNCEMENT = this.ANNOUNCEMENT_PREFIX + "create-announcement";
    static readonly EDIT_ANNOUNCEMENT = this.ANNOUNCEMENT_PREFIX + "edit-announcement";

    /* content api &*/
    static readonly FIND_ALL_CAROUSEL = this.CONTENT_PREFIX + "find-all-carousel";
    static readonly CREATE_CAROUSEL = this.CONTENT_PREFIX + "create-carousel";
    static readonly EDIT_CAROUSEL = this.CONTENT_PREFIX + "edit-carousel";
    static readonly DELETE_CAROUSEL = this.CONTENT_PREFIX + "delete-carousel";

    static readonly FIND_ALL_CONTENT = this.CONTENT_PREFIX + "find-all-content";
    static readonly CREATE_CONTENT = this.CONTENT_PREFIX + "create-content";
    static readonly EDIT_CONTENT = this.CONTENT_PREFIX + "edit-content";
    static readonly DELETE_CONTENT = this.CONTENT_PREFIX + "delete-content";

    static readonly FIND_ALL_HISTORY_TIMELINE = this.CONTENT_PREFIX + "find-all-history-timeline";
    static readonly CREATE_HISTORY_TIMELINE = this.CONTENT_PREFIX + "create-history-timeline";
    static readonly EDIT_HISTORY_TIMELINE = this.CONTENT_PREFIX + "edit-history-timeline";
    static readonly DELETE_HISTORY_TIMELINE = this.CONTENT_PREFIX + "delete-history-timeline";
}