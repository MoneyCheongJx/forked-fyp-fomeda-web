"use client";

import React, {useCallback, useEffect, useState} from "react";
import {Form, Input, Modal, Radio, Select} from "antd";
import CategoryService from "@/services/category.service";
import {SpecificationModel} from "@/app/models/specification.model";
import {SubspecificationModel} from "@/app/models/subspecification.model";

const initialSpecificationFormData: SpecificationModel = {
    subcat_spec_name: "",
    cat_type: "",
    created_by: "Admin",
    last_updated_by: "Admin",
    allow_input: false,
};

const initialSubspecificationFormData: SubspecificationModel = {
    subcat_spec_id: "",
    subcat_subspec_name: "",
    created_by: "Admin",
    last_updated_by: "Admin",
    allow_input: false,
};

const AddSpecificationModel = ({data, isOpen, onClose, onAdd, specificationData}: any) => {
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

    const handleSubspecificationFormChange = (value: any, fieldName: string) => {
        setSubspecificationFormData({
            ...subspecificationFormData,
            [fieldName]: value,
        });
    };

    const handleAddModelOnOk = async (type: string) => {
        form.validateFields()
            .then(async () => {
                specificationFormData.cat_type = type;
                if (isSpecification) {
                    await handleSpecificationFormSubmit();
                } else {
                    await handleSubspecificationFormSubmit();
                }
                form.resetFields();
                setSpecificationFormData(initialSpecificationFormData);
                setSubspecificationFormData(initialSubspecificationFormData);
                onAdd();
                onClose();
            })
            .catch((errorInfo) => {
                console.error("Validate Failed:", errorInfo);
            });
    };

    const handleSpecificationFormSubmit = async () => {
        try {
            await CategoryService.createGeneralSpecification(specificationFormData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleSubspecificationFormSubmit = async () => {
        try {
            await CategoryService.createGeneralSubspecification(
                subspecificationFormData
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleModalClose = () => {
        form.resetFields();
        onClose();
    };

    const filterSpecificationData = useCallback(() => {
        return specificationData
            .filter((spec: any) => spec.cat_type === "SPECIFICATION")
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
            }));
        }
    }, [filterSpecificationData, specificationFormData]);

    const modelExtraField = (key: string) => {
        return (
            <div>
                {key === "general_information" ? (
                    <Form.Item<SpecificationModel>
                        label={<h5>Fillable:</h5>}
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
                ) : key === "product_specification" ? (
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
                                >
                                    <Select
                                        defaultValue={defaultSelectValue}
                                        onChange={(value) =>
                                            handleSubspecificationFormChange(
                                                value,
                                                "subcat_spec_id"
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
                            >
                                <Input
                                    name="subcat_spec_name"
                                    onChange={handleSpecificationFormChange}
                                />
                            </Form.Item>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        );
    };

    return (
        <Modal
            title={<h3>{data.button}</h3>}
            centered
            open={isOpen}
            onOk={() => handleAddModelOnOk(data.type)}
            okText={data.button}
            onCancel={handleModalClose}
            width={"40%"}
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
                    >
                        <Input name="subcat_spec_name" onChange={handleSpecificationFormChange}/>
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default AddSpecificationModel;
