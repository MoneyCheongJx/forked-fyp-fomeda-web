"use client"

import {Form, FormItemProps, Input, Modal, Radio, Select} from "antd";
import React, {useEffect, useState} from "react";
import CategoryService from "@/services/category.service";
import ConfirmationContent from "@/components/product-category/ConfirmationContent";
import MessageService from "@/services/message.service";

const CategoryUpdateModel = ({isOpen, onClose, isParent, isCategory, data, onUpdate, title, type}: any) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({...data});
    const [originalData, setOriginalData] = useState({...data});

    useEffect(() => {
        setFormData({...data});
        setOriginalData({...data});
        form.setFieldsValue({...data});
    }, [data, form]);

    const handleFormSubmit = async () => {
        const updateFunctions: any = {
            category: {
                true: CategoryService.updateCategory,
                false: CategoryService.updateSubcategory,
            },
            specification: {
                true: {
                    SPECIFICATION: CategoryService.updateGeneralSpecification,
                    CATEGORY: CategoryService.updateBaseSpecification,
                    SUBCATEGORY: CategoryService.updateSubcategorySpecification,
                },
                false: {
                    SPECIFICATION: CategoryService.updateGeneralSubspecification,
                    CATEGORY: CategoryService.updateBaseSubspecification,
                    SUBCATEGORY: CategoryService.updateSubcategorySubspecification,
                },
            }
        };

        const categoryType = isCategory ? 'category' : 'specification';
        try {
            if (typeof updateFunctions[categoryType][isParent] === 'function') {
                await updateFunctions[categoryType][isParent](data._id, formData);
            } else {
                await updateFunctions[categoryType][isParent][type](data._id, formData);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleUpdateModelOnOk = async () => {
        try {
            await form.validateFields();
            await handleFormSubmit();
            onUpdate();
            onClose();
        } catch (error: any) {
            MessageService.error(error.message)
            console.error('Validate Failed:', error);
        }
    };

    const handleConfirmationModelOpen = () => {
        Modal.confirm({
            title: <h3>Confirmation</h3>,
            content: <ConfirmationContent action="update" record={formData}/>,
            className: "confirmation-modal",
            centered: true,
            width: "35%",
            okText: "Confirm",
            onOk: () => handleUpdateModelOnOk(),
        });
    }

    const handleUpdateModelOnCancel = () => {
        form.setFieldsValue({...originalData});
        onClose();
    }

    const handleFormChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateModelButton = (): boolean => {
        let isValid = false;

        if ((isCategory && isParent && !formData.cat_name) ||
            (isCategory && !isParent && !formData.subcat_name) ||
            (!isCategory && isParent && !formData.subcat_spec_name) ||
            (!isCategory && !isParent && !formData.subcat_subspec_name))
            isValid = true;

        return isValid;
    }

    const renderFormItems = () => {
        const commonProps: FormItemProps = {
            labelCol: {span: 10},
            labelAlign: "left",
            className: "mb-2"
        };

        if (isCategory) {
            return isParent ? (
                <Form.Item label={<h5>{title} name</h5>} name="cat_name" {...commonProps}
                           rules={[{required: true, message: 'Category name is required'}]}>
                    <Input name="cat_name" onChange={handleFormChange}/>
                </Form.Item>
            ) : (
                <>
                    <Form.Item label={<h5>{title} name</h5>} name="cat_id" {...commonProps}
                               rules={[{required: true, message: 'Subcategory name is required'}]}>
                        <Select options={[{label: data.parent_name, value: data.cat_id}]}
                                disabled/>
                    </Form.Item>
                    <Form.Item label={<h5>Sub{title.toLowerCase()} name</h5>} name="subcat_name" {...commonProps}>
                        <Input name="subcat_name" onChange={handleFormChange}/>
                    </Form.Item>
                </>
            );
        } else {
            return isParent ? (
                <Form.Item label={<h5>{title} name</h5>} name="subcat_spec_name" {...commonProps}
                           rules={[{required: true, message: `${title} name is required`}]}>
                    <Input name="subcat_spec_name" onChange={handleFormChange}/>
                </Form.Item>
            ) : (
                <>
                    <Form.Item label={<h5>{title} name</h5>} name="subcat_spec_id" {...commonProps}>
                        <Select defaultValue={data.subcat_spec_name}
                                options={[{label: data.parent_name, value: data.subcat_spec_id}]}
                                onClick={() => console.log(data)}
                                disabled/>
                    </Form.Item>
                    <Form.Item label={<h5>Sub{title.toLowerCase()} name</h5>}
                               name="subcat_subspec_name" {...commonProps}
                               rules={[{required: true, message: `Sub${title.toLowerCase()} name is required`}]}>
                        <Input name="subcat_subspec_name" onChange={handleFormChange}/>
                    </Form.Item>
                </>
            );
        }
    };

    return (
        <Modal
            title={<h3>Update {title}</h3>}
            centered
            open={isOpen}
            onOk={handleConfirmationModelOpen}
            okText="Update"
            onCancel={handleUpdateModelOnCancel}
            width={"40%"}
            okButtonProps={{disabled: validateModelButton()}}
        >
            {isCategory || (!isCategory && data.cat_type === 'SPECIFICATION') ?
                <Form.Item label={<h5>{title} Type</h5>} labelCol={{span: 10}} labelAlign="left" className="mb-2">
                    <Radio.Group value={isParent} disabled>
                        <Radio value={true}>{title}</Radio>
                        <Radio value={false}>Sub{title.toLowerCase()}</Radio>
                    </Radio.Group>
                </Form.Item> : <></>
            }
            <Form form={form} name="category_form">
                {renderFormItems()}
            </Form>
        </Modal>
    );
};

export default CategoryUpdateModel;
