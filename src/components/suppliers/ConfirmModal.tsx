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

const confirmModal: React.FC<ConfirmModalProps> = ({type, isOpen, onSubmit, onCancel}) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        if (type === 'approve'){
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
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    React.useEffect(() => {
        if (isOpen) {
            Modal.confirm({
                title: (
                    <div style={{textAlign: 'center'}}>
                        <h3>{type === 'approve' ? 'Approval Confirmation' : 'Rejection Confirmation'}</h3>
                    </div>
                ),
                content: (
                    <div>
                        {type === 'approve' ? (
                            <Paragraph>Are you confirm to approve this <Text strong>registration</Text> ? </Paragraph>
                        ) : (
                            <Form form={form} layout="vertical">
                                <Form.Item
                                    key={"reason"}
                                    name={"reason"}
                                    label={"Reason"}
                                    rules={[{required: true, message: `Please enter the rejection reason`}]}
                                >
                                    <TextArea autoSize={{minRows: 4, maxRows: 8}} placeholder={"Rejection reason"}/>
                                </Form.Item>
                            </Form>
                        )}
                    </div>
                ),
                icon: null,
                centered: true,
                closable: true,
                width: "50%",
                okText: "Confirm",
                cancelText: "Cancel",
                onOk: handleSubmit,
                onCancel: handleCancel,
            });
        }
    }, [isOpen, onCancel, onSubmit, type, form])
    return null;
};

export default confirmModal;