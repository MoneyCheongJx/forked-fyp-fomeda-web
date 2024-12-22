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
            true: CategoryService.updateCategory,
            false: CategoryService.updateSubcategory,
        };

        const catName = isParent ? form.getFieldValue("cat_name") : form.getFieldValue("subcat_name");

        try {
            await updateFunctions[isParent](data._id, formData).then(() => onUpdate("update", catName));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleUpdateModelOnOk = async () => {
        try {
            await form.validateFields();
            await handleFormSubmit();
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
            (isCategory && !isParent && !formData.subcat_name))
            isValid = true;

        return isValid;
    }

    const commonProps: FormItemProps = {
        labelCol: {span: 10},
        labelAlign: "left",
        className: "mb-2"
    };

    return (
        <Modal title={<h3>Update {title}</h3>}
               centered
               open={isOpen}
               onOk={handleConfirmationModelOpen}
               okText="Update"
               onCancel={handleUpdateModelOnCancel}
               width={"40%"}
               okButtonProps={{disabled: validateModelButton()}}>
            {isCategory || (!isCategory && data.cat_type === 'SPECIFICATION') ?
                <Form.Item label={<h5>{title} Type</h5>} labelCol={{span: 10}} labelAlign="left" className="mb-2">
                    <Radio.Group value={isParent} disabled>
                        <Radio value={true}>{title}</Radio>
                        <Radio value={false}>Sub{title.toLowerCase()}</Radio>
                    </Radio.Group>
                </Form.Item> : <></>
            }
            <Form form={form} name="category_form">
                {isParent ? (
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
                )}
            </Form>
        </Modal>
    );
};

export default CategoryUpdateModel;
