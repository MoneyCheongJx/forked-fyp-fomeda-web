import React, {useEffect, useState} from "react";
import { Modal, Form, Input, Button, Select } from 'antd';
import AnnouncementService from "@/services/announcement.service";

const { Option } = Select;

const EditAdminModal = ({ visible, onClose, data} : any) => {
    const [form] = Form.useForm();
    const [originalData, setOriginalData] = useState({...data});

    useEffect(() => {
        setOriginalData({...data});
        form.setFieldsValue({...data});
    }, [data, form]);

    const handleOnSubmit = async () => {
        try {
            const values = await form.validateFields();

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
            title={<h3 style={{textAlign:'center'}}>Edit Admin</h3>}
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

export default EditAdminModal;
