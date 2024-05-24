"use client"

import {Button, Dropdown, Input, Modal, Radio, Row, Table, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {GENERAL_SPECIFICATIONS_CONSTANTS} from "@/constants/category.constant";
import React, {useState} from "react";
import Link from "next/link";
import {SpecificationModel} from "@/app/models/specification.model";


const dummy: SpecificationModel[] = []
for (let i = 0; i < 5; i++) {
    dummy.push({
        key: String(i),
        subspec_name: 'spec',
        created_by: 'Admin',
        created_on: '23 May 2024',
        last_updated_by: 'Admin',
        last_updated_on: '23 May 2024',
        is_active: true,
        children: [
            {
                key: '2',
                subspec_name: 'spec child',
                created_by: 'Admin2',
                created_on: '23 May 2024',
                last_updated_by: 'Admin2',
                last_updated_on: '23 May 2024',
                is_active: false,
            },
        ],
    })
}

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
    const [isSpecification, setIsSpecification] = useState(true);
    const handleSpecificationRadioChange = (e: any) => {
        setIsSpecification(e.target.value);
    };

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

    const modelExtraField = (key: string) => {
        return (
            <div>
                {key === "general_information" ? (
                    <Row className="mb-2">
                        <h5 className="w-2/5">Fillable:</h5>
                        <Radio.Group>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                        </Radio.Group>
                    </Row>
                ) : key === "product_specification" ? (
                    <div>
                        <Row className="mb-2">
                            <h5 className="w-2/5">Specification Type:</h5>
                            <Radio.Group onChange={handleSpecificationRadioChange} value={isSpecification}>
                                <Radio value={true}>Specification</Radio>
                                <Radio value={false}>Subspecification</Radio>
                            </Radio.Group>
                        </Row>
                        <Row className="mb-2">
                            <h5 className="w-2/5">Specification name:</h5>
                            <Input className="w-3/5"/>
                        </Row>
                        <Row className="mb-2">
                            <h5 className="w-2/5">Subspecification name:</h5>
                            <Input className="w-3/5"/>
                        </Row>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        )
    }

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
                        <Modal
                            title={<h3>{item.button}</h3>}
                            centered
                            open={openAddModel === item.key}
                            onOk={() => setOpenAddModel(null)}
                            okText={item.button}
                            onCancel={() => setOpenAddModel(null)}
                            width={"40%"}
                        >
                            {modelExtraField(item.key)}
                            {item.key !== 'product_specification' ?
                                <Row className="mb-2">
                                    <h5 className="w-2/5">{item.group} name:</h5>
                                    <Input className="w-3/5"/>
                                </Row> : <></>
                            }
                        </Modal>

                    </Row>
                    <Table columns={defineTableHeader(item.tableHeader)}
                           dataSource={dummy}
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