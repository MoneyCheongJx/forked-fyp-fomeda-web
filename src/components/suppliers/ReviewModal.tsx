import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import AuthenticationService from "@/services/authentication.service";
import {Descriptions} from 'antd';
import {SUPPLIERS_REVIEW_MODAL_LABEL_MAPPING} from "@/constants/suppliers.constant";
import ConfirmModal from "@/components/suppliers/ConfirmModal";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/models/jwt.model";
import { DateTimeUtils } from '@/utils/date-time.utils';

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
        const excludedProperties = ["_id", "key", "user_id"];
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
                <Descriptions title="Supplier details" bordered items={generateItems(data)} column={2}/>
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
