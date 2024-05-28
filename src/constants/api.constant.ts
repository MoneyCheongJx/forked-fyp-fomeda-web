export class ApiConstant{
   /* base url */
    static readonly BASE_URL = 'http://localhost:4000';
    static readonly SUFFIX = "/";
    static readonly HOST_PREFIX = this.BASE_URL + this.SUFFIX;

    /* module */
    static readonly CATEGORY_PREFIX = this.HOST_PREFIX + "category" + this.SUFFIX;


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
    static readonly DEACTIVATE_GENERAL_SPECIFICATION = this.CATEGORY_PREFIX + "deactivate-general-specification";
    static readonly DEACTIVATE_GENERAL_SUBSPECIFICATION = this.CATEGORY_PREFIX + "deactivate-general-subspecification";
    static readonly DELETE_CATEGORY = this.CATEGORY_PREFIX + "delete-category";
    static readonly DELETE_SUBCATEGORY = this.CATEGORY_PREFIX + "delete-subcategory";
    static readonly DELETE_GENERAL_SPECIFICATION = this.CATEGORY_PREFIX + "delete-general-specification";
    static readonly DELETE_GENERAL_SUBSPECIFICATION = this.CATEGORY_PREFIX + "delete-general-subspecification";
}