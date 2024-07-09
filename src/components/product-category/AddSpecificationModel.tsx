"use client";

import React, {useCallback, useEffect, useState} from "react";
import {Form, Input, Modal, Radio, Select} from "antd";
import CategoryService from "@/services/category.service";
import {SpecificationModel} from "@/models/specification.model";
import {SubspecificationModel} from "@/models/subspecification.model";
import ConfirmationContent from "@/components/product-category/ConfirmationContent";
import MessageService from "@/services/message.service";

const initialSpecificationFormData: SpecificationModel = {
    cat_id: "",
    subcat_id: "",
    subcat_spec_name: "",
    cat_type: "",
    created_by: "Admin",
    last_updated_by: "Admin",
    allow_input: false,
};

const initialSubspecificationFormData: SubspecificationModel = {
    cat_type: "",
    subcat_spec_id: "",
    subcat_spec_name: "",
    subcat_subspec_name: "",
    created_by: "Admin",
    last_updated_by: "Admin",
    allow_input: false,
};

const AddSpecificationModel = ({data, isOpen, onClose, onAdd, specificationData, type, catId}: any) => {
    const [form] = Form.useForm();
    const [isFillable, setIsFillable] = useState(true);
    const [isSpecification, setIsSpecification] = useState(true);
    const [specificationFormData, setSpecificationFormData] = useState(initialSpecificationFormData);
    const [subspecificationFormData, setSubspecificationFormData] = useState(initialSubspecificationFormData);

    const handleSpecificationRadioChange = (e: any) => {
        setIsSpecification(e.target.value);
    };

    const handleIsFillableRadioChange = (e: any) => {
        setIsFillable(e.target.value);
    };

    const handleSpecificationFormChange = (e: any) => {
        setSpecificationFormData({
            ...specificationFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubspecificationFormChange = (value: any, fieldName: string, option?: any) => {
        const updatedFormData = {
            ...subspecificationFormData,
            [fieldName]: value,
        };

        if (fieldName === "subcat_spec_id" && option) {
            updatedFormData.subcat_spec_name = option.label;
        }

        setSubspecificationFormData(updatedFormData);
    };

    const handleAddModelOnOk = async (type: string) => {
        form.validateFields().then(async () => {
            if (isSpecification) {
                await handleSpecificationFormSubmit(type);
            } else {
                await handleSubspecificationFormSubmit();
            }
            form.resetFields();
            setSpecificationFormData(initialSpecificationFormData);
            setSubspecificationFormData(initialSubspecificationFormData);
            subspecificationFormData.subcat_spec_name = defaultSelectValue;
            onAdd();
            onClose();
        }).catch(errorInfo => {
            MessageService.error(errorInfo.message);
        });
    };

    const handleConfirmationModelOpen = (type: string) => {
        Modal.confirm({
            title: <h3>Confirmation</h3>,
            content:
                <ConfirmationContent
                    action="add"
                    record={isSpecification ? {
                        ...specificationFormData,
                        cat_type: type
                    } : {
                        ...subspecificationFormData,
                        cat_type: type
                    }}/>,
            className: "confirmation-modal",
            centered: true,
            width: "35%",
            okText: "Confirm",
            onOk: () => handleAddModelOnOk(type),
        });
    }

    const handleSpecificationFormSubmit = async (cat_type: string) => {
        specificationFormData.cat_type = cat_type;
        specificationFormData.cat_id = catId;
        specificationFormData.subcat_id = catId;
        try {
            if (type === "SPECIFICATION") {
                await CategoryService.createGeneralSpecification(specificationFormData);
            } else if (type === "CATEGORY") {
                await CategoryService.createCategoryBaseSpecification(specificationFormData);
            } else if (type === "SUBCATEGORY") {
                await CategoryService.createSubcategorySpecification(specificationFormData);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleSubspecificationFormSubmit = async () => {
        try {
            if (type === "SPECIFICATION") {
                await CategoryService.createGeneralSubspecification(subspecificationFormData);
            } else if (type === "CATEGORY") {
                await CategoryService.createCategoryBaseSubspecification(subspecificationFormData);
            } else if (type === "SUBCATEGORY") {
                await CategoryService.createSubcategorySubspecification(subspecificationFormData);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleModalClose = () => {
        form.resetFields();
        subspecificationFormData.subcat_spec_name = selectOptions[0]?.label;
        onClose();
    };

    const filterSpecificationData = useCallback(() => {
        return specificationData
            .filter((spec: any) => spec.cat_type === "SPECIFICATION" && spec.is_origin === undefined)
            .map((spec: any) => ({
                value: spec._id,
                label: spec.subcat_spec_name,
            }));
    }, [specificationData]);

    const [selectOptions, setSelectOptions] = useState(filterSpecificationData());
    const [defaultSelectValue, setDefaultSelectValue] = useState("");

    useEffect(() => {
        const options = filterSpecificationData();
        setSelectOptions(options);
        if (options.length > 0) {
            setDefaultSelectValue(options[0].value);
            setSubspecificationFormData(prevState => ({
                ...prevState,
                subcat_spec_id: options[0].value,
                subcat_spec_name: options[0].label,
            }));
        }
    }, [filterSpecificationData, specificationFormData]);

    const validateModelButton = (): boolean => {
        let isValid = false;

        if ((isSpecification && !specificationFormData.subcat_spec_name) ||
            (!isSpecification && !subspecificationFormData.subcat_subspec_name))
            isValid = true;

        return isValid;
    }

    const renderGeneralInformation = () => {
        return (
            <Form.Item<SpecificationModel>
                label={<h5>Fillable</h5>}
                labelCol={{span: 10}}
                labelAlign="left"
                className="mb-2"
                name="allow_input"
            >
                <Radio.Group
                    name="allow_input"
                    onChange={(e) => {
                        handleSpecificationFormChange(e);
                        handleIsFillableRadioChange(e);
                    }}
                    value={isFillable}
                    defaultValue={true}
                >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                </Radio.Group>
            </Form.Item>
        )
    }

    const renderProductSpecification = () => {
        return (
            <div>
                <Form.Item<SpecificationModel>
                    label={<h5>Specification Type:</h5>}
                    labelCol={{span: 10}}
                    labelAlign="left"
                    className="mb-2"
                >
                    <Radio.Group
                        onChange={handleSpecificationRadioChange}
                        value={isSpecification}
                    >
                        <Radio value={true}>Specification</Radio>
                        <Radio value={false}>Subspecification</Radio>
                    </Radio.Group>
                </Form.Item>

                {!isSpecification ? (
                    <div>
                        <Form.Item<SubspecificationModel>
                            label={<h5>Specification name</h5>}
                            labelCol={{span: 10}}
                            labelAlign="left"
                            className="mb-2"
                            name="subcat_spec_id"
                            rules={[
                                {required: true, message: `Specification name is required`}
                            ]}
                        >
                            <Select
                                defaultValue={defaultSelectValue}
                                onChange={(value, option) =>
                                    handleSubspecificationFormChange(
                                        value,
                                        "subcat_spec_id",
                                        option
                                    )
                                }
                                options={selectOptions}
                            />
                        </Form.Item>
                        <Form.Item<SubspecificationModel>
                            label={<h5>Subspecification name</h5>}
                            labelCol={{span: 10}}
                            labelAlign="left"
                            className="mb-2"
                            name="subcat_subspec_name"
                            rules={[
                                {required: true, message: 'Subspecification name is required'}
                            ]}
                        >
                            <Input
                                name="subcat_subspec_name"
                                onChange={(e) =>
                                    handleSubspecificationFormChange(
                                        e.target.value,
                                        "subcat_subspec_name"
                                    )
                                }
                            />
                        </Form.Item>
                    </div>
                ) : (
                    <Form.Item<SpecificationModel>
                        label={<h5>Specification name</h5>}
                        labelCol={{span: 10}}
                        labelAlign="left"
                        className="mb-2"
                        name="subcat_spec_name"
                        rules={[
                            {required: true, message: `Specification name is required`}
                        ]}
                    >
                        <Input
                            name="subcat_spec_name"
                            onChange={handleSpecificationFormChange}
                        />
                    </Form.Item>
                )}
            </div>
        )
    }

    const modelExtraField = (key: string) => {
        switch(key) {
            case "general_information":
                return renderGeneralInformation();
            case "product_specification":
                return renderProductSpecification();
            default:
                return null;
        }
    };

    return (
        <Modal
            title={<h3>{data.button}</h3>}
            centered
            open={isOpen}
            onOk={() => handleConfirmationModelOpen(data.type)}
            okText={data.button}
            onCancel={handleModalClose}
            width={"40%"}
            okButtonProps={{disabled: validateModelButton()}}
        >
            <Form form={form} name={`${data.key}_form`}>
                {modelExtraField(data.key)}
                {data.key !== "product_specification" && (
                    <Form.Item<SpecificationModel>
                        label={<h5>{data.group} name</h5>}
                        labelCol={{span: 10}}
                        labelAlign="left"
                        className="mb-2"
                        name="subcat_spec_name"
                        rules={[
                            {required: true, message: `${data.group} name is required`}
                        ]}
                    >
                        <Input name="subcat_spec_name" onChange={handleSpecificationFormChange}/>
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default AddSpecificationModel;
