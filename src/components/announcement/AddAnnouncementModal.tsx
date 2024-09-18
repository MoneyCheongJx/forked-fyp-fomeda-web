import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AnnouncementService from "@/services/announcement.service";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/models/jwt.model";

interface AnnouncementModalProps {
    visible: boolean;
    onClose: () => void;
}

const AddAnnouncementModal: React.FC<AnnouncementModalProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();

    const handleOnSubmit = async () => {
        try {
            const values = await form.validateFields();

            let userData;
            const token = Cookies.get('token');
            if (token) {
                try {
                    userData = jwtDecode<CustomJwtPayload>(token);
                } catch (error) {
                    console.error(error);
                }
            }

            const username = userData?.username ?? "UndefinedAdmin";
            const data = {...values, created_by: username, updated_by: username};

            try {
                await AnnouncementService.createAnnouncement(data);
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
            title={<h3 style={{textAlign:'center'}}>Add Announcement</h3>}
            open={visible}
            onCancel={handleOnClose}
            onOk={handleOnSubmit}
            width={1000}
            footer={[
                <Button key="cancel" onClick={handleOnClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOnSubmit}>
                    Submit
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
                    <Upload name="file" accept=".jpg,.jpeg,.png" beforeUpload={() => false} listType="picture" maxCount={3} multiple={true}>
                        <Button icon={<UploadOutlined />}>Upload Image (Max: 3)</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddAnnouncementModal;
