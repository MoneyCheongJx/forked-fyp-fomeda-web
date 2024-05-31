import {SubcategoryModel} from "@/models/subcategory.model";

export class CategoryModel {
    _id?: string;
    cat_name?: string;
    created_by?: string;
    created_on?: string;
    last_updated_by?: string;
    last_updated_on?: string;
    is_active?: boolean;
    actions?: string;
    children?: SubcategoryModel[];
}