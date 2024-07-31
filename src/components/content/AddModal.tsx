"use client";

import {useState} from "react";
import {Form, Input, Modal, DatePicker, Upload, Button, Image} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import {UploadFile, UploadChangeParam} from 'antd/es/upload/interface';

const {TextArea} = Input;

const AddModal = ({isOpen, type, title, fields, onSubmit, onCancel}: any) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const dateFormat = 'DD-MM-YYYY';

    const getBase64 = (file: any) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleOk = () => {
        form
            .validateFields()
            .then(async values => {
                form.resetFields();
                onSubmit(values, type);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleUploadChange = async ({fileList: newFileList}: UploadChangeParam<UploadFile>) => {
        setFileList(newFileList);
        if (newFileList[0]) {
            const image = {
                name: newFileList[0].name,
                percent: newFileList[0].percent,
                size: newFileList[0].percent,
                type: newFileList[0].type,
                uid: newFileList[0].uid,
                thumbUrl: newFileList[0].thumbUrl,
                base64: await getBase64(newFileList[0].originFileObj)
            }
            form.setFieldsValue({image: image});
        }
    };

    const handleRemove = async (file: any) => {
        const newFileList = fileList.filter(f => f.uid !== file.uid);
        setFileList(newFileList);
        console.log('fileList', fileList)
        form.setFieldsValue({image: newFileList});
    };

    const handlePreview = async (file: any) => {
        if (!file.base64 && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.base64 || (file.preview as string));
        setPreviewOpen(true);
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
                                label={label}
                                rules={[{required: true, message: `Please upload the ${label.toLowerCase()}`}]}>
                                <Upload name="file" accept=".jpg,.jpeg,.png" 
                                        beforeUpload={() => false}
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

export default AddModal;
