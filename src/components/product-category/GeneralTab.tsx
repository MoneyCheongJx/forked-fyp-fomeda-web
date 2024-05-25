"use client"

import {Button, Dropdown, Row, Table, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {GENERAL_SPECIFICATIONS_CONSTANTS} from "@/constants/category.constant";
import React, {useState} from "react";
import Link from "next/link";
import AddSpecificationModel from "@/components/product-category/AddSpecificationModel";


const renderStatus = (is_active: boolean) => (
    is_active ? <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag> :
        <Tag bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
);

const defineActionList = (action: any) => action.map((item: any) => ({
    key: item.key,
    label: (
        <Link href={item.link}>
            {item.label}
        </Link>
    ),
}))

const renderActions = (action_list: any) => (
    <Dropdown menu={{items: defineActionList(action_list)}}>
        <Button>Actions</Button>
    </Dropdown>
);

const GeneralTab = () => {
    const [openAddModel, setOpenAddModel] = useState(null);

    const defineTableHeader = (tableHeader: any) => tableHeader.map((column: any) => {
        if (column.key === 'is_active') {
            return {
                ...column,
                render: (status: boolean) => renderStatus(status),
            };
        }
        if (column.key === 'actions') {
            return {
                ...column,
                render: () => renderActions(column.actionList),
            };
        }
        return column;
    });

    return (
        <div>
            {GENERAL_SPECIFICATIONS_CONSTANTS.map((item: any) => (
                <div key={item.key} className="mb-8">
                    <Row className="mb-2 justify-between ">
                        <h3>{item.title}</h3>
                        <Button type="primary" icon={<PlusOutlined/>}
                                onClick={() => {
                                    setOpenAddModel(item.key)
                                }}>
                            {item.button}
                        </Button>
                    <AddSpecificationModel data={item} isOpen={openAddModel === item.key} onClose={() => setOpenAddModel(null)}/>
                    </Row>
                    <Table columns={defineTableHeader(item.tableHeader)}
                        // dataSource={}
                           pagination={{
                               defaultPageSize: 10,
                               showSizeChanger: true,
                               pageSizeOptions: [10, 20, 50, 100],
                           }}
                    />
                </div>
            ))}
        </div>
    )
}
export default GeneralTab;