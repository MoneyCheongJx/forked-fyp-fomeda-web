import React from 'react';
import {Modal} from 'antd';
import {Descriptions} from 'antd';
import {SUPPLIERS_VIEW_MODAL_LABEL_MAPPING} from "@/constants/suppliers.constant";
import moment from 'moment';

interface DescriptionsItemType {
    key: string;
    label: string;
    children: string;
    span?: number;
}

const ViewModal = ({visible, onClose, data}: any) => {
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
            label: SUPPLIERS_VIEW_MODAL_LABEL_MAPPING[key],
            children: (key === "registered_on" || key === "approved_on") ? moment(value).format('DD-MM-YYYY') : value,
            span: spanProperties.includes(key) ? 3 : 1
        }));
    }

    return (
        <Modal
            title={<h3 style={{textAlign: 'center'}}>View supplier</h3>}
            open={visible}
            onCancel={handleOnClose}
            width={1000}
            footer={null}
        >
            <Descriptions title="Supplier details" bordered items={generateItems(data)} column={2} />
        </Modal>
    );
};

export default ViewModal;
