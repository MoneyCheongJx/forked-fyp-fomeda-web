import {Button, Col, Dropdown, Form, Input, Modal, Rate, Row, Table, Tag, Typography} from "antd";
import {
    PRODUCT_HISTORY_LIST_TABLE_HEADER, SUPPLIER_HISTORY_LIST_ACTION_CONSTANT,
} from "@/constants/suppliers.constant";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import ProductService from "@/services/product.service";
import {ProductFilterModel} from "@/models/product-filter.model";
import {ProductModel} from "@/models/product.model";
import {ProductConstant} from "@/constants/product.constant";
import {usePathname, useRouter} from "next/navigation";
import CustomSelect from "@/components/common/CustomSelect";
import CategoryService from "@/services/category.service";
import ProductConfirmationContent from "@/components/common/ProductConfirmationContent";

const SupplierProductHistoryPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [filterForm] = Form.useForm();
    const [historyList, setHistoryList] = useState<ProductModel[]>([]);
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
            if (key === "resubmit") {
                // await ProductService.updateProductById(record._id).then(getTableData);
            } else if (key === "delete") {
                await ProductService.deleteProductById(record._id).then(getTableData);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const defineMenuItem = (record: any) => {
        return SUPPLIER_HISTORY_LIST_ACTION_CONSTANT.map((item) => {
            if ((record.status === ProductConstant.PENDING && item.key === 'resubmit')) {
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
            const response = await ProductService.getProductByFilter(searchFilter);
            setHistoryList(response);
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

    const PRODUCT_HISTORY_TABLE_HEADER = PRODUCT_HISTORY_LIST_TABLE_HEADER.map((column) => {
        switch (column.key) {
            case 'status':
                return {
                    ...column,
                    render: (text: any, record: any) => renderStatus(record.status)
                };
            case 'rating':
                return {
                    ...column,
                    render: (text: any, record: any) => <Rate disabled defaultValue={record.rating} allowHalf/>
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

    const renderStatus = (status: string) => {
        switch (status) {
            case ProductConstant.APPROVED: {
                return <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Approved</Tag>
            }
            case ProductConstant.PENDING: {
                return <Tag color={'yellow'} bordered={false} className="px-3 py-0.5 rounded-xl">Pending</Tag>
            }
            case ProductConstant.REJECTED: {
                return <Tag color={'red'} bordered={false} className="px-3 py-0.5 rounded-xl">Rejected</Tag>
            }
        }
    };


    return (
        <div className="mt-4">
            <Row className="flex justify-between items-center space-x-3">
                <Col flex={"auto"}>
                    <Form form={filterForm}>
                        <Row className="flex space-x-3">
                            <Form.Item<ProductFilterModel> name="search" className={"w-1/3 m-0"}>
                                <Input prefix={<SearchOutlined/>} placeholder="Product Name / Model Number"
                                       className="max-w-lg"/>
                            </Form.Item>
                            <Form.Item<ProductFilterModel> name="cat_ids" className={"w-1/6 m-0"}>
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
            <Table className="mt-4" columns={PRODUCT_HISTORY_TABLE_HEADER} showSorterTooltip={false}
                   dataSource={historyList} rowKey="_id"/>
        </div>
    )
}

export default SupplierProductHistoryPage;