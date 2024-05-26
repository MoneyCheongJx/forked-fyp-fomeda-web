"use client"

import {Form, Input, Modal, Radio, Row, Select} from "antd";
import {CategoryModel} from "@/app/models/category.model";
import React, {useCallback, useEffect, useState} from "react";
import CategoryService from "@/services/category.service";
import {SubcategoryModel} from "@/app/models/subcategory.model";


const initialCategoryForm: CategoryModel = {
    cat_name: "",
    created_by: "Admin",
    last_updated_by: "Admin",
    is_active: false,
}

const initialSubcategoryForm: SubcategoryModel = {
    cat_id: "",
    subcat_name: "",
    created_by: "Admin",
    last_updated_by: "Admin",
    is_active: false,
}

const AddCategoryModel = ({isOpen, onClose, categoryData, onAdd}: any) => {
    const [categoryForm] = Form.useForm();
    const [categoryFormData, setCategoryFormData] = useState(initialCategoryForm);
    const [isCategory, setIsCategory] = useState(true);
    const [subcategoryForm] = Form.useForm();
    const [subcategoryFormData, setSubcategoryFormData] = useState(initialSubcategoryForm);

    const handleRadioChange = (e: any) => {
        setIsCategory(e.target.value);
    };

    const handleCategoryFormChange = (e: any) => {
        setCategoryFormData({
            ...categoryFormData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubcategoryFormChange = (value: any, fieldName: string) => {
        setSubcategoryFormData({
            ...subcategoryFormData,
            [fieldName]: value,
        })
    }

    const handleAddModelOnOk = async () => {
        categoryForm.validateFields().then(async () => {
            if (isCategory) {
                await handleCategoryFormSubmit(categoryFormData);
                categoryForm.resetFields();
                setCategoryFormData(initialCategoryForm);
            } else {
                await handleSubcategoryFormSubmit(subcategoryFormData);
                subcategoryForm.resetFields();
                setSubcategoryFormData(initialSubcategoryForm);
            }
            onAdd();
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

    const handleSubcategoryFormSubmit = async (e: any) => {
        try {
            await CategoryService.createSubcategory(subcategoryFormData)
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    const handleModalClose = () => {
        categoryForm.resetFields();
        onClose();
    };

    const filterCategoryData = useCallback(() => {
        return categoryData.map((category: any) => ({
            value: category._id,
            label: category.cat_name,
        }))
    }, [categoryData]);

    const [selectOptions, setSelectOptions] = useState(filterCategoryData());
    const [defaultSelectValue, setDefaultSelectValue] = useState("");

    useEffect(() => {
        const options = filterCategoryData();
        setSelectOptions(options);
        if (options.length > 0) {
            setDefaultSelectValue(options[0].value);
            setSubcategoryFormData(prevState => ({
                ...prevState,
                cat_id: options[0].value,
            }))
        }
    }, [filterCategoryData, categoryFormData]);

    return (
        <Modal
            title={<h3>Add Category</h3>}
            centered
            open={isOpen}
            onOk={handleAddModelOnOk}
            okText="Add Category"
            onCancel={handleModalClose}
        >
            <Form.Item
                label={<h5>Category Type</h5>}
                labelCol={{span: 10}}
                labelAlign="left"
                className="mb-2"
            >
                <Radio.Group onChange={handleRadioChange} value={isCategory}>
                    <Radio value={true}>Category</Radio>
                    <Radio value={false}>Subcategory</Radio>
                </Radio.Group>
            </Form.Item>
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
                    <Form form={subcategoryForm} name="subcategory_form">
                        <Form.Item<SubcategoryModel>
                            label={<h5>Category name</h5>}
                            labelCol={{span: 10}}
                            labelAlign="left"
                            className="mb-2"
                            name="cat_id"
                        >
                            <Select
                                defaultValue={defaultSelectValue}
                                onChange={(value) => handleSubcategoryFormChange(value, "cat_id")}
                                options={selectOptions}
                            />
                        </Form.Item>
                        <Form.Item<SubcategoryModel>
                            label={<h5>Subcategory name</h5>}
                            labelCol={{span: 10}}
                            labelAlign="left"
                            className="mb-2"
                            name="subcat_name"
                        >
                            <Input name="subcat_name"
                                   onChange={(e) => handleSubcategoryFormChange(e.target.value, "subcat_name")}
                            />
                        </Form.Item>
                    </Form>
                </div>
            }
        </Modal>
    )
}

export default AddCategoryModel;