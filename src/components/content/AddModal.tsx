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
            .then(async values => {
                form.resetFields();

                // format image payload
                if (type == "add_carousel") {
                    const file = values?.image?.fileList[0];

                    if (file) {
                        values.image = {
                            name: file.name,
                            percent: file.percent,
                            size: file.percent,
                            type: file.type,
                            uid: file.uid,
                            base64: await getBase64(file.originFileObj)
                        }
                    }
                }

                onSubmit(values, type);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });

    };


    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

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
