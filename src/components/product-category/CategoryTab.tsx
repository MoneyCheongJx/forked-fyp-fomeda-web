"use client"

import {Button, Col, Dropdown, Input, Modal, Radio, Row, Table, Tag} from "antd";
import React, {useState} from "react";
import {CATEGORY_TABLE_ACTIONS_CONSTANTS, CATEGORY_TABLE_HEADER_CONSTANTS} from "@/constants/category.constant";
import Link from "next/link";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {CategoryModel} from "@/app/models/category.model";

const dummy: CategoryModel[] = []
for (let i = 0; i < 100; i++) {
    dummy.push({
        key: String(i),
        cat_id: 'CAT000000000001',
        cat_name: 'Television',
        created_by: 'Admin',
        created_on: '23 May 2024',
        last_updated_by: 'Admin',
        last_updated_on: '23 May 2024',
        is_active: true,
        actions: 'abc',
        children: [
            {
                key: '2',
                cat_id: 'SCAT000000000001',
                cat_name: '2K TV',
                created_by: 'Admin2',
                created_on: '23 May 2024',
                last_updated_by: 'Admin2',
                last_updated_on: '23 May 2024',
                is_active: false,
                actions: 'abc',
            },
        ],
    })
}

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
    const [isCategory, setIsCategory] = useState(true);

    const handleRadioChange = (e: any) => {
        setIsCategory(e.target.value);
    };

    const CATEGORY_TABLE_HEADER = CATEGORY_TABLE_HEADER_CONSTANTS.map((column) => {
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

    return (
        <div>
            <Row style={{justifyContent: "space-between", marginBottom: 16}}>
                <Col span={8}>
                    <Input placeholder="category" prefix={<SearchOutlined/>} size="large"></Input>
                </Col>
                <Button type="primary" icon={<PlusOutlined/>} iconPosition="start"
                        onClick={() => setOpenAddModel(true)}>Add Category</Button>
                <Modal
                    title={<h3>Add Category</h3>}
                    centered
                    open={openAddModel}
                    onOk={() => setOpenAddModel(false)}
                    okText="Add Category"
                    onCancel={() => setOpenAddModel(false)}
                >
                    <Row className="mb-2">
                        <h5 className="w-1/3">Category Type:</h5>
                        <Radio.Group onChange={handleRadioChange} value={isCategory}>
                            <Radio value={true}>Category</Radio>
                            <Radio value={false}>Subcategory</Radio>
                        </Radio.Group>
                    </Row>
                    {isCategory ?
                        <div>
                            <Row className="mb-2">
                                <h5 className="w-1/3">Category name:</h5>
                                <Input className="w-2/3"/>
                            </Row>
                        </div> :
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
            </Row>
            <Table
                columns={CATEGORY_TABLE_HEADER}
                dataSource={dummy}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                }}/>
        </div>
    )
}

export default CategoryTab;