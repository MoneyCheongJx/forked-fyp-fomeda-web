"use client"

import React, {useEffect, useState} from "react";
import PageLayout from "@/app/page";
import {Col, Input, Row, DatePicker, Card, Image, Typography, Form, FormProps, Button} from "antd";
import AuthenticationService from "@/services/authentication.service";
import NotificationService from "@/services/notification.service";
import {usePathname, useRouter} from "next/navigation";

const {Title, Link, Text} = Typography;

interface FormValues {
    fullname: string;
    email_address: string;
    confirm_email_address: string;
    company_name: string;
    company_no: string;
    company_address: string;
}

const AppealPage = () => {
    const [data, setData] = useState<any>([]);
    const [form] = Form.useForm();
    const pathname = usePathname();
    const userId = pathname.substring(pathname.lastIndexOf("/") + 1);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await AuthenticationService.getAppealInfo(userId);
            form.setFieldsValue({...response});
            setData(response);
        } catch (error) {
            console.error(error);
            NotificationService.error(
                'Error Fetching Registration Info',
                'An error occurred while trying to retrieve registration information. Please try again later.'
            );
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [router, form]);

    const onFinish = async (values: FormValues) => {
        const { confirm_email_address, ...payload} = values

        setIsLoading(true);

        try {
            await AuthenticationService.appealRegistration(userId, payload).then(res => {
                router.push('/appeal/success');
            });

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const checkEmailDuplicate = async (email: string) => {
        try {
            const response = await AuthenticationService.checkEmailDuplicate(email);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return (
        <PageLayout showTitle={false}>
            <Row align="middle" justify="space-evenly" style={{height: '100vh', width: '100vw'}}>
                <Col>
                    <Image
                        preview={false}
                        src="/logoFomeda.svg"
                        alt="fomeda-logo"
                    />
                </Col>
                <Col>
                    <Card>
                        <Form
                            form={form}
                            name="basic"
                            layout="vertical"
                            autoComplete="off"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            style={{width: "600px"}}
                        >
                            <Title level={2}>Appeal registration</Title>
                            <Title level={3}>Personal information</Title>
                            <Form.Item
                                label="Fullname"
                                name="fullname"
                                rules={[
                                    {required: true, message: 'Please input your fullname'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Fullname"/>
                            </Form.Item>
                            <Form.Item
                                label="Email addresss"
                                name="email_address"
                                rules={[
                                    {required: true, message: 'Please input your email address'},
                                    {type: "email", message: 'Please enter a valid email address'},
                                    {
                                        validator: async (_, value) => {
                                            if (!value || value === data?.email_address) {
                                                return Promise.resolve();
                                            }
                                            const isDuplicate = await checkEmailDuplicate(value);
                                            if (isDuplicate) {
                                                return Promise.reject(new Error('The email is already in use'));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Email address"/>
                            </Form.Item>
                            <Form.Item
                                label="Confirm email addresss"
                                name="confirm_email_address"
                                dependencies={["email_address"]}
                                rules={[
                                    {required: true, message: 'Please input to confirm email address'},
                                    {type: "email", message: 'Please enter a valid email address'},
                                    {
                                        validator: async (_, value) => {
                                            if (!value || value === data?.email_address) {
                                                return Promise.resolve();
                                            }
                                            const isDuplicate = await checkEmailDuplicate(value);
                                            if (isDuplicate) {
                                                return Promise.reject(new Error('The email is already in use'));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('email_address') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The confirm email that you entered does not match with email above'));
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Email address"/>
                            </Form.Item>
                            <Title level={3}>Company information</Title>
                            <Form.Item
                                label="Trading company name"
                                name="company_name"
                                rules={[
                                    {required: true, message: 'Please input your trading company name'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Trading company name"/>
                            </Form.Item>
                            <Form.Item
                                label="Trading company no"
                                name="company_no"
                                rules={[
                                    {required: true, message: 'Please input your trading company no'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Trading company no"/>
                            </Form.Item>
                            <Form.Item
                                label="Trading company address"
                                name="company_address"
                                rules={[
                                    {required: true, message: 'Please input your trading company address'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Trading company address"/>
                            </Form.Item>
                            <Title level={3}>Account information</Title>
                            <Form.Item
                                label="Username"
                            >
                                <Input value={data?.username} disabled/>
                            </Form.Item>
                            <Form.Item style={{paddingTop: '5px'}}>
                                <Button block type="primary" htmlType="submit" loading={isLoading}>
                                    Appeal
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}

export default AppealPage;
