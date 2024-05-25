"use client"

import React, {useState} from "react";
import {Form, Input, Modal, Radio, Row} from "antd";
import CategoryService from "@/services/category.service";
import {SpecificationModel} from "@/app/models/specification.model";

const initialSpecificationFormData: SpecificationModel = {
    subcat_spec_name: "",
    cat_type: "",
    created_by: "Admin",
    last_updated_by: "Admin",
    allow_input: false,
}

const AddSpecificationModel = ({data, isOpen, onClose}: any) => {
    const [form] = Form.useForm();
    const [isFillable, setIsFillable] = useState(true);
    const [isSpecification, setIsSpecification] = useState(true);
    const [specificationFormData, setSpecificationFormData] = useState(initialSpecificationFormData)

    const handleSpecificationRadioChange = (e: any) => {
        setIsSpecification(e.target.value);
    };

    const handleIsFillableRadioChange = (e: any) => {
        setIsFillable(e.target.value);
    }

    const handleSpecificationFormChange = (e: any) => {
        setSpecificationFormData({
            ...specificationFormData,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddModelOnOk = async (type: string) => {
        form.validateFields().then(async (values) => {
            specificationFormData.cat_type = type;
            await handleSpecificationFormSubmit(specificationFormData);
            setSpecificationFormData(initialSpecificationFormData);
            form.resetFields(); // Reset the form fields
            onClose();
        }).catch(errorInfo => {
            console.error('Validate Failed:', errorInfo);
        });
    }

    const handleSpecificationFormSubmit = async (e: any) => {
        try {
            await CategoryService.createGeneralSpecification(specificationFormData)
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    const handleModalClose = () => {
        form.resetFields();
        onClose();
    };

    const modelExtraField = (key: string) => {
        return (
            <div>
                {key === "general_information" ? (
                    <Form.Item<SpecificationModel>
                        label={<h5>Fillable:</h5>}
                        labelCol={{span: 10}}
                        labelAlign="left"
                        className="mb-2"
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
                            <Radio.Group onChange={handleSpecificationRadioChange} value={isSpecification}>
                                <Radio value={true}>Specification</Radio>
                                <Radio value={false}>Subspecification</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item<SpecificationModel>
                            label={<h5>Specification name</h5>}
                            labelCol={{span: 10}}
                            labelAlign="left"
                            className="mb-2"
                        >
                            <Input name="subcat_spec_name"
                                   onChange={handleSpecificationFormChange}/>
                        </Form.Item>

                        <Form.Item<SpecificationModel>
                            label={<h5>Subspecification name</h5>}
                            labelCol={{span: 10}}
                            labelAlign="left"
                            className="mb-2"
                        >
                            <Input onChange={handleSpecificationFormChange}/>
                        </Form.Item>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        )
    }

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
            <Form form={form} name="specification_form">
                {modelExtraField(data.key)}
                {data.key !== 'product_specification' ?
                    <Form.Item<SpecificationModel>
                        label={<h5>{data.group} name</h5>}
                        labelCol={{span: 10}}
                        labelAlign="left"
                        className="mb-2"
                    >
                        <Input name="subcat_spec_name" onChange={handleSpecificationFormChange}/>
                    </Form.Item> : <></>
                }
            </Form>
        </Modal>
    )
}

export default AddSpecificationModel;