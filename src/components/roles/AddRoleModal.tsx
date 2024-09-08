import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import AnnouncementService from "@/services/announcement.service";

const { Option } = Select;

interface AdminModalProps {
    visible: boolean;
    onClose: () => void;
}

const AddAdminModal: React.FC<AdminModalProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();

    const handleOnSubmit = async () => {
        try {
            const values = await form.validateFields();
            const data = {...values, created_by: "Admin", updated_by: "Admin"};
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
            title={<h3 style={{textAlign:'center'}}>Create Admin</h3>}
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
                    name="username"
                    label="Admin username"
                    rules={[{ required: true, message: 'Please enter the admin username' }]}
                >
                    <Input placeholder="Admin username" />
                </Form.Item>
                <Form.Item
                    name="email_address"
                    label="Admin email"
                    rules={[{ required: true, message: 'Please enter the admin email' }]}
                >
                    <Input placeholder="Admin email" />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please select a role' }]}
                   >
                    <Select placeholder="Please select a role">
                        <Option value="admin">Admin</Option>
                        <Option value="editor">Editor</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select a status' }]}
                >
                    <Select placeholder="Please select a status">
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddAdminModal;
