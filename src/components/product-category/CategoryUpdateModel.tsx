"use client"

import {Form, FormItemProps, Input, Modal, Radio, Select} from "antd";
import React, {useEffect, useState} from "react";
import CategoryService from "@/services/category.service";

const CategoryUpdateModel = ({ isOpen, onClose, isParent, isCategory, data, onUpdate, title }: any) => {
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
                true: CategoryService.updateGeneralSpecification,
                false: CategoryService.updateGeneralSubspecification,
            }
        };

        const categoryType = isCategory ? 'category' : 'specification';
        try {
            await updateFunctions[categoryType][isParent](data._id, formData);
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
        } catch (error) {
            console.error('Validate Failed:', error);
        }
    };

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

    const renderFormItems = () => {
        const commonProps: FormItemProps = {
            labelCol: { span: 10 },
            labelAlign: "left",
            className: "mb-2"
        };

        if (isCategory) {
            return isParent ? (
                <Form.Item label={<h5>{title} name</h5>} {...commonProps}>
                    <Input name="cat_name" onChange={handleFormChange} defaultValue={data.cat_name}/>
                </Form.Item>
            ) : (
                <>
                    <Form.Item label={<h5>{title} name</h5>} name="cat_id" {...commonProps}>
                        <Select defaultValue={data.cat_id} options={[{ label: data.parent_name, value: data.cat_id }]} disabled />
                    </Form.Item>
                    <Form.Item label={<h5>Sub{title.toLowerCase()} name</h5>} name="subcat_name" {...commonProps}>
                        <Input name="subcat_name" onChange={handleFormChange} defaultValue={data.subcat_name}/>
                    </Form.Item>
                </>
            );
        } else {
            return isParent ? (
                <Form.Item label={<h5>{title} name</h5>} {...commonProps}>
                    <Input name="subcat_spec_name" onChange={handleFormChange} />
                </Form.Item>
            ) : (
                <>
                    <Form.Item label={<h5>{title} name</h5>} name="subcat_spec_id" {...commonProps}>
                        <Select defaultValue={data.cat_name} options={[{ label: data.cat_name, value: data.cat_id }]} disabled />
                    </Form.Item>
                    <Form.Item label={<h5>Sub{title.toLowerCase()} name</h5>} name="subcat_subspec_name" {...commonProps}>
                        <Input name="subcat_subsepc_name" onChange={handleFormChange} />
                    </Form.Item>
                </>
            );
        }
    };

    return (
        <Modal
            title={<h3>Update Category</h3>}
            centered
            open={isOpen}
            onOk={handleUpdateModelOnOk}
            okText="Update"
            onCancel={handleUpdateModelOnCancel}
        >
            <Form.Item label={<h5>{title} Type</h5>} labelCol={{ span: 10 }} labelAlign="left" className="mb-2">
                <Radio.Group value={isParent} disabled>
                    <Radio value={true}>{title}</Radio>
                    <Radio value={false}>Sub{title.toLowerCase()}</Radio>
                </Radio.Group>
            </Form.Item>
            <Form form={form} name="category_form">
                {renderFormItems()}
            </Form>
        </Modal>
    );
};

export default CategoryUpdateModel;
