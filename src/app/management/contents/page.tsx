"use client"

import React, {useEffect, useState} from "react";
import PageLayout from '@/app/page';
import {Breadcrumb} from "antd";
import {Button, Col, Dropdown, Input, Row, Table, Tag, DatePicker, Spin, Form, Typography} from "antd";
import Link from "next/link";
import {
    CAROUSEL_TABLE_HEADER_CONSTANTS,
    CONTENT_TABLE_HEADER_CONSTANTS,
    HISTORY_TIMELINE_TABLE_HEADER_CONSTANTS,
    CONTENT_MANAGEMENT_CONSTANTS
} from "@/constants/contents.constant";
import ContentService from "@/services/content.service";
import AddModal from "@/components/content/AddModal";
import EditModal from "@/components/content/EditModal";

import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

const ContentManagementPage = () => {
    const [carouselData, setCarouselData] = useState<any[]>([]);
    const [contentData, setContentData] = useState<any[]>([]);
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<any>([]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCarouselData();
        fetchContentData();
        fetchHistoryData();
    }, []);

    const fetchCarouselData = async () => {
        try {
            const response = await ContentService.getAllCarousels();
            setCarouselData(response);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchContentData = async () => {
        try {
            const response = await ContentService.getAllContent();
            setContentData(response);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchHistoryData = async () => {
        try {
            const response = await ContentService.getAllHistoryTimeline();
            setHistoryData(response);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const openModal = (type: string) => {
        const config = {
            title: '',
            type: '',
            fields: [],
            onSubmit: handleSubmit,
            onCancel: handleClose,
        };

        switch (type) {
            case 'add_carousel':
                config.type = 'add_carousel';
                config.title = 'Add Carousel';
                // @ts-ignore
                config.fields = [{name: 'image', label: 'Upload Image', type: 'file'}];
                setIsAddModalOpen(true);
                break;
            case 'edit_carousel':
                config.type = 'edit_carousel';
                config.title = 'Edit Carousel';
                // @ts-ignore
                config.fields = [{name: 'image', label: 'Upload Image', type: 'file'}];
                setIsEditModalOpen(true);
                break;
            case 'add_content':
                config.type = 'add_content';
                config.title = 'Add Content';
                config.fields = [
                    {name: 'title', label: 'Content title', type: 'text'},
                    {name: 'description', label: 'Content description', type: 'textarea'}
                ];
                setIsAddModalOpen(true);
                break;
            case 'edit_content':
                config.type = 'edit_content';
                config.title = 'Edit Content';
                config.fields = [
                    {name: 'title', label: 'Content title', type: 'text'},
                    {name: 'description', label: 'Content description', type: 'textarea'}
                ];
                setIsEditModalOpen(true);
                break;
            case 'add_history_timeline':
                config.type = 'add_history_timeline';
                config.title = 'Add History Timeline';
                // @ts-ignore
                config.fields = [
                    {name: 'title', label: 'Title', type: 'text'},
                    {name: 'description', label: 'Description', type: 'textarea'},
                    {name: 'date', label: 'Date', type: 'date'}
                ];
                setIsAddModalOpen(true);
                break;
            case 'edit_history_timeline':
                config.type = 'edit_history_timeline';
                config.title = 'Edit History Timeline';
                // @ts-ignore
                config.fields = [
                    {name: 'title', label: 'Title', type: 'text'},
                    {name: 'description', label: 'Description', type: 'textarea'},
                    {name: 'date', label: 'Date', type: 'date'}
                ];
                setIsEditModalOpen(true);
                break;
        }
        setModalConfig(config);
    };

    const handleSubmit = async (data: any, type: any) => {
        console.log('Submitted data:', data);
        const payload = {
            ...data,
            "created_by": "admin",
            "last_updated_by": "admin123"
        }

        switch (type) {
            case 'add_carousel':
                try {
                    await ContentService.createCarousel(payload);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                fetchCarouselData();
                break;
            case 'add_content':
                try {
                    await ContentService.createContent(payload);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                fetchContentData();
                break;
            case 'add_history_timeline':
                try {
                    await ContentService.createHistoryTimeline(payload);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                fetchHistoryData();
                break;
            case 'edit_carousel':
                console.log('cb data._id', data._id)
                try {
                    await ContentService.updateCarousel(data._id, payload);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                fetchCarouselData();
                break;
            case 'edit_content':
                try {
                    await ContentService.updateContent(data._id, payload);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                fetchContentData();
                break;
            case 'edit_history_timeline':
                try {
                    await ContentService.updateHistoryTimeline(data._id, payload);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                fetchHistoryData();
                break;
            case 'delete_carousel':
                try {
                    await ContentService.deleteCarousel(data._id);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                fetchCarouselData();
                break;
            case 'delete_content':
                try {
                    await ContentService.deleteContent(data._id);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                fetchContentData();
                break;
            case 'delete_history_timeline':
                try {
                    await ContentService.deleteHistoryTimeline(data._id);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                fetchHistoryData();
                break;
        }
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleClose = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
    };

    const defineActionList = (action: any, record: any) => {
        return action.map((item: any) => {
            return {
                key: item.key,
                label: (
                    <div onClick={() => {
                        setSelectedRecord(record)
                        switch (item.key) {
                            case 'add_carousel':
                            case 'edit_carousel':
                            case 'add_content':
                            case 'edit_content':
                            case 'add_history_timeline':
                            case 'edit_history_timeline':
                                openModal(item.key)
                                break;
                            case 'delete_carousel':
                            case 'delete_content':
                            case 'delete_history_timeline':
                                handleSubmit(record, item.key);
                        }
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
            if (column.key === 'actions') {
                return {
                    ...column,
                    render: (text: any, record: any) => renderActionsDropdown(column.actionList, record)
                };
            }

            if (column.key === 'image') {
                return {
                    ...column,
                    render: (image: any) => (
                        <Typography.Text>{image?.fileList[0]?.name}</Typography.Text>
                    ),
                };
            }
            return column;
        });
    }

    return (
        <PageLayout>
            <Breadcrumb items={[{title: 'Content Management', href: '/management/contents'}]}/>
            <h1 style={{marginBottom: 16}}>Content Management</h1>

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
                       pagination={false}/>
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
        </PageLayout>
    );
};

export default ContentManagementPage;
