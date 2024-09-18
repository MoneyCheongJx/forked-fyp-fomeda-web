"use client";

import {Button, Form, Input, Modal, Radio, Row, Select} from "antd";
import {
    CategoryConstant,
    SPECIFICATION_FIELD_TYPE_OPTIONS,
    SPECIFICATION_TYPE_CONSTANT,
} from "@/constants/category.constant";
import RatingTable from "@/components/product-category/RatingTable";
import React, {useEffect, useState} from "react";
import CategoryService from "@/services/category.service";
import {EditOutlined} from "@ant-design/icons";
import ConfirmationContent from "@/components/product-category/ConfirmationContent";
import NotificationService from "@/services/notification.service";
import MessageService from "@/services/message.service";

const ViewSpecificationPage = ({specId}: any) => {
    const [form] = Form.useForm();
    const [specificationData, setSpecificationData] = useState<any>({});
    const [originalSpecificationData, setOriginalSpecificationData] = useState<any>({});
    const [specificationType, setSpecificationType] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [specificationOptions, setSpecificationOptions] = useState<any[]>([]);
    const isSpecification = !specId.includes(CategoryConstant.SUBSPECIFICATION_PREFIX);
    const SPECIFICATION_TYPE = SPECIFICATION_TYPE_CONSTANT[specificationType];

    const fieldTypeOptions = SPECIFICATION_FIELD_TYPE_OPTIONS.map((option: any) => ({
        value: option.key,
        label: option.label,
    }));

    const getSpecificationDataMapping: any = {
        [CategoryConstant.GENERAL_SUBSPECIFICATION_PREFIX]: CategoryService.findGeneralSubspecificationById,
        [CategoryConstant.BASE_SUBSPECIFICATION_PREFIX]: CategoryService.findBaseSubspecificationById,
        [CategoryConstant.SUBSPECIFICATION_PREFIX]: CategoryService.findSubcategorySubspecificationById,
        [CategoryConstant.GENERAL_SPECIFICATION_PREFIX]: CategoryService.findGeneralSpecificationById,
        [CategoryConstant.BASE_SPECIFICATION_PREFIX]: CategoryService.findBaseSpecificationById,
        [CategoryConstant.SPECIFICATION_PREFIX]: CategoryService.findSubcategorySpecificationById,
    };

    const getSpecificationData = async () => {
        const prefix = Object.keys(getSpecificationDataMapping)
            .find((prefix) => specId.includes(prefix));
        if (prefix) {
            const response = await getSpecificationDataMapping[prefix](specId);
            setSpecificationData(response);
            setOriginalSpecificationData(response);
            setSpecificationType(response.cat_type ?? CategoryConstant.SPECIFICATION);
            form.setFieldsValue(response);
            if (!isSpecification) {
                await getSpecificationFilter(response.subcat_spec_id)
            }
        }
    };

    const getSpecificationFilter = async (specId: string) => {
        const prefix = Object.keys(getSpecificationDataMapping).find((prefix) =>
            specId.includes(prefix)
        );
        if (prefix) {
            const response = await getSpecificationDataMapping[prefix](specId);
            if (response) {
                setSpecificationOptions([{
                    value: response._id,
                    label: response.subcat_spec_name,
                }]);
            }
        }
    }

    useEffect(() => {
        getSpecificationData().then();
    }, []);


    const handleOnModelOpen = async () => {
        try {
            await form.validateFields();
            const data = form.getFieldsValue();
            Modal.confirm({
                title: <h3>Confirmation</h3>,
                content: <ConfirmationContent action={"Edit"} record={{
                    cat_type: specificationType,
                    subcat_spec_name: data.subcat_spec_name ?? specificationOptions[0].label,
                    subcat_subspec_name: data.subcat_subspec_name,
                }}/>,
                className: "confirmation-modal",
                centered: true,
                width: "35%",
                okText: "Confirm",
                onOk: () => handleFormSubmit(data),
            });
        } catch (error) {
            MessageService.error("Please Filled in the required field.")
            throw error;
        }
    }

    const updateSpecificationDataMapping: any = {
        [CategoryConstant.GENERAL_SUBSPECIFICATION_PREFIX]: CategoryService.updateGeneralSubspecification,
        [CategoryConstant.BASE_SUBSPECIFICATION_PREFIX]: CategoryService.updateBaseSubspecification,
        [CategoryConstant.SUBSPECIFICATION_PREFIX]: CategoryService.updateSubcategorySubspecification,
        [CategoryConstant.GENERAL_SPECIFICATION_PREFIX]: CategoryService.updateGeneralSpecification,
        [CategoryConstant.BASE_SPECIFICATION_PREFIX]: CategoryService.updateBaseSpecification,
        [CategoryConstant.SPECIFICATION_PREFIX]: CategoryService.updateSubcategorySpecification,
    };

    const handleFormSubmit = async (data: any) => {
        const prefix = Object.keys(updateSpecificationDataMapping).find((prefix) =>
            specId.includes(prefix)
        );

        if (prefix) {
            try {
                await updateSpecificationDataMapping[prefix](specId, data);
                NotificationService.success(
                    `Update ${SPECIFICATION_TYPE}`,
                    `${data.subcat_subspec_name ?? data.subcat_spec_name} is updated successfully.`);
                setIsEdit(false);
            } catch (e) {
                NotificationService.error(
                    `Update ${SPECIFICATION_TYPE}`,
                    `${data.subcat_subspec_name ?? data.subcat_spec_name} failed to update.`);
                throw e;
            }
        }
    };

    const handleCancel = () => {
        setSpecificationData(originalSpecificationData);
        setIsEdit(false);
        form.setFieldsValue(originalSpecificationData);
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
        isDisabled?: boolean,
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

        let displayValue;
        if (type === 'radio') {
            displayValue = value ? "Yes" : "No";
        } else if (type === 'select') {
            displayValue = options.filter((option: any) => option.value === value)[0]?.label;
        } else {
            displayValue = value;
        }

        return (
            <Form.Item label={<h5>{label}</h5>} labelCol={{span: 6}} labelAlign="left" name={name}
                       rules={isEdit ? rules : []}>
                {isEdit ? inputElement : <div>{displayValue}</div>}
            </Form.Item>
        );
    };

    return (
        <>
            <Row justify="end">
                <Button icon={<EditOutlined/>}
                        disabled={isEdit}
                        type="primary"
                        onClick={() => setIsEdit(!isEdit)}>
                    Edit {SPECIFICATION_TYPE}
                </Button>
            </Row>
            <Form form={form}
                  name={`specification_form`}
                  className="mx-8 max-w-3xl"
                  initialValues={specificationData}>

                {specificationType === CategoryConstant.SPECIFICATION ? (
                    <Form.Item label={<h5>Specification Type:</h5>}
                               labelCol={{span: 6}}
                               labelAlign="left">
                        {isEdit ? (
                            <Radio.Group disabled value={isSpecification}>
                                <Radio value={true}>Specification</Radio>
                                <Radio value={false}>Subspecification</Radio>
                            </Radio.Group>
                        ) : (
                            <div>{isSpecification ? "Specification" : "Subspecification"}</div>
                        )}
                    </Form.Item>
                ) : <></>}

                {!isSpecification ? (
                    <>
                        {renderFormItem(`${SPECIFICATION_TYPE} Name`,
                            (value, option: any) => setSpecificationData((prevState: any) => ({
                                ...prevState,
                                subcat_spec_id: value,
                                subcat_spec_name: option?.label || prevState.subcat_spec_name,
                            })),
                            "select",
                            "subcat_spec_id",
                            [
                                {required: true, message: `${SPECIFICATION_TYPE} Name is required`}
                            ],
                            specificationData.subcat_spec_id,
                            true,
                            specificationOptions)}

                        {renderFormItem("Subspecification Name",
                            (e) => setSpecificationData((prevState: any) => ({
                                ...prevState,
                                subcat_subspec_name: e.target.value,
                            })),
                            "input",
                            "subcat_subspec_name",
                            [
                                {required: true, message: `Subspecification Name is required`}
                            ],
                            specificationData.subcat_subspec_name)}

                    </>
                ) : (
                    renderFormItem(`${SPECIFICATION_TYPE} Name`,
                        (e) => setSpecificationData((prevState: any) => ({
                            ...prevState,
                            subcat_spec_name: e.target.value,
                        })),
                        "input",
                        "subcat_spec_name",
                        [
                            {required: true, message: `${SPECIFICATION_TYPE} Name is required`}
                        ],
                        specificationData.subcat_spec_name)
                )}

                {renderFormItem("Allow Input",
                    (e) => setSpecificationData((prevState: any) => ({
                        ...prevState,
                        allow_input: e.target.value,
                    })),
                    "radio",
                    "allow_input",
                    [],
                    specificationData.allow_input,
                    true)}

                {renderFormItem("Required Field",
                    (e) => setSpecificationData((prevState: any) => ({
                        ...prevState,
                        is_required: e.target.value,
                    })),
                    "radio",
                    "is_required",
                    [],
                    specificationData.is_required,
                    true)}

                {renderFormItem("Prefix",
                    (e) => setSpecificationData((prevState: any) => ({
                        ...prevState,
                        prefix: e.target.value,
                    })),
                    "input",
                    "prefix",
                    [],
                    specificationData.prefix !== "" ? specificationData.prefix : "-")}

                {renderFormItem("Suffix",
                    (e) => setSpecificationData((prevState: any) => ({
                        ...prevState,
                        suffix: e.target.value,
                    })),
                    "input",
                    "suffix",
                    [],
                    specificationData.suffix !== "" ? specificationData.suffix : "-")}

                {renderFormItem("Field Type",
                    (e) => setSpecificationData((prevState: any) => ({
                        ...prevState,
                        field_type: e,
                    })),
                    "select",
                    "field_type",
                    [],
                    specificationData.field_type,
                    false,
                    fieldTypeOptions)}

                {renderFormItem("Contributed To Score",
                    (e) => setSpecificationData((prevState: any) => ({
                        ...prevState,
                        is_score_contributed: e.target.value,
                    })),
                    "radio",
                    "is_score_contributed",
                    [],
                    specificationData.is_score_contributed,
                    false)}

                {specificationData.is_score_contributed ? (
                    <Form.Item label={<h5>Rating Score</h5>}
                               labelCol={{span: 6}}
                               labelAlign="left"
                               name="rating_score">
                        <RatingTable form={form} type={specificationData.field_type} isEdit={isEdit}
                                     originalData={originalSpecificationData}/>
                    </Form.Item>
                ) : <></>}


                {isEdit && (
                    <Row justify="end" className="mb-8">
                        <Button type="default" className="m-2" size="large" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" className="m-2" size="large" onClick={handleOnModelOpen}>
                            Save {SPECIFICATION_TYPE}
                        </Button>
                    </Row>
                )}
            </Form>
        </>
    );
};

export default ViewSpecificationPage;
