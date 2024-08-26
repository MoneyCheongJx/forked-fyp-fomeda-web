import {SubspecificationModel} from "@/models/subspecification.model";
import {ScoreContributionModel} from "@/models/score_contribution.model";

export class SpecificationModel {
    _id?: string;
    cat_id?: string;
    subcat_id?: string;
    subcat_spec_name?: string;
    cat_type?: string;
    created_by?: string;
    created_on?: string;
    last_updated_by?: string;
    last_updated_on?: string;
    is_active?: boolean;
    allow_input?: boolean;
    actions?: string;
    children?: SubspecificationModel[];
    is_origin?: boolean;
    is_required?: boolean;
    prefix?: string;
    suffix?: string;
    field_type?: string;
    is_score_contributed?: boolean;
    rating_score?: ScoreContributionModel[];
}