"use client";

import {Button, Form, Input, Modal, Radio, Row, Select} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {
    CategoryConstant,
    SPECIFICATION_FIELD_TYPE_OPTIONS,
    SPECIFICATION_TYPE_CONSTANT
} from "@/constants/category.constant";
import {SpecificationModel} from "@/models/specification.model";
import RatingTable from "@/components/product-category/RatingTable";
import {useRouter} from "next/navigation";
import CategoryService from "@/services/category.service";
import {SubspecificationModel} from "@/models/subspecification.model";
import NotificationService from "@/services/notification.service";
import ConfirmationContent from "@/components/product-category/ConfirmationContent";
import MessageService from "@/services/message.service";
import {ProductConstant} from "@/constants/product.constant";

const initialSpecificationFormData: SpecificationModel = {
    cat_id: '',
    subcat_id: '',
    subcat_spec_name: '',
    cat_type: '',
    allow_input: true,
    is_required: false,
    prefix: '',
    suffix: '',
    field_type: ProductConstant.ALPHANUMERIC,
    is_score_contributed: false,
    rating_score: [],
};

const initialSubspecificationFormData: SubspecificationModel = {
    subcat_spec_id: '',
    subcat_spec_name: '',
    subcat_subspec_name: '',
    allow_input: true,
    is_required: false,
    prefix: '',
    suffix: '',
    field_type: ProductConstant.ALPHANUMERIC,
    is_score_contributed: false,
    rating_score: [],
};

const AddSpecificationPage = ({specificationType, catId = ''}: any) => {
    const router = useRouter();

    const SPECIFICATION_TYPE = SPECIFICATION_TYPE_CONSTANT[specificationType]
    const [form] = Form.useForm();
    const [specificationFormData, setSpecificationFormData] = useState(initialSpecificationFormData);
    const [subspecificationFormData, setSubspecificationFormData] = useState(initialSubspecificationFormData);
    const [isSpecification, setIsSpecification] = useState(true);
    const [loading, setLoading] = useState(true);
    const [detailsData, setDetailsData] = useState<any[]>([]);
    const [defaultSelectValue, setDefaultSelectValue] = useState("");
    const [selectOptions, setSelectOptions] = useState([]);

    const fieldTypeOptions = SPECIFICATION_FIELD_TYPE_OPTIONS.map((option: any) => ({
        value: option.key,
        label: option.label,
    }));

    const onSpecificationRadioChange = (e: any) => {
        const value = e.target.value;
        setIsSpecification(value);
        if (value) specificationFormData.subcat_spec_name = subspecificationFormData.subcat_subspec_name;
        else subspecificationFormData.subcat_subspec_name = specificationFormData.subcat_spec_name;
    }

    const filterSpecificationData = useCallback(() => detailsData
            .filter((spec: any) => spec.cat_type === CategoryConstant.SPECIFICATION && spec.is_origin === undefined)
            .map((spec: any) => ({value: spec._id, label: spec.subcat_spec_name})),
        [detailsData]);

    useEffect(() => {
        const fetchDetailsData = async () => {
            try {
                let response;
                if (catId === null || catId === '' || catId === undefined) {
                    response = await CategoryService.getAllGeneralSpecifications();
                } else {
                    response = !catId.includes(CategoryConstant.SUBCATEGORY_PREFIX)
                        ? await CategoryService.findCategoryBaseSpecificationByCatId(catId)
                        : await CategoryService.findSubcategorySpecificationByCatId(catId);
                }
                setDetailsData(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        
        if (specificationType === CategoryConstant.SPECIFICATION) {
            fetchDetailsData().then();
        }
    }, [catId, specificationType]);

    useEffect(() => {
        const options: any = filterSpecificationData();
        setSelectOptions(options);
        if (options.length > 0) {
            setDefaultSelectValue(options[0].value);
            setSubspecificationFormData(prevState => ({
                ...prevState,
                subcat_spec_id: options[0].value,
                subcat_spec_name: options[0].label,
            }));
        }
    }, [filterSpecificationData]);

    const getSubmitMethod = (isSpecification: boolean, catId: string) => {
        if (catId === null || catId === '' || catId === undefined) {
            return isSpecification
                ? CategoryService.createGeneralSpecification
                : CategoryService.createGeneralSubspecification;
        } else if (!catId.includes(CategoryConstant.SUBCATEGORY_PREFIX)) {
            return isSpecification
                ? CategoryService.createCategoryBaseSpecification
                : CategoryService.createCategoryBaseSubspecification;
        } else {
            return isSpecification
                ? CategoryService.createSubcategorySpecification
                : CategoryService.createSubcategorySubspecification;
        }
    };

    const handleOnModelOpen = async () => {
        try {
            await form.validateFields();
            const data = isSpecification ? specificationFormData : subspecificationFormData;
            const commonFields = {
                allow_input: specificationFormData.allow_input,
                is_required: specificationFormData.is_required,
                prefix: specificationFormData.prefix,
                suffix: specificationFormData.suffix,
                field_type: specificationFormData.field_type,
                is_score_contributed: specificationFormData.is_score_contributed,
                rating_score: form.getFieldsValue().rating_score,
                cat_type: specificationType,
            };
            let submitData = {...data, ...commonFields,};

            if (isSpecification) {
                submitData = {
                    ...submitData,
                    cat_id: catId,
                    subcat_id: catId,
                }
            }

            Modal.confirm({
                title: <h3>Confirmation</h3>,
                content: <ConfirmationContent action={"Add"} record={submitData}/>,
                className: "confirmation-modal",
                centered: true,
                width: "35%",
                okText: "Confirm",
                onOk: async () => {
                    try {
                        await handleFormSubmit(submitData);
                    } catch (error: any) {
                        NotificationService.error(
                            `Add ${SPECIFICATION_TYPE}`,
                            `${error.message}`
                        );
                        return Promise.resolve();
                    }
                },
            });
        } catch (error) {
            MessageService.error("Please Filled in the required field.")
            throw error;
        }
    }

    const handleFormSubmit = async (submitData: any) => {
        const submitMethod = getSubmitMethod(isSpecification, catId);
        await submitMethod(submitData);
        NotificationService.success(
            `Add ${SPECIFICATION_TYPE}`,
            `${submitData.subcat_subspec_name ?? submitData.subcat_spec_name} is added successfully.`
        );
        router.back();
    };

    const renderRadioGroup = (onChange: (e: any) => void, defaultValue: any, isDisabled = false) => (
        <Radio.Group onChange={onChange} defaultValue={defaultValue} disabled={isDisabled}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
        </Radio.Group>
    );

    const renderFormItem = (
        label: string,
        onChange: (e: any, options?: any) => void,
        type: 'input' | 'select' | 'radio',
        name?: string,
        rules?: any[],
        value?: any,
        isDisabled = false,
        options?: any
    ) => {
        let inputElement;
        if (type === 'input') {
            inputElement = <Input name={name} onChange={onChange} disabled={isDisabled}/>;
        } else if (type === 'select') {
            inputElement = <Select defaultValue={value} onChange={onChange} options={options} disabled={isDisabled}/>;
        } else if (type === 'radio') {
            inputElement = renderRadioGroup(onChange, value, isDisabled);
        }

        return (
            <Form.Item label={<h5>{label}</h5>} labelCol={{span: 6}} labelAlign="left" name={name} rules={rules} initialValue={value}>
                {inputElement}
            </Form.Item>
        );
    };

    if (loading && specificationType === CategoryConstant.SPECIFICATION) {
        return <div>Loading...</div>;
    }

    return (
        <Form form={form} name={`${SPECIFICATION_TYPE}_form`} className="mx-8 max-w-3xl">
            {specificationType === CategoryConstant.SPECIFICATION ?
                <Form.Item label={<h5>Specification Type</h5>}
                           labelCol={{span: 6}}
                           labelAlign="left">
                    <Radio.Group onChange={onSpecificationRadioChange}
                                 value={isSpecification}>
                        <Radio value={true}>Specification</Radio>
                        <Radio value={false}>Subspecification</Radio>
                    </Radio.Group>
                </Form.Item> : <></>
            }

            {!isSpecification ? (
                <>
                    {renderFormItem(`${SPECIFICATION_TYPE} Name`,
                        (value, option: any) => setSubspecificationFormData((prevState: any) => ({
                            ...prevState,
                            subcat_spec_id: value,
                            subcat_spec_name: option?.label || prevState.subcat_spec_name,
                        })),
                        "select",
                        "subcat_spec_id",
                        [
                            {required: true, message: `${SPECIFICATION_TYPE} Name is required`}
                        ],
                        defaultSelectValue,
                        false,
                        selectOptions)}

                    {renderFormItem("Subspecification Name",
                        (e) => setSubspecificationFormData((prevState: any) => ({
                            ...prevState,
                            subcat_subspec_name: e.target.value,
                        })),
                        "input",
                        "subcat_subspec_name",
                        [
                            {required: true, message: `Subspecification Name is required`}
                        ])}
                </>
            ) : (
                renderFormItem(`${SPECIFICATION_TYPE} Name`,
                    (e) => setSpecificationFormData((prevState: any) => ({
                        ...prevState,
                        subcat_spec_name: e.target.value,
                    })),
                    "input",
                    "subcat_spec_name",
                    [
                        {required: true, message: `${SPECIFICATION_TYPE} Name is required`}
                    ],
                )
            )}

            {renderFormItem("Allow Input",
                (e) => setSpecificationFormData((prevState: any) => ({
                    ...prevState,
                    allow_input: e.target.value,
                })),
                "radio",
                "allow_input",
                [],
                specificationFormData.allow_input)}

            {specificationFormData.allow_input &&
                renderFormItem("Required Field",
                    (e) => setSpecificationFormData((prevState: any) => ({
                        ...prevState,
                        is_required: e.target.value,
                    })),
                    "radio",
                    "is_required",
                    [],
                    specificationFormData.is_required)}

            {specificationFormData.allow_input &&
                renderFormItem("Prefix",
                    (e) => setSpecificationFormData((prevState: any) => ({
                        ...prevState,
                        prefix: e.target.value,
                    })),
                    "input",
                    "prefix")}

            {specificationFormData.allow_input &&
                renderFormItem("Suffix",
                    (e) => setSpecificationFormData((prevState: any) => ({
                        ...prevState,
                        suffix: e.target.value,
                    })),
                    "input",
                    "suffix")}

            {specificationFormData.allow_input &&
                renderFormItem("Field Type",
                    (e) => setSpecificationFormData((prevState: any) => ({
                        ...prevState,
                        field_type: e,
                    })),
                    "select",
                    "field_type",
                    [],
                    fieldTypeOptions[0]?.value,
                    false,
                    fieldTypeOptions)}

            {specificationFormData.allow_input &&
                renderFormItem("Contributed To Score",
                    (e) => setSpecificationFormData((prevState: any) => ({
                        ...prevState,
                        is_score_contributed: e.target.value,
                    })),
                    "radio",
                    "is_score_contributed",
                    [],
                    specificationFormData.is_score_contributed)}

            {specificationFormData.is_score_contributed && specificationFormData.allow_input ?
                <Form.Item label={<h5>Rating Score</h5>}
                           labelCol={{span: 6}}
                           labelAlign="left"
                           name="rating_score">
                    <RatingTable form={form} type={specificationFormData.field_type}/>
                </Form.Item> : <></>
            }

            <Row justify="end" className="mb-8">
                <Button type="default" className="m-2" size="large" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="primary" className="m-2" size="large" onClick={handleOnModelOpen}>
                    Add {SPECIFICATION_TYPE}
                </Button>
            </Row>
        </Form>
    );
};

export default AddSpecificationPage;
