"use client";

import React, {useCallback, useEffect, useState} from "react";
import {Form, Input, Modal, Radio, Select, DatePicker, Upload, Button} from "antd";
import PropTypes from 'prop-types';
import {UploadOutlined} from '@ant-design/icons';

const {TextArea} = Input;

const AddModal = ({isOpen, type, title, fields, onSubmit, onCancel}: any) => {
    const [form] = Form.useForm();
    const dateFormat = 'DD-MM-YYYY';

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                onSubmit(values, type);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });

    };


    return (
        <Modal
            open={isOpen}
            title={<h3 style={{textAlign: 'center'}}> {title} </h3>}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={handleOk}
            cancelText="Cancel"
            okText="Add"
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
                                <Input placeholder={label}/>
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
                                <DatePicker format={dateFormat}/>
                            </Form.Item>)}
                        {type === 'file' &&
                            (<Form.Item
                                key={name}
                                name={name}
                                label= {label}
                                rules={[{required: true, message: `Please upload the ${label.toLowerCase()}`}]}>
                                <Upload name="file" accept=".jpg,.jpeg,.png" beforeUpload={() => false}
                                        listType="picture"
                                        maxCount={1} multiple={false}>
                                    <Button icon={<UploadOutlined/>}>Upload Image (Max: 1)</Button>
                                </Upload>
                            </Form.Item>)}
                    </div>
                ))}
            </Form>
        </Modal>
    )
        ;
};

export default AddModal;
