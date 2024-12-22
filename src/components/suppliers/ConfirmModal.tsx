"use client";

import React from "react";
import {Form, Modal, Input, Typography} from "antd";

const {TextArea} = Input;
const {Title, Paragraph, Text} = Typography;

interface ConfirmModalProps {
    type: 'approve' | 'reject' | undefined;
    isOpen: boolean;
    onSubmit: (type: 'approve' | 'reject', reason?: string) => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({type, isOpen, onSubmit, onCancel}) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        if (type === 'approve') {
            onSubmit(type);
        } else if (type === 'reject') {
            try {
                const values = await form.validateFields();
                onSubmit(type, values.reason);
            } catch (error) {
                console.error('Validation Failed:', error);
                return Promise.reject();
            }
        }
        form.resetFields();
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={type === 'approve' ? <h3 style={{textAlign: 'center'}}>Approval Confirmation</h3> :
                <h3 style={{textAlign: 'center'}}>Rejection Confirmation</h3>}
            open={isOpen}
            centered
            onOk={handleSubmit}
            onCancel={handleCancel}
            width={800}
            okText="Confirm"
            cancelText="Cancel"
        >
            {type === 'approve' ? (
                <Paragraph>Are you sure you want to approve this <Text strong>registration</Text>?</Paragraph>
            ) : (
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="reason"
                        label="Reason"
                        rules={[{required: true, message: 'Please enter the rejection reason'}]}
                    >
                        <TextArea autoSize={{minRows: 4, maxRows: 8}} placeholder="Rejection reason"/>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default ConfirmModal;