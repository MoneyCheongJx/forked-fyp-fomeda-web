import CategoryService from "@/services/category.service";
import React, {useCallback, useEffect, useState} from "react";
import {SPECIFICATIONS_TABLE_CONSTANTS, SUBCATEGORY_RATING_SCORE_HEADER_CONSTANTS} from "@/constants/category.constant";
import {Button, Col, Dropdown, Form, Modal, Row, Table, Tag, Typography} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {DateTimeUtils} from "@/utils/date-time.utils";
import ConfirmationContent from "@/components/product-category/ConfirmationContent";
import {useRouter} from "next/navigation";
import CustomInput from "@/components/common/CustomInput";
import NotificationService from "@/services/notification.service";
import {StringUtils} from "@/utils/string.utils";

const renderStatus = (is_active: boolean) => (
    is_active ? <Tag color={'green'} bordered={false} className="px-3 py-0.5 rounded-xl">Active</Tag> :
        <Tag bordered={false} className="px-3 py-0.5 rounded-xl">Inactive</Tag>
);

const CategoryDetailsPage = ({id}: { id: string }) => {
    const router = useRouter();

    const isCategory = !id.includes('SCAT');
    const [ratingForm] = Form.useForm();
    const [detailsData, setDetailsData] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState<any>([]);
    const [ratingScore, setRatingScore] = useState<any[]>([]);
    const [isEditRating, setIsEditRating] = useState(false);

    const defineActionList = (action: any, record: any) => {
        return action.map((item: any) => {
            if ((record.is_active && item.key === 'activate') || (!record.is_active && item.key === 'deactivate')) {
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
            router.push(`view-specification?id=${record._id}`);
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
            spec: isCategory ? CategoryService.deactivateCategoryBaseSpecification : CategoryService.deactivateSubcategorySpecification,
            subspec: isCategory ? CategoryService.deactivateCategoryBaseSubspecification : CategoryService.deactivateSubcategorySubspecification,
        },
        activate: {
            spec: isCategory ? CategoryService.deactivateCategoryBaseSpecification : CategoryService.deactivateSubcategorySpecification,
            subspec: isCategory ? CategoryService.deactivateCategoryBaseSubspecification : CategoryService.deactivateSubcategorySubspecification,
        },
        delete: {
            spec: isCategory ? CategoryService.deleteCategoryBaseSpecification : CategoryService.deleteSubcategorySpecification,
            subspec: isCategory ? CategoryService.deleteCategoryBaseSubspecification : CategoryService.deleteSubcategorySubspecification,
        },
    };

    const handleRatingConfirmationModelOpen = async () => {
        await ratingForm.validateFields();
        Modal.confirm({
            title: <h3>Confirmation</h3>,
            content: <p>Are you sure you want to <b>update</b> the rating score?</p>,
            className: "confirmation-modal",
            centered: true,
            width: "35%",
            okText: "Confirm",
            onOk: () => handleSaveRatingScoreOnClick(),
        });
    }

    const handleActionsOnClick = async (key: string, record: any) => {
        const {_id, subcat_subspec_name, subcat_spec_name} = record;
        const isSubspecification = Boolean(subcat_subspec_name);
        const actionType = isSubspecification ? 'subspec' : 'spec';

        try {
            const actionFunction = actionMappings[key]?.[actionType];
            if (actionFunction) {
                await actionFunction(_id, key === 'activate');
                NotificationService.success(
                    `${StringUtils.formatTitleCase(key)} Specification`,
                    `${subcat_subspec_name || subcat_spec_name} ${key} successfully`
                );
            } else {
                NotificationService.error(
                    `${StringUtils.formatTitleCase(key)} Specification`,
                    `${subcat_subspec_name || subcat_spec_name} failed to ${key}`
                );
            }
            await handleOnUpdate();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveRatingScoreOnClick = async () => {
        try {
            const ratingValues = ratingForm.getFieldsValue();
            const updateScore = ratingScore.map((score: any) => ({
                ...score,
                max_score: parseInt(ratingValues[`${score.rating}_max_score`]),
                min_score: parseInt(ratingValues[`${score.rating}_min_score`]),
            }));

            setRatingScore(updateScore);
            await CategoryService.updateSubcategory(id, {rating_score: updateScore});
            setIsEditRating(false);
            NotificationService.success("Edit Rating Score", "Rating score updated successfully.")
        } catch (error) {
            console.error(error);
            NotificationService.error("Edit Rating Score", "Rating score failed to update.")
            throw error;
        }
    }

    const validateScore = async (key: any, record: any) => {
        const values = ratingForm.getFieldsValue();
        const currentMinScore = parseInt(values[`${record.rating}_min_score`], 10);
        const currentMaxScore = parseInt(values[`${record.rating}_max_score`], 10);

        if (key === 'max_score' && currentMaxScore < currentMinScore) {
            return Promise.reject(new Error('Max score must be greater than or equal to Min score'));
        }

        const previousRating = ratingScore.find(r => r.rating === record.rating - 1);
        if (previousRating) {
            const prevMaxScore = parseInt(values[`${previousRating.rating}_max_score`], 10);

            if (key === 'min_score' && currentMinScore !== prevMaxScore + 1) {
                return Promise.reject(new Error(`Min score must be exactly ${prevMaxScore + 1}`));
            }
        }

        return Promise.resolve();
    }

    const renderActions = (action_list: any, record: any) => (
        <Dropdown menu={{items: defineActionList(action_list, record)}} disabled={record.is_origin === false}>
            <Button>Actions</Button>
        </Dropdown>
    );

    const renderScore = (record: any, key: string) => (
        <>
            {isEditRating ?
                <Form form={ratingForm}>
                    <Form.Item name={`${record.rating}_${key}`}
                               initialValue={record[key]}
                               className={"mb-0"}
                               rules={[
                                   {required: true, message: `Score should not be empty`},
                                   {validator: async (_, value) => validateScore(key, record),},
                               ]}>
                        <CustomInput type={"numeric"}/>
                    </Form.Item>
                </Form> :
                <div>{record[key]}</div>
            }
        </>
    )

    const ratingTableFooter = () => (
        <Row className={"justify-end space-x-3"}>
            <Button onClick={() => setIsEditRating(false)}>Cancel</Button>
            <Button onClick={handleRatingConfirmationModelOpen} type={"primary"}>Save</Button>
        </Row>
    )

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
            case 'min_score':
            case 'max_score':
                return {
                    ...column,
                    render: (text: any, record: any) => renderScore(record, column.key)
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    });

    const getDetailsData = useCallback(async () => {
        try {
            const nameResponse = await CategoryService.findNameById(id);
            setName(nameResponse);
            let ratingScoreResponse;
            let response
            if (isCategory) {
                console.log("run here")
                response = await CategoryService.findCategoryBaseSpecificationByCatId(id);
            } else {
                response = await CategoryService.findSubcategorySpecificationByCatId(id)
                ratingScoreResponse = await CategoryService.findOneSubcategoryById(id);
            }
            setDetailsData(response);
            setRatingScore(ratingScoreResponse?.rating_score ?? {})
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [id, isCategory]);

    const handleOnUpdate = async () => {
        await getDetailsData();
    };

    useEffect(() => {
        getDetailsData().then();
    }, [getDetailsData]);

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

            {!isCategory &&
                <>
                    <Row className="mb-2 justify-between">
                        <h3>RatingScore</h3>
                        <Button type="primary" icon={<EditOutlined/>}
                                onClick={() => setIsEditRating(true)}
                                disabled={isEditRating}>
                            Edit Rating Score
                        </Button>
                    </Row>
                    <Table columns={defineTableHeader(SUBCATEGORY_RATING_SCORE_HEADER_CONSTANTS)}
                           dataSource={ratingScore.map((rating => ({...rating, key: rating.rating})))}
                           showSorterTooltip={false}
                           pagination={false}
                           className={"mb-12"}
                           footer={isEditRating ? ratingTableFooter : undefined}
                           loading={loading}/>
                </>
            }

            {SPECIFICATIONS_TABLE_CONSTANTS.map((item: any) => (
                <div key={item.key} className="mb-8">
                    <Row className="mb-2 justify-between">
                        <h3>{item.title}</h3>
                        <Button type="primary" icon={<PlusOutlined/>}
                                onClick={() => {
                                    router.push(`add-specification?type=${item.type}&id=${id}`);
                                }}>
                            {item.button}
                        </Button>
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
                           loading={loading}
                    />
                </div>
            ))}
        </div>
    )
}

export default CategoryDetailsPage;