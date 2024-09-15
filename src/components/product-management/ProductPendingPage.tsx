import {Button, Col, Dropdown, Form, Input, Modal, Row, Table, Typography} from "antd";
import {
    PRODUCT_PENDING_LIST_TABLE_HEADER, SUPPLIER_PENDING_LIST_ACTION_CONSTANT,
} from "@/constants/suppliers.constant";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {ProductConstant} from "@/constants/product.constant";
import ProductService from "@/services/product.service";
import {ProductFilterModel} from "@/models/product-filter.model";
import {ProductModel} from "@/models/product.model";
import {DateTimeUtils} from "@/utils/date-time.utils";
import {usePathname, useRouter} from "next/navigation";
import CustomSelect from "@/components/common/CustomSelect";
import ProductConfirmationContent from "@/components/common/ProductConfirmationContent";
import CategoryService from "@/services/category.service";

const ProductPendingPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [filterForm] = Form.useForm();
    const [pendingList, setPendingList] = useState<ProductModel[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleConfirmationModelOpen = (key: string, record: any) => {
        if (key === 'view_product') {
            router.push(`product/view-product?id=${record._id}`)
        } else {
            return Modal.confirm({
                title: <h3>Confirmation</h3>,
                content: <ProductConfirmationContent action={key} record={record} details={"product"}/>,
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
            await ProductService.deleteProductById(record._id).then(getTableData);
        } catch (error) {
            console.error(error);
        }
    }

    const defineMenuItem = (record: any) => {
        return SUPPLIER_PENDING_LIST_ACTION_CONSTANT.map((item) => {
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
            searchFilter.status = ProductConstant.PENDING;
            const response = await ProductService.getProductByFilter(searchFilter);
            setPendingList(response);
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

    const handleSelectedCategory = (values: any) => {
        setSelectedCategory(values);
    }

    const PRODUCT_PENDING_TABLE_HEADER = PRODUCT_PENDING_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'last_updated_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key], DateTimeUtils.CATEGORY_DATE_FORMAT),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
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

    const renderActions = (record: any) => (
        <Dropdown menu={{items: defineMenuItem(record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

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
            <Table className="mt-4" columns={PRODUCT_PENDING_TABLE_HEADER} showSorterTooltip={false}
                   dataSource={pendingList} rowKey="_id"/>
        </div>
    )
}

export default ProductPendingPage;