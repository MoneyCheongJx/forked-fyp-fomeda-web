import React, {useEffect, useState} from "react";
import {Modal, Form, Input, Button, Select} from 'antd';
import RoleService from "@/services/role.service";
import AuthenticationService from "@/services/authentication.service";
import { ADMINS_STATUS_OPTIONS } from "@/constants/admins.constant";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/models/jwt.model";

const {Option} = Select;

const EditAdminModal = ({visible, onClose, data}: any) => {
    const [form] = Form.useForm();
    const [originalData, setOriginalData] = useState({...data});
    const [roles, setRoles] = useState<any[]>([]); // Adjust the type as needed

    useEffect(() => {
        setOriginalData({...data});
        form.setFieldsValue({...data});
        if (visible) {
            fetchRoles();
            if (data) {
                form.setFieldsValue({
                    ...data,
                    role_id: data?.role_id,
                });
            }
        }
    }, [visible, data, form]);

    const fetchRoles = async () => {
        try {
            const response = await RoleService.getActiveRoles();
            setRoles(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const checkEmailDuplicate = async (email: string) => {
        try {
            const response = await AuthenticationService.checkEmailDuplicate(email);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

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

            const userId = userData?.user_id ?? "UndefinedAdmin";
            const data = {...values, last_updated_by: userId};

            try {
                await AuthenticationService.updateAdmin(originalData?.user_id, data);
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
            title={<h3 style={{textAlign: 'center'}}>Edit Admin</h3>}
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
                    name="fullname"
                    label="Admin fullname"
                    rules={[{required: true, message: 'Please enter the admin fullname'}]}
                    hasFeedback
                >
                    <Input placeholder="Admin fullname"/>
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Admin username"
                >
                    <Input placeholder="Admin username" disabled/>
                </Form.Item>
                <Form.Item
                    name="email_address"
                    label="Admin email"
                    rules={[
                        {required: true, message: 'Please enter the admin email'},
                        {type: "email", message: 'Please enter a valid email address'},
                        {
                            validator: async (_, value) => {
                                if (!value || value === originalData?.email_address) {
                                    return Promise.resolve();
                                }
                                const isDuplicate = await checkEmailDuplicate(value);
                                if (isDuplicate) {
                                    return Promise.reject(new Error('The email is already in use'));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Admin email"/>
                </Form.Item>
                <Form.Item
                    name="role_id"
                    label="Role"
                    rules={[{required: true, message: 'Please select a role'}]}
                >
                    <Select placeholder="Please select a role">
                        {roles.map((role: any) => (
                            <Option key={role._id} value={role._id}>
                                {role?.role_name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="is_active"
                    label="Status"
                    rules={[{required: true, message: 'Please select a status'}]}
                >
                    <Select placeholder="Please select a status" value={originalData?.is_active ? 'active' : 'inactive'}>
                        {ADMINS_STATUS_OPTIONS.map(option => (
                            <Option key={String(option.value)} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditAdminModal;
