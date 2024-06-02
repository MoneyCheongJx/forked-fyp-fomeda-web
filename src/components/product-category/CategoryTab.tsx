"use client"

import {Button, Col, Dropdown, Input, Modal, Row, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {CATEGORY_TABLE_ACTIONS_CONSTANTS, CATEGORY_TABLE_HEADER_CONSTANTS} from "@/constants/category.constant";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import AddCategoryModel from "@/components/product-category/AddCategoryModel";
import CategoryService from "@/services/category.service";
import CategoryUpdateModel from "@/components/product-category/CategoryUpdateModel";
import "@/styles/category.component.css"
import Link from "next/link";
import {useRouter} from "next/navigation";
import {DateTimeUtils} from "@/utils/date-time.utils";
import ConfimationContent from "@/components/product-category/ConfimationContent";

const renderStatus = (is_active: boolean) => (
    is_active ? <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag> :
        <Tag bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
);

const CategoryTab = () => {

    const router = useRouter();
    const [openAddModel, setOpenAddModel] = useState(false);
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [filteredCategoryData, setFilteredCategoryData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [openUpdateModel, setUpdateModel] = useState(false);
    const [isParent, setIsParent] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState<any[]>([]);

    const handleSearch = (value: any) => {
        const trimmedValue = value.trim();
        const filteredData = categoryData.filter((item) => {
            const itemName = item.cat_name || item.subcat_name;
            const includesName = itemName.toLowerCase().includes(trimmedValue.toLowerCase());
            const includesChildName = item.children && item.children.some((child: any) => {
                const childName = child.cat_name || child.subcat_name;
                return childName.toLowerCase().includes(trimmedValue.toLowerCase());
            });
            return includesName || includesChildName;
        });
        setFilteredCategoryData(filteredData);
    };

    useEffect(() => {
        setFilteredCategoryData(categoryData);
    }, [categoryData]);

    const handleActionsOnClick = (key: string, record: any) => {
        if (key === 'edit_category') {
            setUpdateModel(true);
            setSelectedRecord(record);
            record.subcat_name ? setIsParent(false) : setIsParent(true);
        } else if (key === 'deactivate') {
            (record.subcat_name ? deactivateSubcategory(record._id, false) : deactivateCategory(record._id, false)).then(handleOnUpdate);
        } else if (key === 'activate') {
            (record.subcat_name ? deactivateSubcategory(record._id, true) : deactivateCategory(record._id, true)).then(handleOnUpdate);
        } else {
            (record.subcat_name ? deleteSubcategory(record._id) : deleteCategory(record._id)).then(handleOnUpdate);
        }
    }

    const handleConfirmationModelOpen = (key: string, record: any) => {
        if (key === 'edit_category') {
            handleActionsOnClick(key, record);
        } else if (key === 'view_details') {
            router.push(`product-category/details/${record._id}`)
        } else {
            return Modal.confirm({
                title: <h3>Confirmation</h3>,
                content: <ConfimationContent action={key} record={record} />,
                className: "confirmation-modal",
                centered: true,
                width: "35%",
                okText: "Confirm",
                onOk: () => handleActionsOnClick(key, record),
            })
        }
    }

    const handleConfirmationModelContent = (key: string, record: any) => {
        const isSub = record.subcat_name ? "Subcategory" : "Category";
        const parent = record.parent_name ?? "";
        const name = record.subcat_name ?? record.cat_name;
        return (
            <div>
                <br/>
                Are you sure you want to <b>{key}</b> this {isSub}?
                <br/>
                {parent ?
                    <div>
                        <b>Category:</b> {parent}
                    </div> : <></>}
                <b>{isSub}</b>: {name}
                <br/><br/>
            </div>
        )
    }

    const deactivateCategory = async (id: string, is_active: boolean) => {
        try {
            await CategoryService.deactivateCategory(id, is_active);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const deactivateSubcategory = async (id: string, is_active: boolean) => {
        try {
            await CategoryService.deactivateSubcategory(id, is_active);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const deleteCategory = async (id: string) => {
        try {
            await CategoryService.deleteCategory(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const deleteSubcategory = async (id: string) => {
        try {
            await CategoryService.deleteSubcategory(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const renderActions = (record: any) => (
        <Dropdown menu={{items: defineMenuItem(record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

    const defineMenuItem = (record: any) => {
        return CATEGORY_TABLE_ACTIONS_CONSTANTS.map((item) => {
            if ((record.is_active && item.key === 'activate') || (!record.is_active && item.key === 'deactivate')) {
                return null;
            }
            return {
                key: item.key,
                label: (
                    <div onClick={() => handleConfirmationModelOpen(item.key, record)}>
                        {item.label}
                    </div>
                ),
            }
        }).filter(item => item !== null);
    };

    const CATEGORY_TABLE_HEADER = CATEGORY_TABLE_HEADER_CONSTANTS.map((column) => {
        switch (column.key) {
            case 'cat_name':
                return {
                    ...column,
                    render: (text: any, record: any) => (
                        <Link href={`product-category/details/${record._id}`}>
                            {record.cat_name || record.subcat_name}
                        </Link>
                    ),
                    sorter: (a: any, b: any) => (a.cat_name || a.subcat_name).localeCompare(b.cat_name || b.subcat_name),
                };
            case 'is_active':
                return {
                    ...column,
                    render: (status: boolean) => renderStatus(status),
                    sorter: (a: any, b: any) => b.is_active - a.is_active,
                };
            case 'actions':
                return {
                    ...column,
                    render: (text: any, record: any) => renderActions(record),
                };
            case 'created_on':
            case 'last_updated_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key]),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    });

    const getAllCategory = async () => {
        try {
            const response = await CategoryService.getAllCategory();
            setCategoryData(response);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleOnUpdate = async () => {
        await getAllCategory();
    }

    useEffect(() => {
        getAllCategory().then(() => {
        });
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Row style={{justifyContent: "space-between", marginBottom: 16}}>
                <Col span={8}>
                    <Input placeholder="category"
                           prefix={<SearchOutlined/>}
                           size="large"
                           onChange={(e) => handleSearch(e.target.value)}
                    />
                </Col>
                <Button type="primary" icon={<PlusOutlined/>} iconPosition="start"
                        onClick={() => setOpenAddModel(true)}>Add Category</Button>
                <AddCategoryModel isOpen={openAddModel} onClose={() => setOpenAddModel(false)}
                                  categoryData={categoryData} onAdd={handleOnUpdate}/>
            </Row>
            <Table
                columns={CATEGORY_TABLE_HEADER}
                dataSource={filteredCategoryData.map((cat) => {
                    const dataItem = {...cat, key: cat._id};
                    if (cat.children && cat.children.length > 0) {
                        dataItem.children = cat.children.map((subcat: any) => ({
                            ...subcat,
                            key: subcat._id,
                            parent_name: cat.cat_name,
                        }))
                    }
                    return dataItem;
                })}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                }}
                showSorterTooltip={false}
                sortDirections={['ascend', 'descend', 'ascend']}
            />
            <CategoryUpdateModel
                isOpen={openUpdateModel}
                onClose={() => setUpdateModel(false)}
                isParent={isParent}
                isCategory={true}
                onUpdate={handleOnUpdate}
                title="Category"
                data={selectedRecord}
            />
        </div>
    )
}

export default CategoryTab;