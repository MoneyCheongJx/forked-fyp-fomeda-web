import CategoryService from "@/services/category.service";
import React, {useEffect, useState} from "react";
import {SPECIFICATIONS_TABLE_CONSTANTS} from "@/constants/category.constant";
import {Button, Col, Dropdown, Modal, Row, Table, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import AddSpecificationModel from "@/components/product-category/AddSpecificationModel";
import CategoryUpdateModel from "@/components/product-category/CategoryUpdateModel";
import {DateTimeUtils} from "@/utils/date-time.utils";
import ConfirmationContent from "@/components/product-category/ConfirmationContent";

const renderStatus = (is_active: boolean) => (
    is_active ? <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag> :
        <Tag bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
);

const CategoryDetailsPage = ({id}: { id: string }) => {

    const isCategory = !id.includes('SCAT');
    const [detailsData, setDetailsData] = useState<any>({})
    const [openAddModel, setOpenAddModel] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [openUpdateModel, setOpenUpdateModel] = useState(false);
    const [isParent, setIsParent] = useState(true);
    const [selectedRecord, setSelectedRecord] = useState<any>([]);
    const [name, setName] = useState<any>([]);

    const defineActionList = (action: any, record: any) => {
        return action.map((item: any) => {
            if ((record.is_active && item.key === 'activate') || (!record.is_active && item.key === 'deactivate')) {
                return null;
            }
            return {
                key: item.key,
                label: (
                    <Button type="link" onClick={() => handleConfirmationModelOpen(item.key, record)}>
                        {item.label}
                    </Button>
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
                content: <ConfirmationContent action={key} record={record}/>,
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
            setOpenUpdateModel(true);
            setSelectedRecord(record);
            record.subcat_subspec_name ? setIsParent(false) : setIsParent(true);
        } else if (key === 'deactivate') {
            (record.subcat_subspec_name ? deactivateSubspecification(record._id, false) : deactivateSpecification(record._id, false)).then(handleOnUpdate);
        } else if (key === 'activate') {
            (record.subcat_subspec_name ? deactivateSubspecification(record._id, true) : deactivateSpecification(record._id, true)).then(handleOnUpdate);
        } else {
            (record.subcat_subspec_name ? deleteSubspecification(record._id) : deleteSpecification(record._id)).then(handleOnUpdate);
        }
    };

    const deactivateSpecification = async (id: string, is_active: boolean) => {
        try {
            if (isCategory) {
                await CategoryService.deactivateCategoryBaseSpecification(id, is_active);
            } else {
                await CategoryService.deactivateSubcategorySpecification(id, is_active);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deactivateSubspecification = async (id: string, is_active: boolean) => {
        try {
            if (isCategory) {
                await CategoryService.deactivateCategoryBaseSubspecification(id, is_active);
            } else {
                await CategoryService.deactivateSubcategorySubspecification(id, is_active);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deleteSpecification = async (id: string) => {
        try {
            if (isCategory) {
                await CategoryService.deleteCategoryBaseSpecification(id);
            } else {
                await CategoryService.deleteSubcategorySpecification(id);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deleteSubspecification = async (id: string) => {
        try {
            if (isCategory) {
                await CategoryService.deleteCategoryBaseSubspecification(id);
            } else {
                await CategoryService.deleteSubcategorySubspecification(id);
            }
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

    const renderActions = (action_list: any, record: any) => (
        <Dropdown menu={{items: defineActionList(action_list, record)}} disabled={record.is_origin === false}>
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

    const getDetailsData = async () => {
        try {
            const nameResponse = await CategoryService.findNameById(id);
            setName(nameResponse);
            let response
            if (isCategory) {
                response = await CategoryService.findCategoryBaseSpecificationByCatId(id);
            } else {
                response = await CategoryService.findSubcategorySpecificationById(id)
            }
            setDetailsData(response);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const handleOnUpdate = async () => {
        await getDetailsData();
    };

    useEffect(() => {
        getDetailsData().then(() => {
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Row className="mb-3">
                <Col span={8}>
                    <h3 className='font-normal ml-1 truncate'><b>Category:</b> {name.cat_name}</h3>
                </Col>
                {!isCategory ?
                    <Col span={8}>
                        <h3 className='font-normal ml-1 truncate'><b>Subcategory:</b> {name.subcat_name}</h3>
                    </Col> : <></>
                }
            </Row>

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
                                               specificationData={detailsData}
                                               type={isCategory ? 'CATEGORY' : 'SUBCATEGORY'}
                                               catId={id}
                        />
                    </Row>
                    <Table columns={defineTableHeader(item.tableHeader)}
                           dataSource={
                               detailsData
                                   .filter((spec: any) => spec.cat_type === item.type)
                                   .map((spec: any, index: number) => {
                                       const dataItem = {...spec, key: index};
                                       if (spec.children && spec.children.length > 0) {
                                           dataItem.children = spec.children.map((subspec: any, index2: number) => ({
                                               ...subspec,
                                               key: `${index}-${index2}`,
                                               parent_name: spec.subcat_spec_name,
                                               cat_type: spec.cat_type,
                                               is_origin: spec.is_origin,
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
                    />
                    <CategoryUpdateModel
                        isOpen={openUpdateModel}
                        onClose={() => setOpenUpdateModel(false)}
                        isParent={isParent}
                        isCategory={false}
                        onUpdate={handleOnUpdate}
                        title={String(specTypeMap[selectedRecord.cat_type]).toString()}
                        data={selectedRecord}
                        type={isCategory ? 'CATEGORY' : 'SUBCATEGORY'}
                    />
                </div>
            ))}
        </div>
    )
}

export default CategoryDetailsPage;