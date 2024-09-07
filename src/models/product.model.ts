export class ProductModel {
    _id?: string;
    product_name?: string;
    model_no?: string;
    cat_id?: string;
    cat_name?:string;
    subcat_id?: string;
    subcat_name?: string;
    product_img?: any;
    status?: string;
    last_updated_on?: string;
    approved_by?: string;
    approved_on?: string;
    is_active?: boolean;
    rating?: number;
    specification?: Array<any>;
}