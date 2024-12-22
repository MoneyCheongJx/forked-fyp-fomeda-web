import React, {useEffect, useMemo} from 'react';
import {Form, Button, Select, Row, Col} from 'antd';
import {PlusOutlined, DeleteOutlined, InfoCircleOutlined} from '@ant-design/icons';
import {CategoryConstant, SCORE_CONTRIBUTION_ACTION_OPTIONS} from "@/constants/category.constant";
import {ScoreContributionModel} from "@/models/score_contribution.model";
import {StringUtils} from "@/utils/string.utils";
import CustomInput from "@/components/common/CustomInput";

const RatingTable = ({form, type, isEdit = true, originalData = null}: any) => {

    const ACTIONS_OPTION = useMemo(() =>
            SCORE_CONTRIBUTION_ACTION_OPTIONS
                .filter(option => option.type.includes(type))
                .map(option => ({
                    label: option.label,
                    value: option.key,
                })),
        [type]
    );

    useEffect(() => {
        if (!originalData || originalData && originalData.field_type !== type) {
            const defaultValues = Array.from({length: 3}, (): ScoreContributionModel => ({
                action: ACTIONS_OPTION[0]?.value || '',
                value: '',
                score: 0,
            }));

            form.setFieldsValue({rating_score: defaultValues});
        } else {
            form.setFieldsValue({rating_score: originalData.rating_score});
        }
    }, [type, form, ACTIONS_OPTION, originalData]);

    return (
        <Form.List name="rating_score">
            {(fields, {add, remove}) => (
                <>
                    <Row className="my-2">
                        <Col span={6}><h5>Action</h5></Col>
                        <Col span={12}><h5>Value</h5></Col>
                        <Col span={4}><h5>Score</h5></Col>
                        <Col span={2}></Col>
                    </Row>
                    {fields.map((field, index) => {
                        const action = form.getFieldValue(['rating_score', index, 'action']);
                        const isHaveValueAction = action === CategoryConstant.HAVE_VALUE;

                        return (
                            <Row key={field.key} gutter={16} align="middle" className="mt-4 w-full">
                                <Col span={6}>
                                    <Form.Item className="m-0"
                                               name={[index, 'action']}>
                                        {isEdit ?
                                            <Select options={ACTIONS_OPTION}
                                                    defaultValue={ACTIONS_OPTION[0]?.value || ''}/> :
                                            <span>{StringUtils.formatTitleCase(ACTIONS_OPTION[0]?.value, "_")}</span>
                                        }
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item className="m-0"
                                               name={[index, 'value']}
                                               rules={[
                                                   {
                                                       required: isEdit && !isHaveValueAction,
                                                       message: `Value is required`,
                                                   },
                                               ]}>
                                        {isEdit ?
                                            <CustomInput type={type.toLowerCase()} disabled={isHaveValueAction}/> :
                                            <span>{form.getFieldValue('rating_score')[index].value}</span>
                                        }
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item className="m-0"
                                               name={[index, 'score']}
                                               rules={[
                                                   {required: isEdit, message: `Score is required`,},
                                               ]}>
                                        {isEdit ?
                                            <CustomInput type={"numeric"}/> :
                                            <span>{form.getFieldValue('rating_score')[index].score}</span>
                                        }
                                    </Form.Item>
                                </Col>
                                {isEdit &&
                                    <Col span={2}>
                                        <Button icon={<DeleteOutlined/>} onClick={() => remove(field.name)}
                                                disabled={fields.length <= 1}/>
                                    </Col>
                                }
                                {fields.length <= 1 && isEdit &&
                                    <div className={"text-yellow-500 italic pl-2"}>
                                        <InfoCircleOutlined/> At least 1 row is required
                                    </div>
                                }
                            </Row>
                        )
                    })}
                    {isEdit &&
                        <Button type="primary"
                                onClick={() => add({action: ACTIONS_OPTION[0]?.value || '', value: '', score: 0})}
                                icon={<PlusOutlined/>}
                                className={"mt-4"}>
                            Add Row
                        </Button>
                    }
                </>
            )}
        </Form.List>
    );
};

export default RatingTable;
