"use client"

import {Form, Input, Modal, Radio, Row} from "antd";
import {CategoryModel} from "@/app/models/category.model";
import React, {useState} from "react";
import CategoryService from "@/services/category.service";


const initialCategoryForm: CategoryModel = {
    cat_name: "",
    created_by: "Admin",
    last_updated_by: "Admin",
    is_active: false,
}

const AddCategoryModel = ({ isOpen, onClose }: any) => {
    const [categoryForm] = Form.useForm();
    const [categoryFormData, setCategoryFormData] = useState(initialCategoryForm);
    const [isCategory, setIsCategory] = useState(true);

    const handleRadioChange = (e: any) => {
        setIsCategory(e.target.value);
    };

    const handleCategoryFormChange = (e: any) => {
        setCategoryFormData({
            ...categoryFormData,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddModelOnOk = async () => {
        categoryForm.validateFields().then(async () => {
            await handleCategoryFormSubmit(categoryFormData);
            setCategoryFormData(initialCategoryForm);
            categoryForm.resetFields();
            onClose();
        }).catch(errorInfo => {
            console.error('Validate Failed:', errorInfo);
        });
    }

    const handleCategoryFormSubmit = async (e: any) => {
        try {
            await CategoryService.createCategory(categoryFormData)
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    const handleModalClose = () => {
        categoryForm.resetFields();
        onClose();
    };

    return (
        <Modal
            title={<h3>Add Category</h3>}
            centered
            open={isOpen}
            onOk={handleAddModelOnOk}
            okText="Add Category"
            onCancel={handleModalClose}
        >
            <Row className="mb-2">
                <h5 className="w-1/3">Category Type:</h5>
                <Radio.Group onChange={handleRadioChange} value={isCategory}>
                    <Radio value={true}>Category</Radio>
                    <Radio value={false}>Subcategory</Radio>
                </Radio.Group>
            </Row>
            {isCategory ?
                <Form form={categoryForm} name="category_form">
                    <Form.Item<CategoryModel>
                        label={<h5>Category name</h5>}
                        labelCol={{span: 10}}
                        labelAlign="left"
                        className="mb-2"
                    >
                        <Input name="cat_name" onChange={handleCategoryFormChange}/>
                    </Form.Item>
                </Form> :
                <div>
                    <Row className="mb-2">
                        <h5 className="w-1/3">Category name:</h5>
                        <Input className="w-2/3"/>
                    </Row>
                    <Row className="mb-2">
                        <h5 className="w-1/3">Subcategory name:</h5>
                        <Input className="w-2/3"/>
                    </Row>
                </div>
            }
        </Modal>
    )
}

export default AddCategoryModel;