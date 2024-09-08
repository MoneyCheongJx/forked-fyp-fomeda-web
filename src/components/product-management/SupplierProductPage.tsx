import {Button, Col, Dropdown, Form, Input, Modal, Rate, Row, Select, Table, Tag, Typography} from "antd";
import {PlusOutlined, SearchOutlined, StarFilled} from "@ant-design/icons";
import {
    SUPPLIER_PRODUCT_LIST_ACTION_CONSTANT,
    SUPPLIER_PRODUCT_LIST_TABLE_HEADER
} from "@/constants/suppliers.constant";
import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import ProductService from "@/services/product.service";
import {ProductModel} from "@/models/product.model";
import {ProductFilterModel} from "@/models/product-filter.model";
import {ProductConstant} from "@/constants/product.constant";
import ProductConfirmationContent from "@/components/product-management/ProductConfirmationContent";
import CategoryService from "@/services/category.service";
import CustomSelect from "@/components/common/CustomSelect";

const SupplierProductPage = () => {

    const router = useRouter();
    const pathname = usePathname();
    const [filterForm] = Form.useForm();
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleConfirmationModelOpen = (key: string, record: any) => {
        if (key === 'view_product') {
            router.push(`product/view-product?id=${record._id}`)
        } else {
            return Modal.confirm({
                title: <h3>Confirmation</h3>,
                content: <ProductConfirmationContent action={key} record={record}/>,
                className: "confirmation-modal",
                centered: true,
                width: "35%",
                okText: "Confirm",
                onOk: () => handleActionsOnClick(key, record),
            })
        }
    }

    const handleActionsOnClick = async (key: string, record: any) => {
        try {
            if (key === "activate") {
                await ProductService.updateProductIsActive(record._id).then(getTableData);
            } else if (key === "deactivate") {
                await ProductService.updateProductIsActive(record._id).then(getTableData);
            } else if (key === "delete") {
                await ProductService.deleteProductById(record._id).then(getTableData);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const defineMenuItem = (record: any) => {
        return SUPPLIER_PRODUCT_LIST_ACTION_CONSTANT.map((item) => {
            if ((record.is_active && item.key === 'activate') || (!record.is_active && item.key === 'deactivate')) {
                return null;
            }
            return {
                key: item.key,
                label: (
                    <Typography onClick={() => handleConfirmationModelOpen(item.key, record)}>
                        {item.label}
                    </Typography>
                ),
            }
        }).filter(item => item !== null);
    };

    const getTableData = async () => {
        try {
            const searchFilter = filterForm.getFieldsValue();
            searchFilter.status = ProductConstant.APPROVED;
            const response = await ProductService.getProductByFilter(searchFilter);
            setProductList(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        getTableData().then()
    }, []);

    const handleSearch = async () => {
        await getTableData();
    };

    const handleReset = async () => {
        filterForm.resetFields();
        await getTableData();
    };

    const fetchAllCategoryAndSubcategory = async () => {
        try {
            const response = await CategoryService.findAllActiveCategories();
            if (response) {
                const catOptions = response.map((cat: any) => {
                    const subcatOptions = cat.children?.map((subcat: any) => ({
                        label: subcat.subcat_name,
                        value: subcat._id,
                    }));
                    return {
                        label: cat.cat_name,
                        title: cat._id,
                        options: subcatOptions,
                    }
                })
                setCategoryOptions(catOptions);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    useEffect(() => {
        fetchAllCategoryAndSubcategory().then();
    }, []);

    const handleSelectedCategory = (values) => {
        setSelectedCategory(values);
    }

    const renderActions = (record: any) => (
        <Dropdown menu={{items: defineMenuItem(record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

    const renderIsActive = (is_active: boolean) => (
        is_active ? <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag> :
            <Tag bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
    );

    const SUPPLIER_PRODUCT_TABLE_HEADER = SUPPLIER_PRODUCT_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'rating':
                return {
                    ...column,
                    render: (text: any, record: any) => <Rate disabled defaultValue={record.rating} allowHalf/>
                };
            case 'is_active':
                return {
                    ...column,
                    render: (is_active: boolean) => renderIsActive(is_active),
                    sorter: (a: any, b: any) => b.is_active - a.is_active,
                };
            case 'actions':
                return {
                    ...column,
                    render: (text: any, record: any) => renderActions(record),
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    })

    return (
        <div className="mt-4">
            <Row className="flex justify-between items-center space-x-3">
                <Col flex={"auto"}>
                    <Form form={filterForm}>
                        <Row className="flex space-x-3">
                            <Form.Item<ProductFilterModel> name="search" className={"w-1/3"}>
                                <Input prefix={<SearchOutlined/>} placeholder="Product Name / Model Number"
                                       className="max-w-lg"/>
                            </Form.Item>
                            <Form.Item<ProductFilterModel> name="cat_ids" className={"w-1/6"}>
                                <CustomSelect placeholder="Category" options={categoryOptions} showSearch={true}
                                              optionsPlaceholder={"Search Category..."}
                                              onChange={handleSelectedCategory}
                                              values={selectedCategory}/>
                            </Form.Item>
                            <Button type="primary" onClick={handleSearch}>Search</Button>
                            <Button type="default" onClick={handleReset}>Reset</Button>
                        </Row>
                    </Form>
                </Col>
                <Button type="primary" icon={<PlusOutlined/>} onClick={() => router.push(`${pathname}/add-product`)}>Add
                    Product</Button>
            </Row>
            <Table className="mt-4" columns={SUPPLIER_PRODUCT_TABLE_HEADER} showSorterTooltip={false}
                   dataSource={productList} rowKey="_id"/>
        </div>
    )
}

export default SupplierProductPage;