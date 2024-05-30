"use client"

import {Button, Dropdown, Modal, Row, Table, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {SPECIFICATIONS_TABLE_CONSTANTS} from "@/constants/category.constant";
import React, {useEffect, useState} from "react";
import AddSpecificationModel from "@/components/product-category/AddSpecificationModel";
import CategoryService from "@/services/category.service";
import CategoryUpdateModel from "@/components/product-category/CategoryUpdateModel";
import "@/styles/category.component.css"
import {DateTimeUtils} from "@/utils/date-time.utils";

const renderStatus = (is_active: boolean) => (
    is_active ? <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag> :
        <Tag bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
);

const GeneralTab = () => {
    const [specificationData, setSpecificationData] = useState<any[]>([]);
    const [openAddModel, setOpenAddModel] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [openUpdateModel, setUpdateModel] = useState(false);
    const [isParent, setIsParent] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState<any>([]);

    const defineActionList = (action: any, record: any) => {
        return action.map((item: any) => {
            if (record.is_active && item.key === 'activate') {
                return null;
            }
            if (!record.is_active && item.key === 'deactivate') {
                return null;
            }
            return {
                key: item.key,
                label: (
                    <div onClick={() => handleConfirmationModelOpen(item.key, record)}>
                        {item.label}
                    </div>
                ),
            };
        }).filter((item: any) => item !== null);
    };

    const handleConfirmationModelOpen = (key: string, record: any) => {
        if (key === 'edit_specification') {
            handleActionsOnClick(key, record);
        } else {
            Modal.confirm({
                title: <h3>Confirmation</h3>,
                content: handleConfirmationModelContent(key, record),
                className: "confirmation-modal",
                centered: true,
                width: "35%",
                okText: "Confirm",
                onOk: () => handleActionsOnClick(key, record),
            });
        }
    };

    const handleActionsOnClick = (key: string, record: any) => {
        if (key === 'edit_specification') {
            setUpdateModel(true);
            setSelectedRecord(record);
            record.subcat_subspec_name ? setIsParent(false) : setIsParent(true);
        } else if (key === 'deactivate') {
            (record.subcat_subspec_name ? deactivateGeneralSubspecification(record._id, false) : deactivateGeneralSpecification(record._id, false)).then(handleOnUpdate);
        } else if (key === 'activate') {
            (record.subcat_subspec_name ? deactivateGeneralSubspecification(record._id, true) : deactivateGeneralSpecification(record._id, true)).then(handleOnUpdate);
        } else {
            (record.subcat_subspec_name ? deleteGeneralSubspecification(record._id) : deleteGeneralSpecification(record._id)).then(handleOnUpdate);
        }
    };

    const deactivateGeneralSpecification = async (id: string, is_active: boolean) => {
        try {
            await CategoryService.deactivateGeneralSpecification(id, is_active);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deactivateGeneralSubspecification = async (id: string, is_active: boolean) => {
        try {
            await CategoryService.deactivateGeneralSubspecification(id, is_active);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deleteGeneralSpecification = async (id: string) => {
        try {
            await CategoryService.deleteGeneralSpecification(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deleteGeneralSubspecification = async (id: string) => {
        try {
            await CategoryService.deleteGeneralSubspecification(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const specTypeMap: { [key: string]: string } = {
        GENERAL: "Information",
        CERTIFICATION: "Certification",
        SERVICE: "Service",
        SPECIFICATION: "Specification",
    };

    const handleConfirmationModelContent = (key: string, record: any) => {
        const spec = specTypeMap[record.cat_type];
        const parent = record.parent_name ?? record.subcat_spec_name;
        const name = record.subcat_subspec_name ?? record.subcat_spec_name;
        return (
            <div>
                <br/>
                Are you sure you want to <b>{key}</b> this {spec}?
                <br/>
                <div>
                    <b>{spec}:</b> {parent}
                </div>
                {parent != name ?
                    <div>
                        <b>Sub{spec.toLowerCase()}:</b> {name}
                    </div> : <></>
                }
                <br/>
            </div>
        );
    };

    const renderActions = (action_list: any, record: any) => (
        <Dropdown menu={{items: defineActionList(action_list, record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

    const defineTableHeader = (tableHeader: any[]) => tableHeader.map((column: any) => {
        switch(column.key) {
            case 'subcat_spec_name':
                return {
                    ...column,
                    render: (text: any, record: any) => {
                        const value = record.subcat_spec_name || record.subcat_subspec_name;
                        return <span>{value}</span>;
                    },
                };
            case 'is_active':
                return {
                    ...column,
                    render: (status: boolean) => renderStatus(status),
                };
            case 'actions':
                return {
                    ...column,
                    render: (text: any, record: any) => renderActions(column.actionList, record),
                };
            case 'created_on':
            case 'last_updated_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key]),
                };
            default:
                return column;
        }
    });

    const getAllSpecificationData = async () => {
        try {
            const response = await CategoryService.getAllGeneralSpecifications();
            setSpecificationData(response);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleOnUpdate = async () => {
        await getAllSpecificationData();
    };

    useEffect(() => {
        getAllSpecificationData().then(() => {
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {SPECIFICATIONS_TABLE_CONSTANTS.map((item: any) => (
                <div key={item.key} className="mb-8">
                    <Row className="mb-2 justify-between">
                        <h3>{item.title}</h3>
                        <Button type="primary" icon={<PlusOutlined/>}
                                onClick={() => {
                                    setOpenAddModel(item.key);
                                }}>
                            {item.button}
                        </Button>
                        <AddSpecificationModel data={item}
                                               isOpen={openAddModel === item.key}
                                               onClose={() => setOpenAddModel(null)}
                                               onAdd={handleOnUpdate}
                                               specificationData={specificationData}
                                               type="SPECIFICATION"
                        />
                    </Row>
                    <Table columns={defineTableHeader(item.tableHeader)}
                           dataSource={specificationData.filter(spec => spec.cat_type === item.type).map(spec => {
                               const dataItem = {...spec, key: spec._id};
                               if (spec.children && spec.children.length > 0) {
                                   dataItem.children = spec.children.map((subspec: any) => ({
                                       ...subspec,
                                       key: subspec._id,
                                       parent_name: spec.subcat_spec_name,
                                       cat_type: spec.cat_type,
                                   }));
                               }
                               return dataItem;
                           })}
                           pagination={{
                               defaultPageSize: 10,
                               showSizeChanger: true,
                               pageSizeOptions: [10, 20, 50, 100],
                           }}
                    />
                    <CategoryUpdateModel
                        isOpen={openUpdateModel}
                        onClose={() => setUpdateModel(false)}
                        isParent={isParent}
                        isCategory={false}
                        onUpdate={handleOnUpdate}
                        title={String(specTypeMap[selectedRecord.cat_type]).toString()}
                        data={selectedRecord}
                        type="SPECIFICATION"
                    />
                </div>
            ))}
        </div>
    );
};

export default GeneralTab;
