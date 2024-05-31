import React, {useEffect, useState} from "react";
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AnnouncementService from "@/services/announcement.service";


const EditAnnouncementModal = ({ visible, onClose, data} : any) => {
    const [form] = Form.useForm();
    const [originalData, setOriginalData] = useState({...data});

    useEffect(() => {
        setOriginalData({...data});
        form.setFieldsValue({...data});
    }, [data, form]);

    const handleOnSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log('data', originalData)

            const data = {...values, updated_by: "Admin"};

            try {
                await AnnouncementService.updateAnnouncement(originalData._id, data);
            } catch (error) {
                console.error(error)
                throw error;
            }
            form.resetFields();
            onClose();
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    const handleOnClose = async () => {
        form.resetFields();
        onClose();
    }

    return (
        <Modal
            title={<h3 style={{textAlign:'center'}}>Edit Announcement</h3>}
            open={visible}
            onCancel={handleOnClose}
            onOk={handleOnSubmit}
            width={1000}
            footer={[
                <Button key="cancel" onClick={handleOnClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOnSubmit}>
                    Save
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Announcement title"
                    rules={[{ required: true, message: 'Please enter the announcement title' }]}
                >
                    <Input placeholder="Announcement title" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Announcement description"
                    rules={[{ required: true, message: 'Please enter the announcement description' }]}
                >
                    <Input.TextArea autoSize={{ minRows: 4, maxRows: 8}} placeholder="Announcement description" />
                </Form.Item>
                <Form.Item
                    name="file_uploaded"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                >
                    <Upload name="file" beforeUpload={() => false} listType="picture" maxCount={3}>
                        <Button icon={<UploadOutlined />}>Upload Image (Max: 3)</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditAnnouncementModal;
