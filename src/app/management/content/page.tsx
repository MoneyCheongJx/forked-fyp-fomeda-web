"use client"

import React, {useEffect, useState} from "react";
import PageLayout from '@/app/page';
import {Button, Dropdown, Row, Table, Image} from "antd";
import {
    ContentActionsConstant,
    CAROUSEL_TABLE_HEADER_CONSTANTS,
    CONTENT_TABLE_HEADER_CONSTANTS,
    HISTORY_TIMELINE_TABLE_HEADER_CONSTANTS,
    MODAL_CONFIGS
} from "@/constants/contents.constant";
import ContentService from "@/services/content.service";
import AddModal from "@/components/content/AddModal";
import EditModal from "@/components/content/EditModal";
import DeleteModal from "@/components/content/DeleteModal.";
import {PlusOutlined} from "@ant-design/icons";
import {DateTimeUtils} from "@/utils/date-time.utils";
import { useAuth } from "@/app/(auth)/context/auth-context";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "@/models/jwt.model";
import Cookies from 'js-cookie';

const ContentManagementPage = () => {
    const [carouselData, setCarouselData] = useState<any[]>([]);
    const [contentData, setContentData] = useState<any[]>([]);
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<any>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<any>({});
    const [userData, setUserData] = useState<CustomJwtPayload>();
    const { redirecting } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (redirecting) return;
        else {
            fetchCarouselData();
            fetchContentData();
            fetchHistoryData();
        }
    }, [router]);

    const fetchCarouselData = async () => {
        try {
            const response = await ContentService.getAllCarousels();
            setCarouselData(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchContentData = async () => {
        try {
            const response = await ContentService.getAllContent();
            setContentData(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchHistoryData = async () => {
        try {
            const response = await ContentService.getAllHistoryTimeline();
            setHistoryData(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const servicesMapping: any = {
        [ContentActionsConstant.ADD_CAROUSEL]: ContentService.createCarousel,
        [ContentActionsConstant.EDIT_CAROUSEL]: ContentService.updateCarousel,
        [ContentActionsConstant.DELETE_CAROUSEL]: ContentService.deleteCarousel,
        [ContentActionsConstant.ADD_CONTENT]: ContentService.createContent,
        [ContentActionsConstant.EDIT_CONTENT]: ContentService.updateContent,
        [ContentActionsConstant.DELETE_CONTENT]: ContentService.deleteContent,
        [ContentActionsConstant.ADD_HISTORY_TIMELINE]: ContentService.createHistoryTimeline,
        [ContentActionsConstant.EDIT_HISTORY_TIMELINE]: ContentService.updateHistoryTimeline,
        [ContentActionsConstant.DELETE_HISTORY_TIMELINE]: ContentService.deleteHistoryTimeline
    }

    const openModal = (type: string) => {
        const config = {
            ...MODAL_CONFIGS[type as keyof typeof MODAL_CONFIGS],
            onSubmit: handleSubmit,
            onCancel: handleClose,
        }
        setModalConfig(config);

        if (type.startsWith('add_'))
            setIsAddModalOpen(true);
        else if (type.startsWith('edit_'))
            setIsEditModalOpen(true);
        else if (type.startsWith('delete_'))
            setIsDeleteModalOpen(true);
    };

    const handleSubmit = async (data: any, type: any) => {

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

        const payload = {
            ...data,
            ...(type.startsWith('add_') ? { created_by: username } : {}),
            last_updated_by: username
        }

        const action = servicesMapping[type];

        try {
            if (type.startsWith('add_'))
                await action(payload);
            else if (type.startsWith('edit_'))
                await action(data._id, payload);
            else if (type.startsWith('delete_'))
                await action(data._id)
            fetchCarouselData()
            fetchContentData();
            fetchHistoryData();
        } catch (error) {
            console.error(error);
            throw error;
        }
        handleClose();
    };

    const handleClose = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
    };

    const defineActionList = (action: any, record: any) => {
        return action.map((item: any) => {
            return {
                key: item.key,
                label: (
                    <div onClick={() => {
                        setSelectedRecord(record)
                        openModal(item.key)
                    }}>
                        {item.label}
                    </div>
                ),
            };
        }).filter((item: any) => item !== null);
    };

    const renderActionsDropdown = (action_list: any, record: any) => (
        <Dropdown menu={{items: defineActionList(action_list, record)}}>
            <Button>Actions</Button>
        </Dropdown>
    );

    const mappingTableActions = (constant: any) => {
        return constant.map((column: any) => {
            switch (column.key) {
                case 'actions':
                    return {
                        ...column,
                        render: (text: any, record: any) => renderActionsDropdown(column.actionList, record)
                    };
                case 'created_on':
                case 'last_updated_on':
                case 'date':
                    return {
                        ...column,
                        render: (text: any, record: any) => DateTimeUtils.formatDate(record[column.key]),
                        sorter: (a: any, b: any) => new Date(a[column.key]).getTime() - new Date(b[column.key]).getTime(),
                    };
                case 'image':
                    return {
                        ...column,
                        render: (image: any) => (
                            <Image src={image?.base64} width="25%"/>
                        ),
                    };
                case 'no':
                    return {
                        ...column,
                        render: (_: any, __: any, index: number) => index + 1,
                    }
                default:
                    return {
                        ...column,
                        sorter: (a: any, b: any) => (a[column.key] || "").toString().localeCompare((b[column.key] || "").toString()),
                    };
            }
            return column;
        });
    }

    return (
        <PageLayout title={"Content Management"}>
            <div className="mb-8">
                <Row className="mb-2 justify-between">
                    <h3>Carousel</h3>
                    <Button type="primary" icon={<PlusOutlined/>}
                            onClick={() => openModal('add_carousel')}>
                        Add carousel
                    </Button>
                </Row>
                <Table className="mb-8"
                       columns={mappingTableActions(CAROUSEL_TABLE_HEADER_CONSTANTS)}
                       dataSource={carouselData.map((data: { _id: any }) => {
                           return {...data, key: data._id}
                       })}
                       pagination={false}/>
            </div>
            <div className="mb-8">
                <Row className="mb-2 justify-between">
                    <h3>Content</h3>
                    <Button type="primary" icon={<PlusOutlined/>}
                            onClick={() => openModal('add_content')}>
                        Add content
                    </Button>
                </Row>
                <Table columns={mappingTableActions(CONTENT_TABLE_HEADER_CONSTANTS)}
                       dataSource={contentData.map((data: { _id: any }) => {
                           return {...data, key: data._id}
                       })}
                       pagination={false}
                       showSorterTooltip={false}
                />
            </div>
            <div className="mb-8">
                <Row className="mb-2 justify-between">
                    <h3>History timeline</h3>
                    <Button type="primary" icon={<PlusOutlined/>}
                            onClick={() => openModal('add_history_timeline')}>
                        Add history timeline
                    </Button>
                </Row>
                <Table columns={mappingTableActions(HISTORY_TIMELINE_TABLE_HEADER_CONSTANTS)}
                       dataSource={historyData.map((data: { _id: any }) => {
                           return {...data, key: data._id}
                       })}
                       pagination={false}/>
            </div>
            <AddModal
                isOpen={isAddModalOpen}
                type={modalConfig.type}
                title={modalConfig.title}
                fields={modalConfig.fields}
                onSubmit={modalConfig.onSubmit}
                onCancel={modalConfig.onCancel}
            />
            <EditModal
                data={selectedRecord}
                isOpen={isEditModalOpen}
                type={modalConfig.type}
                title={modalConfig.title}
                fields={modalConfig.fields}
                onSubmit={modalConfig.onSubmit}
                onCancel={modalConfig.onCancel}
            />
            <DeleteModal
                data={selectedRecord}
                isOpen={isDeleteModalOpen}
                type={modalConfig.type}
                title={modalConfig.title}
                onSubmit={modalConfig.onSubmit}
                onCancel={modalConfig.onCancel}
            />
        </PageLayout>
    );
};

export default ContentManagementPage;
