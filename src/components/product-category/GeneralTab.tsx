"use client"

import {Button, Dropdown, Modal, Row, Table, Tag, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {SPECIFICATIONS_TABLE_CONSTANTS} from "@/constants/category.constant";
import React, {useEffect, useState} from "react";
import CategoryService from "@/services/category.service";
import "@/styles/category.component.css"
import {DateTimeUtils} from "@/utils/date-time.utils";
import ConfirmationContent from "@/components/product-category/ConfirmationContent";
import {usePathname, useRouter} from "next/navigation";
import NotificationService from "@/services/notification.service";
import {StringUtils} from "@/utils/string.utils";

const renderStatus = (is_active: boolean) => (
    is_active ? <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag> :
        <Tag bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
);

const GeneralTab = () => {
    const router = useRouter();
    const pathname = usePathname();

    const [specificationData, setSpecificationData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const defineActionList = (action: any, record: any) => {
        return action.map((item: any) => {
            if ((record.is_active && item.key === 'activate') ||
                (!record.is_active && item.key === 'deactivate')) {
                return null;
            }
            return {
                key: item.key,
                label: (
                    <Typography onClick={() => handleConfirmationModelOpen(item.key, record)}>
                        {item.label}
                    </Typography>
                ),
            };
        }).filter((item: any) => item !== null);
    };

    const handleConfirmationModelOpen = (key: string, record: any) => {
        if (key === 'view_specification') {
            router.push(`${pathname}/view-specification?id=${record._id}`);
        } else {
            Modal.confirm({
                title: <h3>Confirmation</h3>,
                content: <ConfirmationContent action={key} record={record}/>,
                className: "confirmation-modal",
                centered: true,
                width: "35%",
                okText: "Confirm",
                onOk: () => handleActionsOnClick(key, record),
            });
        }
    };

    const actionMappings: any = {
        deactivate: {
            specification: (id: string) => CategoryService.deactivateGeneralSpecification(id, false),
            subspecification: (id: string) => CategoryService.deactivateGeneralSubspecification(id, false),
        },
        activate: {
            specification: (id: string) => CategoryService.deactivateGeneralSpecification(id, true),
            subspecification: (id: string) => CategoryService.deactivateGeneralSubspecification(id, true),
        },
        delete: {
            specification: CategoryService.deleteGeneralSpecification,
            subspecification: CategoryService.deleteGeneralSubspecification,
        },
    };

    const handleActionsOnClick = (key: string, record: any) => {
        const actionType = record.subcat_subspec_name ? 'subspecification' : 'specification';
        actionMappings[key][actionType](record._id)
            .then(() =>
                NotificationService.success(
                    `${StringUtils.formatTitleCase(key)} Specification`,
                    `${record.subcat_subspec_name ?? record.subcat_spec_name} ${key} successfully`
                ))
            .then(handleOnUpdate)
            .catch((error: any) => NotificationService.error(
                `${StringUtils.formatTitleCase(key)} Specification`,
                `${record.subcat_subspec_name || record.subcat_spec_name} failed to ${key}`
            ));
    };

    const renderActions = (action_list: any, record: any) => (
        <Dropdown menu={{items: defineActionList(action_list, record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

    const defineTableHeader = (tableHeader: any[]) => tableHeader.map((column: any) => {
        switch (column.key) {
            case 'subcat_spec_name':
                return {
                    ...column,
                    render: (text: any, record: any) => {
                        const value = record.subcat_spec_name || record.subcat_subspec_name;
                        return <span>{value}</span>;
                    },
                    sorter: (a: any, b: any) => (a.subcat_spec_name || a.subcat_subspec_name).localeCompare(b.subcat_spec_name || b.subcat_subspec_name),
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
                    render: (text: any, record: any) => renderActions(column.actionList, record),
                };
            case 'created_on':
            case 'last_updated_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key], DateTimeUtils.CATEGORY_DATE_FORMAT),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    });

    const getAllSpecificationData = async () => {
        try {
            setLoading(true);
            const response = await CategoryService.getAllGeneralSpecifications();
            setSpecificationData(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleOnUpdate = async () => {
        await getAllSpecificationData().then(() => setLoading(false));
    };

    useEffect(() => {
        getAllSpecificationData().then(() => setLoading(false));
    }, []);


    return (
        <div>
            {SPECIFICATIONS_TABLE_CONSTANTS.map((item: any) => (
                <div key={item.key} className="mb-8">
                    <Row className="mb-2 justify-between">
                        <h3>{item.title}</h3>
                        <Button type="primary" icon={<PlusOutlined/>}
                                onClick={() => {
                                    router.push(`${pathname}/add-specification?type=${item.type}`);
                                }}>
                            {item.button}
                        </Button>
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
                           showSorterTooltip={false}
                           loading={loading}
                    />
                </div>
            ))}
        </div>
    );
};

export default GeneralTab;
