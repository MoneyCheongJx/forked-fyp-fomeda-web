"use client"

import {Button, Col, Dropdown, Form, Input, Modal, Radio, Row, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {CATEGORY_TABLE_ACTIONS_CONSTANTS, CATEGORY_TABLE_HEADER_CONSTANTS} from "@/constants/category.constant";
import Link from "next/link";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import AddCategoryModel from "@/components/product-category/AddCategoryModel";
import CategoryService from "@/services/category.service";
import commander from "commander";

const renderStatus = (is_active: boolean) => (
    is_active ? <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag> :
        <Tag bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
);

const CATEGORY_TABLE_ACTIONS_LIST = CATEGORY_TABLE_ACTIONS_CONSTANTS.map((item) => ({
    key: item.key,
    label: (
        <Link href={item.link}>
            {item.label}
        </Link>
    ),
}))

const renderActions = () => (
    <Dropdown menu={{items: CATEGORY_TABLE_ACTIONS_LIST}}>
        <Button>Actions</Button>
    </Dropdown>
);

const CategoryTab = () => {

    const [openAddModel, setOpenAddModel] = useState(false);
    const [categoryData, setCategoryData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const CATEGORY_TABLE_HEADER = CATEGORY_TABLE_HEADER_CONSTANTS.map((column) => {
        if (column.key === 'cat_name') {
            return {
                ...column,
                render: (text: any, record: any) => {
                    const value = record.cat_name || record.subcat_name;
                    return <span>{value}</span>;
                },
            }
        }
        if (column.key === 'is_active') {
            return {
                ...column,
                render: (status: boolean) => renderStatus(status),
            };
        }
        if (column.key === 'actions') {
            return {
                ...column,
                render: () => renderActions(),
            };
        }
        return column;
    });

    const getAllCategory = async () => {
        try {
            const response  = await CategoryService.getAllCategory();
            setCategoryData(response);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleOnAdd = async () => {
        await getAllCategory();
    }

    useEffect(() => {
        getAllCategory().then(() => {});
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Row style={{justifyContent: "space-between", marginBottom: 16}}>
                <Col span={8}>
                    <Input placeholder="category" prefix={<SearchOutlined/>} size="large"></Input>
                </Col>
                <Button type="primary" icon={<PlusOutlined/>} iconPosition="start"
                        onClick={() => setOpenAddModel(true)}>Add Category</Button>
                <AddCategoryModel isOpen={openAddModel} onClose={() => setOpenAddModel(false)} categoryData={categoryData} onAdd={handleOnAdd}/>
            </Row>
            <Table
                columns={CATEGORY_TABLE_HEADER}
                dataSource={categoryData.map((cat) => {
                    const dataItem = { ...cat, key: cat._id};
                    if(cat.children && cat.children.length > 0) {
                        dataItem.children = cat.children.map((subcat: any) => ({
                            ...subcat,
                            key: subcat._id,
                        }))
                    }
                    return dataItem;
                })}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                }}/>
        </div>
    )
}

export default CategoryTab;