import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, Button, Select} from 'antd';
import AuthenticationService from "@/services/authentication.service";
import RoleService from "@/services/role.service";
import {ADMINS_STATUS_OPTIONS} from "@/constants/admins.constant";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/models/jwt.model";

const {Option} = Select;

interface AdminModalProps {
    visible: boolean;
    onClose: () => void;
}

const AddAdminModal: React.FC<AdminModalProps> = ({visible, onClose}) => {
    const [form] = Form.useForm();
    const [roles, setRoles] = useState<any[]>([]); // Adjust the type as needed

    useEffect(() => {
        if (visible) {
            fetchRoles();
        }
    }, [visible]);

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

    const checkUsernameDuplicate = async (username: string) => {
        try {
            const response = await AuthenticationService.checkUsernameDuplicate(username);
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
            const data = {...values, type: "admin", created_by: userId, last_updated_by: userId};
            
            try {
                await AuthenticationService.register(data);
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
            title={<h3 style={{textAlign: 'center'}}>Create Admin</h3>}
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
                    rules={[
                        {required: true, message: 'Please enter the admin username'},
                        {min: 6, max: 20, message: 'The username must be between 6 and 20 characters'},
                        {whitespace: true, message: 'The username cannot be whitespaces only'},
                        {
                            pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
                            message: 'The username must start with an alphabet and contain only alphanumeric characters and underscores'
                        },
                        {
                            validator: async (_, value) => {
                                if (!value) {
                                    return Promise.resolve();
                                }
                                const isDuplicate = await checkUsernameDuplicate(value);
                                if (isDuplicate) {
                                    return Promise.reject(new Error('The username is already in use'));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Admin username"/>
                </Form.Item>
                <Form.Item
                    name="email_address"
                    label="Admin email"
                    rules={[
                        {required: true, message: 'Please enter the admin email'},
                        {type: "email", message: 'Please enter a valid email address'},
                        {
                            validator: async (_, value) => {
                                if (!value) {
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
                        {roles.map((role: any) => {
                            return (
                                <Option key={role._id} value={role._id}>
                                    {role?.role_name}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="is_active"
                    label="Status"
                    rules={[{required: true, message: 'Please select a status'}]}
                >
                    <Select placeholder="Please select a status">
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

export default AddAdminModal;
