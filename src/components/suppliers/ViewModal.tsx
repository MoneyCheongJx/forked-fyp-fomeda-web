import React from 'react';
import {Modal, Table, Descriptions, Typography} from 'antd';
import {SUPPLIERS_VIEW_MODAL_LABEL_MAPPING, REJECTION_HISTORY_TABLE_HEADER_CONSTANTS} from "@/constants/suppliers.constant";
import {DateTimeUtils} from '@/utils/date-time.utils';

const { Text } = Typography;

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
        const excludedProperties = ["_id", "key", "user_id", "rejection"];
        const spanProperties = ["email_address", "company_address", "registered_on"];

        return Object.entries(data).filter(([key]) => !excludedProperties.includes(key)).map(([key, value]) => ({
            key: key,
            label: SUPPLIERS_VIEW_MODAL_LABEL_MAPPING[key],
            children: (key === "registered_on" || key === "approved_on" || key === "last_rejected_on") ? DateTimeUtils.formatDate(new Date(value)) : value,
            span: spanProperties.includes(key) ? 3 : 1
        }));
    }

    const TABLE_HEADER_CONSTANTS = REJECTION_HISTORY_TABLE_HEADER_CONSTANTS.map((column) => {
        switch (column.key) {
            case 'rejected_on':
                return {
                    ...column,
                    render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key]),
                    sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
                    defaultSortOrder: 'descend' as 'descend',
                };
            default:
                return {
                    ...column,
                    sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                };
        }
    });

    return (
        <Modal
            title={<h3 style={{textAlign: 'center'}}>View supplier</h3>}
            open={visible}
            onCancel={handleOnClose}
            width={1000}
            footer={null}
        >
            <Descriptions title={<Text strong>Supplier details</Text>} bordered items={generateItems(data)} column={2} />
            <div style={{ margin: '16px 0' }}>
                <Text strong>Supplier rejection history</Text>
            </div>
            <Table
                dataSource={data?.rejection}
                columns={TABLE_HEADER_CONSTANTS}
                pagination={false}
                locale={{ emptyText: 'No rejection history' }}
            />
        </Modal>
    );
};

export default ViewModal;
