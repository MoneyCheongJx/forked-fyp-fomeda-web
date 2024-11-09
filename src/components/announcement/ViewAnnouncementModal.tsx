import React, {useEffect, useState} from "react";
import {Modal, Typography, List, Card, Image, Empty} from 'antd';
import { DateTimeUtils } from "@/utils/date-time.utils";

const {Text, Paragraph} = Typography;

const ViewAnnouncementModal = ({visible, onClose, data}: any) => {
    const [originalData, setOriginalData] = useState({...data});

    useEffect(() => {
        setOriginalData({...data});
    }, [data]);

    const handleOnClose = async () => {
        onClose();
    }

    return (
        <Modal
            title={<h3 style={{textAlign: 'center'}}>View Announcement</h3>}
            open={visible}
            onCancel={handleOnClose}
            footer={null}
            width={1000}
        >
            <Paragraph strong>{data?.title}</Paragraph>
            <Paragraph>{data?.description}</Paragraph>
            {data?.file_uploaded?.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={data?.file_uploaded}
                    renderItem={(file: any) => (
                        <List.Item>
                            <Card style={{width: '100%', padding: 0}} bodyStyle={{ padding: '2px 16px' }}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Image
                                        src={file?.thumbUrl}
                                        alt={file?.name}
                                        style={{maxHeight: 80, objectFit: 'cover'}}
                                    />
                                    <Text className="pl-2">{file?.name}</Text>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />) : <></>
            }
            <Paragraph>Created on: {DateTimeUtils.formatDate(data?.created_on)}</Paragraph>
        </Modal>
    );
};

export default ViewAnnouncementModal;
