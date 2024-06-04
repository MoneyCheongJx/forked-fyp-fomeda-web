"use client";

import React, {useCallback, useEffect, useState} from "react";
import {Form, Input, Modal, Radio, Select, DatePicker, Upload, Button} from "antd";
import PropTypes from 'prop-types';
import {UploadOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import {UploadFile, UploadChangeParam} from 'antd/es/upload/interface';

const {TextArea} = Input;


const EditModal = ({data, type, isOpen, title, fields, onSubmit, onCancel}: any) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const dateFormat = 'DD-MM-YYYY';

    useEffect(() => {
        if (data) {
            // ensure date are dayjs objects before setFieldsValue
            const formData = {
                ...data,
                date: data.date ? dayjs(data.date) : null,
            };


            if (data?.image?.fileList) {
                setFileList(data?.image?.fileList)
            }

            form.setFieldsValue(formData);
        }

    }, [data, form]);

    const handleUploadChange = ({fileList: newFileList}: UploadChangeParam<UploadFile>) => {
        setFileList(newFileList);
    };

    const handleRemove = (file: any) => {
        const newFileList = fileList.filter(f => f.uid !== file.uid);
        setFileList(newFileList);
    };


    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();

                const payload = {
                    ...data,
                    ...values
                }

                onSubmit(payload, type);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    // @ts-ignore
    return (
        <Modal
            open={isOpen}
            title={<h3 style={{textAlign: 'center'}}> {title} </h3>}
            onCancel={onCancel}
            onOk={handleOk}
            cancelText="Cancel"
            okText="Save"
            width={1000}
        >
            <Form form={form} layout="vertical">
                {fields?.map(({name, label, type}: any) => (
                    <div>
                        {type === 'text' &&
                            (<Form.Item
                                key={name}
                                name={name}
                                label={label}
                                rules={[{required: true, message: `Please enter the ${label.toLowerCase()}`}]}
                            >
                                <Input placeholder={name}/>
                            </Form.Item>)}
                        {type === 'textarea' &&
                            (<Form.Item
                                key={name}
                                name={name}
                                label={label}
                                rules={[{required: true, message: `Please enter the ${label.toLowerCase()}`}]}
                            >
                                <TextArea autoSize={{minRows: 4, maxRows: 8}} placeholder={label}/>
                            </Form.Item>)}
                        {type === 'date' &&
                            (<Form.Item
                                key={name}
                                name={name}
                                label={label}
                                rules={[{required: true, message: `Please enter the ${label.toLowerCase()}`}]}
                            >
                                <DatePicker value="2022" format={dateFormat}/>
                            </Form.Item>)}
                        {type === 'file' &&
                            (<Form.Item
                                key={name}
                                name={name}
                                rules={[{required: true, message: `Please upload the ${label.toLowerCase()}`}]}>
                                <Upload name="file" accept=".jpg,.jpeg,.png"
                                        listType="picture"
                                        maxCount={1}
                                        multiple={false}
                                        fileList={fileList}
                                        onChange={handleUploadChange}
                                        onRemove={handleRemove}
                                >
                                    <Button icon={<UploadOutlined/>}>Upload Image (Max: 1)</Button>
                                </Upload>
                            </Form.Item>)}
                    </div>
                ))}
            </Form>
        </Modal>
    );
};

export default EditModal;
