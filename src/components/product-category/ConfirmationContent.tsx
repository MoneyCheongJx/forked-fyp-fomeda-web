import React from "react";
import {SPECIFICATION_TYPE_CONSTANT} from "@/constants/category.constant";

const ConfirmationContent = ({ action, record }: any) => {
    const isCategory = !!(record.cat_name || record.subcat_name);
    const isSubcategory = record.subcat_name !== undefined;
    const isSubspecification = record.subcat_subspec_name !== undefined;
    const catType = record.subcat_name? "Subcategory": "Category"
    const specType = SPECIFICATION_TYPE_CONSTANT[record.cat_type];
    const parent = record.parent_name ?? (isCategory? (record.parent_name ?? record.cat_name) : (record.parent_name ?? record.subcat_spec_name));
    const name = isCategory? (record.subcat_name ?? record.cat_name) : (record.subcat_subspec_name ?? record.subcat_spec_name);

    return (
        <div>
            <br />
            Are you sure you want to <b>{action}</b> this {isCategory ? catType : specType}?
            <br />
            <div>
                <b>{isCategory ? "Category" : specType}:</b> {parent}
            </div>
            {isSubspecification || isSubcategory ?
                <div>
                    <b>{isCategory? catType : "Sub"+specType.toLowerCase()}:</b> {name}
                </div> :<></>
            }
            <br/>
        </div>
    );
}

export default ConfirmationContent;