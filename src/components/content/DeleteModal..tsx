"use client";

import React from "react";
import {Modal, Image, Typography} from "antd";
import {DateTimeUtils} from "@/utils/date-time.utils";

const {Title, Paragraph, Text, Link} = Typography;

const deleteModal = ({data, type, isOpen, title, onSubmit, onCancel}: any) => {
    return (
        React.useEffect(() => {
            console.log('data', data);
            if (isOpen) {
                Modal.confirm({
                    title: <h3>Confirmation</h3>,
                    content: (
                        <div>
                            <Paragraph>Are you sure you want to delete the following record?</Paragraph>
                            <Paragraph>
                                {type === 'delete_carousel' &&
                                    (<Image src={data?.image?.base64} preview={false}/>)}
                                {type === 'delete_content' &&
                                    (<div>
                                        <Text strong>Content title: </Text>
                                        <Text>{data?.title}</Text>
                                        <br/>
                                        <Text strong>Content description: </Text>
                                        <Text>{data?.description}</Text>
                                    </div>)}
                                {type === 'delete_history_timeline' &&
                                    (<div>
                                        <Text strong>Timeline title: </Text>
                                        <Text>{data?.title}</Text>
                                        <br/>
                                        <Text strong>Timeline description: </Text>
                                        <Text>{data?.description}</Text>
                                        <br/>
                                        <Text strong>Timeline date: </Text>
                                        <Text>{DateTimeUtils.formatDate(data?.date)}</Text>
                                    </div>)}
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
                        () => onSubmit(data, type),
                    onCancel: onCancel,
                })
                ;
            }
        }, [isOpen, onCancel, onSubmit, data, type, title]));
    return null;
};

export default deleteModal;