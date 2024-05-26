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
}