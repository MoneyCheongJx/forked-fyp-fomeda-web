export class ApiConstant{
   /* base url */
    static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
    static readonly SUFFIX = "/";
    static readonly HOST_PREFIX = this.BASE_URL + this.SUFFIX;

    /* module */
    static readonly CATEGORY_PREFIX = this.HOST_PREFIX + "category" + this.SUFFIX;
    static readonly ANNOUNCEMENT_PREFIX = this.HOST_PREFIX + "announcement" + this.SUFFIX;
    static readonly CONTENT_PREFIX = this.HOST_PREFIX + "content" + this.SUFFIX;
    static readonly AUTH_PREFIX = this.HOST_PREFIX + "auth" + this.SUFFIX;
    static readonly PRODUCT_PREFIX = this.HOST_PREFIX + "product" + this.SUFFIX;
    static readonly ROLE_PREFIX = this.HOST_PREFIX + "role" + this.SUFFIX;
    static readonly REPORT_PREFIX = this.HOST_PREFIX + "report" + this.SUFFIX;

    /* category api */
    static readonly CREATE_CATEGORY = this.CATEGORY_PREFIX + "create-category";
    static readonly CREATE_SUBCATEGORY = this.CATEGORY_PREFIX + "create-subcategory";
    static readonly CREATE_GENERAL_SPECIFICATION = this.CATEGORY_PREFIX + "create-general-specification";
    static readonly CREATE_GENERAL_SUBSPECIFICATION = this.CATEGORY_PREFIX + "create-general-subspecification";
    static readonly CREATE_BASE_SPECIFICATION = this.CATEGORY_PREFIX + "create-base-specification";
    static readonly CREATE_BASE_SUBSPECIFICATION = this.CATEGORY_PREFIX + "create-base-subspecification";
    static readonly CREATE_SUBCATEGORY_SPECIFICATION = this.CATEGORY_PREFIX + "create-subcategory-specification";
    static readonly CREATE_SUBCATEGORY_SUBSPECIFICATION = this.CATEGORY_PREFIX + "create-subcategory-subspecification";
    static readonly FIND_ALL_CATEGORY = this.CATEGORY_PREFIX + "find-all-category";
    static readonly FIND_ONE_SUBCATEGORY_BY_ID = this.CATEGORY_PREFIX + "find-one-subcategory-by-id";
    static readonly FIND_ALL_ACTIVE_CATEGORIES = this.CATEGORY_PREFIX + "find-all-active-categories";
    static readonly FIND_ALL_GENERAL_SPECIFICATION = this.CATEGORY_PREFIX + "find-all-general-specification";
    static readonly FIND_BASE_SPECIFICATION_BY_CAT_ID = this.CATEGORY_PREFIX + "find-base-specification-by-cat-id";
    static readonly FIND_SUBCATEGORY_SPECIFICATION_BY_ID = this.CATEGORY_PREFIX + "find-subcategory-specification-by-id";
    static readonly FIND_SUBCATEGORY_SPECIFICATION_BY_CAT_ID = this.CATEGORY_PREFIX + "find-subcategory-specification-by-cat-id";
    static readonly FIND_ACTIVE_SUBCATEGORY_SPECIFICATION_BY_CAT_ID = this.CATEGORY_PREFIX + "find-active-subcategory-specification-by-cat-id";
    static readonly FIND_SUBCATEGORY_SUBSPECIFICATION_BY_ID = this.CATEGORY_PREFIX + "find-subcategory-subspecification-by-id";
    static readonly FIND_GENERAL_SPECIFICATION_BY_ID = this.CATEGORY_PREFIX + "find-general-specification-by-id";
    static readonly FIND_GENERAL_SUBSPECIFICATION_BY_ID = this.CATEGORY_PREFIX + "find-general-subspecification-by-id";
    static readonly FIND_BASE_SPECIFICATION_BY_ID = this.CATEGORY_PREFIX + "find-base-specification-by-id";
    static readonly FIND_BASE_SUBSPECIFICATION_BY_ID = this.CATEGORY_PREFIX + "find-base-subspecification-by-id";
    static readonly UPDATE_CATEGORY = this.CATEGORY_PREFIX + "update-category";
    static readonly UPDATE_SUBCATEGORY = this.CATEGORY_PREFIX + "update-subcategory";
    static readonly UPDATE_GENERAL_SPECIFICATION = this.CATEGORY_PREFIX + "update-general-specification";
    static readonly UPDATE_GENERAL_SUBSPECIFICATION = this.CATEGORY_PREFIX + "update-general-subspecification";
    static readonly UPDATE_BASE_SPECIFICATION = this.CATEGORY_PREFIX + "update-base-specification";
    static readonly UPDATE_BASE_SUBSPECIFICATION = this.CATEGORY_PREFIX + "update-base-subspecification";
    static readonly UPDATE_SUBCATEGORY_SPECIFICATION = this.CATEGORY_PREFIX + "update-subcategory-specification";
    static readonly UPDATE_SUBCATEGORY_SUBSPECIFICATION = this.CATEGORY_PREFIX + "update-subcategory-subspecification";
    static readonly DEACTIVATE_CATEGORY = this.CATEGORY_PREFIX + "deactivate-category";
    static readonly DEACTIVATE_SUBCATEGORY = this.CATEGORY_PREFIX + "deactivate-subcategory";
    static readonly DEACTIVATE_GENERAL_SPECIFICATION = this.CATEGORY_PREFIX + "deactivate-general-specification";
    static readonly DEACTIVATE_GENERAL_SUBSPECIFICATION = this.CATEGORY_PREFIX + "deactivate-general-subspecification";
    static readonly DEACTIVATE_BASE_SPECIFICATION = this.CATEGORY_PREFIX + "deactivate-base-specification";
    static readonly DEACTIVATE_BASE_SUBSPECIFICATION = this.CATEGORY_PREFIX + "deactivate-base-subspecification";
    static readonly DEACTIVATE_SUBCATEGORY_SPECIFICATION = this.CATEGORY_PREFIX + "deactivate-subcategory-specification";
    static readonly DEACTIVATE_SUBCATEGORY_SUBSPECIFICATION = this.CATEGORY_PREFIX + "deactivate-subcategory-subspecification";
    static readonly DELETE_CATEGORY = this.CATEGORY_PREFIX + "delete-category";
    static readonly DELETE_SUBCATEGORY = this.CATEGORY_PREFIX + "delete-subcategory";
    static readonly DELETE_GENERAL_SPECIFICATION = this.CATEGORY_PREFIX + "delete-general-specification";
    static readonly DELETE_GENERAL_SUBSPECIFICATION = this.CATEGORY_PREFIX + "delete-general-subspecification";
    static readonly DELETE_BASE_SPECIFICATION = this.CATEGORY_PREFIX + "delete-base-specification";
    static readonly DELETE_BASE_SUBSPECIFICATION = this.CATEGORY_PREFIX + "delete-base-subspecification";
    static readonly DELETE_SUBCATEGORY_SPECIFICATION = this.CATEGORY_PREFIX + "delete-subcategory-specification";
    static readonly DELETE_SUBCATEGORY_SUBSPECIFICATION = this.CATEGORY_PREFIX + "delete-subcategory-subspecification";
    static readonly FIND_NAME_BY_ID = this.CATEGORY_PREFIX + "find-name-by-id";
    static readonly GET_PRODUCT_SPECIFICATION_BY_SUBCAT_ID = this.CATEGORY_PREFIX + "get-product-specification-by-subcat-id";

    /* announcement api */
    static readonly FIND_ALL_ANNOUNCEMENT = this.ANNOUNCEMENT_PREFIX + "find-all-announcement";
    static readonly FIND_VISIBLE_ANNOUNCEMENT = this.ANNOUNCEMENT_PREFIX + "find-visible-announcement";
    static readonly CREATE_ANNOUNCEMENT = this.ANNOUNCEMENT_PREFIX + "create-announcement";
    static readonly EDIT_ANNOUNCEMENT = this.ANNOUNCEMENT_PREFIX + "edit-announcement";

    /* content api &*/
    static readonly FIND_ALL_CAROUSEL = this.CONTENT_PREFIX + "find-all-carousel";
    static readonly FIND_VISIBLE_CAROUSEL = this.CONTENT_PREFIX + "find-visible-carousel";
    static readonly CREATE_CAROUSEL = this.CONTENT_PREFIX + "create-carousel";
    static readonly EDIT_CAROUSEL = this.CONTENT_PREFIX + "update-carousel";
    static readonly DELETE_CAROUSEL = this.CONTENT_PREFIX + "delete-carousel";

    static readonly FIND_ALL_CONTENT = this.CONTENT_PREFIX + "find-all-content";
    static readonly FIND_VISIBLE_CONTENT = this.CONTENT_PREFIX + "find-visible-content";
    static readonly CREATE_CONTENT = this.CONTENT_PREFIX + "create-content";
    static readonly EDIT_CONTENT = this.CONTENT_PREFIX + "update-content";
    static readonly DELETE_CONTENT = this.CONTENT_PREFIX + "delete-content";

    static readonly FIND_ALL_HISTORY_TIMELINE = this.CONTENT_PREFIX + "find-all-history-timeline";
    static readonly FIND_VISIBLE_HISTORY_TIMELINE = this.CONTENT_PREFIX + "find-visible-history-timeline";
    static readonly CREATE_HISTORY_TIMELINE = this.CONTENT_PREFIX + "create-history-timeline";
    static readonly EDIT_HISTORY_TIMELINE = this.CONTENT_PREFIX + "update-history-timeline";
    static readonly DELETE_HISTORY_TIMELINE = this.CONTENT_PREFIX + "delete-history-timeline";

    /* auth api */
    static readonly LOGIN = this.AUTH_PREFIX + "login";
    static readonly LOGOUT = this.AUTH_PREFIX + "logout";
    static readonly REGISTER = this.AUTH_PREFIX + "register";
    static readonly CHECK_EMAIL_DUPLCIATE = this.AUTH_PREFIX + "check-email";
    static readonly CHECK_USERNAME_DUPLICATE = this.AUTH_PREFIX + "check-username";
    static readonly CHECK_STATUS = this.AUTH_PREFIX + "check-status";
    static readonly GET_REJECTION_INFO = this.AUTH_PREFIX + "get-rejection-info";
    static readonly GET_APPEAL_INFO = this.AUTH_PREFIX + "get-appeal-info";
    static readonly APPEAL_REGISTRATION = this.AUTH_PREFIX + "appeal";
    static readonly GET_PROFILE_INFO = this.AUTH_PREFIX + "get-profile-info";
    static readonly UPDATE_PROFILE = this.AUTH_PREFIX + "update-profile";
    static readonly UPDATE_PASSWORD = this.AUTH_PREFIX + "update-password";
    static readonly GET_DETAILS = this.AUTH_PREFIX + "get-details";
    static readonly GET_PENDING_SUPPLIERS = this.AUTH_PREFIX + "pending-suppliers";
    static readonly GET_REJECTED_SUPPLIERS = this.AUTH_PREFIX + "rejected-suppliers";
    static readonly GET_APPROVED_SUPPLIERS = this.AUTH_PREFIX + "approved-suppliers";
    static readonly APPROVE_SUPPLIERS = this.AUTH_PREFIX + "approve";
    static readonly REJECT_SUPPLIERS = this.AUTH_PREFIX + "reject";
    static readonly GET_ADMINS = this.AUTH_PREFIX + "admins";
    static readonly UPDATE_ADMIN = this.AUTH_PREFIX + "update-admin"
    static readonly CHECK_FORGET_PASSWORD_EMAIL = this.AUTH_PREFIX + "check-forget-password-email";
    static readonly RESET_PASSWORD = this.AUTH_PREFIX + "reset-password";
    static readonly SEND_OTP = this.AUTH_PREFIX + "send-otp";
    static readonly VERIFY_OTP = this.AUTH_PREFIX + "verify-otp";
    static readonly GET_EMAIL = this.AUTH_PREFIX + "get-email";
    static readonly SEND_DELETE_OTP = this.AUTH_PREFIX + "send-delete-otp";
    static readonly VERIFY_DELETE_OTP = this.AUTH_PREFIX + "verify-delete-otp";
    static readonly DEACTIVATE_ACCOUNT = this.AUTH_PREFIX + "delete-account";

    /* role api */
    static readonly GET_ALL_ROLES = this.ROLE_PREFIX + "get-roles"
    static readonly GET_ACTIVE_ROLES = this.ROLE_PREFIX + "get-active-roles"
    static readonly GET_MODULES = this.ROLE_PREFIX + "get-modules"
    static readonly CREATE_ROLE = this.ROLE_PREFIX + "create-role"
    static readonly UPDATE_ROLE = this.ROLE_PREFIX + "update-role"

    /* product api */
    static readonly CREATE_PRODUCT_VERIFICATION = this.PRODUCT_PREFIX + "create-product-verification";
    static readonly GET_PRODUCT_DETAILS_BY_ID = this.PRODUCT_PREFIX + "get-product-details-by-id";
    static readonly GET_PRODUCT_LIST_BY_FILTER = this.PRODUCT_PREFIX + "get-product-list-by-filter";
    static readonly GET_PRODUCT_VERIFICATION_LIST_BY_FILTER = this.PRODUCT_PREFIX + "get-product-verification-list-by-filter";
    static readonly GET_PRODUCT_VERIFICATION_DETAILS_BY_ID = this.PRODUCT_PREFIX + "get-product-verification-details-by-id";
    static readonly UPDATE_PRODUCT_DETAILS_BY_ID = this.PRODUCT_PREFIX + "update-product-details-by-id";
    static readonly UPDATE_PRODUCT_IS_ACTIVE = this.PRODUCT_PREFIX + "update-product-is-active";
    static readonly UPDATE_PRODUCT_VERIFICATION_DETAILS_BY_ID = this.PRODUCT_PREFIX + "update-product-verification-details-by-id";
    static readonly UPDATE_PRODUCT_VERIFICATION_REVIEW_BY_ID = this.PRODUCT_PREFIX + "update-product-verification-review-by-id";
    static readonly DELETE_PRODUCT_BY_ID = this.PRODUCT_PREFIX + "delete-product-by-id";
    static readonly DELETE_PRODUCT_VERIFICATION_DETAILS_BY_ID = this.PRODUCT_PREFIX + "delete-product-verification-details-by-id";

    /* consumer product */
    static readonly GET_CONSUMER_PRODUCT_BY_FILTER = this.PRODUCT_PREFIX + "get-consumer-product-by-filter";
    static readonly GET_CONSUMER_SPECIFICATION_FILTER_BY_SUBCAT_ID = this.PRODUCT_PREFIX + "get-consumer-specification-filter-by-subcat_id";
    static readonly GET_CONSUMER_COMPARED_PRODUCT = this.PRODUCT_PREFIX + "get-consumer-compared-product";
    static readonly GET_PRODUCT_DETAILS = this.PRODUCT_PREFIX + "get-product-details";

    /* Report api*/
    static readonly CREATE_REPORT = this.REPORT_PREFIX + "create-report";
    static readonly GET_REPORT_DETAILS = this.REPORT_PREFIX + "get-report-details";
    static readonly GET_SUPPLIER_REPORT_LIST_BY_FILTER = this.REPORT_PREFIX + "get-supplier-report-list-by-filter";
    static readonly GET_ADMIN_REPORT_LIST_BY_FILTER = this.REPORT_PREFIX + "get-admin-report-list-by-filter";
    static readonly UPDATE_REPORT_STATUS = this.REPORT_PREFIX + "update-report-status";

}