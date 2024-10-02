export class ConsumerFilterModel {
    subcat_id?: string[];
    search?: string;
    specification?: SpecificationFilter[];
    subspecification?: SubspecificationFilter[]
}

class SpecificationFilter {
    spec_id?: string;
    spec_name?: string;
    spec_type?: string;
    field_type?: string;
    desc_list?: string[];
    prefix?: string;
    suffix?: string;
}

class SubspecificationFilter {
    spec_id?: string;
    subspec_id?: string;
    subspec_name?: string;
    spec_type?: string;
    field_type?: string;
    desc_list?: string[];
    prefix?: string;
    suffix?: string;
}