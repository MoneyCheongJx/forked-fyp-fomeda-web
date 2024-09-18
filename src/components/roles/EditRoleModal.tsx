import React, {useEffect, useState} from "react";
import { Modal, Form, Input, Button, Select } from 'antd';
import RoleService from "@/services/role.service";
import { HEADER_MANAGEMENT_DROPDOWN_LIST_CONSTANTS } from "@/constants/header.constants";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/models/jwt.model";

const { Option } = Select;

const EditRoleModal = ({ visible, onClose, data} : any) => {
    const [form] = Form.useForm();
    const [originalData, setOriginalData] = useState({...data});

    useEffect(() => {
        setOriginalData({...data});
        form.setFieldsValue({...data});
    }, [data, form]);

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

            const data = {...values, last_updated_by: username};

            try {
                await RoleService.updateRole(originalData._id, data)
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
            title={<h3 style={{textAlign:'center'}}>Edit Role</h3>}
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
                    name="role_name"
                    label="Role name"
                    rules={[{ required: true, message: 'Please enter the role name' }]}
                >
                    <Input placeholder="Role name" />
                </Form.Item>
                <Form.Item
                    label="Permission module"
                    name="modules"
                    rules={[{ required: true, message: 'Please select at least one module' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select modules"
                    >
                        {HEADER_MANAGEMENT_DROPDOWN_LIST_CONSTANTS.map(({ key, label }) => (
                            <Option key={key} value={key}>
                                {label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditRoleModal;
