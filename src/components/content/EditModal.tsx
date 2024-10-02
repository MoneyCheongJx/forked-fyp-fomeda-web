"use client";

import React, {useEffect, useState} from "react";
import {Form, Input, Modal, DatePicker, Upload, Button, Image} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import {UploadFile, UploadChangeParam} from 'antd/es/upload/interface';

const {TextArea} = Input;

const EditModal = ({data, type, isOpen, title, fields, onSubmit, onCancel}: any) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const dateFormat = 'DD-MM-YYYY';

    useEffect(() => {
        if (data) {
            const formData = {
                ...data,
                date: data.date ? dayjs(data.date) : null,
            };

            if (data?.image) {
                setFileList([data?.image])
            }

            form.setFieldsValue(formData);
        }

    }, [data, form]);

    const handleUploadChange = async ({fileList: newFileList}: UploadChangeParam<UploadFile>) => {
        setFileList(newFileList);
        if (newFileList[0]) {
            const image = {
                name: newFileList[0].name,
                percent: newFileList[0].percent,
                size: newFileList[0].percent,
                type: newFileList[0].type,
                uid: newFileList[0].uid,
                base64: await getBase64(newFileList[0].originFileObj),
                thumbUrl: newFileList[0].thumbUrl
            }
            form.setFieldsValue({image: image});
        }
    };

    const handleRemove = async (file: any) => {
        setFileList([]);
        form.resetFields(['image']);
    };

    const handlePreview = async (file: any) => {
        if (!file.base64 && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.base64 || (file.preview as string));
        setPreviewOpen(true);
    };

    const getBase64 = (file: any): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                const payload = {
                    ...data,
                    ...values
                }
                onSubmit(payload, type);
                form.resetFields();
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
            okText="Save"
            width={1000}
        >
            <Form form={form} layout="vertical">
                {fields?.map(({name, label, type}: any, index: number) => (
                    <div key={index}>
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
                                label= {label}
                                rules={[{required: true, message: `Please upload the ${label.toLowerCase()}`}]}>
                                <Upload name="file" accept=".jpg,.jpeg,.png"
                                        listType="picture"
                                        maxCount={1}
                                        multiple={false}
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleUploadChange}
                                        onRemove={handleRemove}
                                >
                                    <Button icon={<UploadOutlined/>}>Upload Image (Max: 1)</Button>
                                </Upload>
                                {previewImage && (
                                    <Image
                                        wrapperStyle={{ display: 'none' }}
                                        preview={{
                                            visible: previewOpen,
                                            onVisibleChange: (visible) => setPreviewOpen(visible),
                                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                        }}
                                        src={previewImage}
                                    />
                                )}
                            </Form.Item>)}
                    </div>
                ))}
            </Form>
        </Modal>
    );
};

export default EditModal;
