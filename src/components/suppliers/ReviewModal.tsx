import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import AuthenticationService from "@/services/authentication.service";
import {Descriptions, Table, Typography} from 'antd';
import {
    SUPPLIERS_REVIEW_MODAL_LABEL_MAPPING,
    REJECTION_HISTORY_TABLE_HEADER_CONSTANTS
} from "@/constants/suppliers.constant";
import ConfirmModal from "@/components/suppliers/ConfirmModal";
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import {CustomJwtPayload} from "@/models/jwt.model";
import {DateTimeUtils} from '@/utils/date-time.utils';

const {Text} = Typography;

interface DescriptionsItemType {
    key: string;
    label: string;
    children: string;
    span?: number;
}

const ReviewModal = ({visible, onClose, data, fetchData}: any) => {
    const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'approve' | 'reject' | undefined>('approve'); // Default type

    const handleOnClose = async () => {
        onClose();
    }

    const generateItems = (data: Record<string, string>): DescriptionsItemType[] => {
        if (!data) {
            return [];
        }
        const excludedProperties = ["_id", "key", "user_id", "rejection"];
        const spanProperties = ["email_address", "company_address", "registered_on"];

        return Object.entries(data).filter(([key]) => !excludedProperties.includes(key)).map(([key, value]) => ({
            key: key,
            label: SUPPLIERS_REVIEW_MODAL_LABEL_MAPPING[key],
            children: key === "registered_on" ? DateTimeUtils.formatDate(new Date(value)) : value,
            span: spanProperties.includes(key) ? 3 : 1
        }));
    }

    const handleConfirmationModelOpen = (type: 'approve' | 'reject') => {
        setModalType(type);
        setConfirmationModalVisible(true);
    }

    const handleConfirmationModelClose = () => {
        setModalType(undefined);
        setConfirmationModalVisible(false);
    };

    const handleConfirmationModelSubmit = async (type: "approve" | "reject", reason?: string) => {
        try {

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

            if (type === "approve") {
                await AuthenticationService.approveSuppliers(data?.user_id, {approved_by: userId});
            } else if (type === "reject") {
                await AuthenticationService.rejectSuppliers(data?.user_id, {rejected_by: userId, reason})
            }
            handleConfirmationModelClose();
            handleOnClose();
            fetchData();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const TABLE_HEADER_CONSTANTS = REJECTION_HISTORY_TABLE_HEADER_CONSTANTS.map((column) => {
        switch (column.key) {
            case 'rejected_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key]),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
                    defaultSortOrder: 'ascend' as 'ascend',
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    });

    return (
        <>
            <Modal
                title={<h3 style={{textAlign: 'center'}}>Review supplier</h3>}
                open={visible}
                onCancel={handleOnClose}
                width={1000}
                footer={[
                    <Button key="reject" onClick={() => handleConfirmationModelOpen("reject")}>
                        Reject
                    </Button>,
                    <Button key="approve" type="primary" onClick={() => handleConfirmationModelOpen("approve")}>
                        Approve
                    </Button>,
                ]}
            >
                <Descriptions title={<Text strong>Supplier details</Text>} bordered items={generateItems(data)}
                              column={2}/>
                <div style={{margin: '16px 0'}}>
                    <Text strong>Supplier rejection history</Text>
                </div>
                <Table
                    dataSource={data?.rejection}
                    columns={TABLE_HEADER_CONSTANTS}
                    pagination={false}
                    locale={{emptyText: 'No rejection history'}}
                />
            </Modal>
            <ConfirmModal
                isOpen={isConfirmationModalVisible}
                type={modalType}
                onSubmit={handleConfirmationModelSubmit}
                onCancel={handleConfirmationModelClose}
            />
        </>
    );
};

export default ReviewModal;
