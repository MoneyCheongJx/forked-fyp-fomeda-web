"use client";

import React from "react";
import {Modal, Typography} from "antd";
import {DateTimeUtils} from "@/utils/date-time.utils";

const {Title, Paragraph, Text, Link} = Typography;

interface ConfirmModalProps {
    data: any;
    type: string | undefined;
    isOpen: boolean;
    onSubmit: (id: string, is_active: boolean) => void;
    onCancel: () => void;
}

const checkType = (type: any): boolean => {
    if (type === "activate") {
        return true;
    } else if (type === "deactivate") {
        return false;
    } else {
        throw new Error("Invalid type provided");
    }
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({data, type, isOpen, onSubmit, onCancel}) => {
    React.useEffect(() => {
        if (isOpen) {
            Modal.confirm({
                title: <h3>Confirmation</h3>,
                content: (
                    <div>
                        <Paragraph>Are you sure you want to {type} the following role?</Paragraph>
                        <Paragraph>
                            <div>
                                <Text strong>Role name: </Text>
                                <Text>{data?.role_name}</Text>
                                <br/>
                                <Text strong>Created on: </Text>
                                <Text>{DateTimeUtils.formatDate(data?.created_on)}</Text>
                                <br/>
                                <Text strong>Last updated on: </Text>
                                <Text>{DateTimeUtils.formatDate(data?.last_updated_on)}</Text>
                            </div>
                        </Paragraph>
                    </div>
                ),
                className: "confirmation-modal",
                centered:
                    true,
                width:
                    "35%",
                okText:
                    "Confirm",
                cancelText:
                    "Cancel",
                onOk:
                    () => onSubmit(data?._id, checkType(type)),
                onCancel: onCancel,
            })
            ;
        }
    }, [isOpen, onCancel, onSubmit, data, type]);
    return null;
};

export default ConfirmModal;