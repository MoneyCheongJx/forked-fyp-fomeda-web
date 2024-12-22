"use client"

import React, {useEffect, useState} from "react";
import PageLayout from "@/app/page";
import {Col, Input, Row, DatePicker, Card, Image, Typography, Form, FormProps, Button} from "antd";
import {useRouter} from 'next/navigation';
import AuthenticationService from "@/services/authentication.service";
import NotificationService from "@/services/notification.service";

const {Title, Link, Text} = Typography;

interface FormValues {
    username: string;
}

const StatusCheckPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values: FormValues) => {
        setIsLoading(true);
        try {
            await AuthenticationService.checkStatus(values?.username).then(res => {
                if (res?.status) {
                    switch (res.status) {
                        case "pending_review":
                            NotificationService.info(
                                `Status Pending`,
                                `Your account registration is currently pending review from admin. Please check back later.`
                            );
                            break;
                        case "approved":
                            NotificationService.success(
                                `Status Approved`,
                                `Congratulations! Your account registration has been approved.`
                            );
                            break;
                        case "rejected":
                            NotificationService.error(
                                `Status Rejected`,
                                `Unfortunately, your account registration was rejected.`
                            );
                            router.push(`/rejection-info/${res?.user_id}`);
                            break;
                        default:
                            NotificationService.error(
                                `Internal Error`,
                                `An unexpected status was returned. Please contact support.`
                            );
                            break;
                    }
                } else {
                    NotificationService.error(
                        `Internal Error`,
                        `An unexpected status was returned. Please contact support.`
                    );
                }

            });
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                const errorMessage = error.message
                if (errorMessage === "User not found") {
                    NotificationService.error(
                        "User not found",
                        "Invalid username during status checking. Please try again."
                    );
                } else {
                    NotificationService.error(
                        "Internal Error",
                        "An unexpected status was returned. Please contact support."
                    );
                }
            }
            else {
                NotificationService.error(
                    `Internal Error`,
                    `An unexpected status was returned. Please contact support.`
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <PageLayout showTitle={false}>
            <Row align="middle" justify="space-evenly" style={{height: '100vh'}}>
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
                            name="basic"
                            layout="vertical"
                            autoComplete="off"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            style={{width: "400px"}}
                        >
                            <Title level={2}>Supplier Status Checking</Title>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {required: true, message: 'Please input your username'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Username"/>
                            </Form.Item>
                            <Form.Item style={{paddingTop: '5px'}}>
                                <Button block type="primary" htmlType="submit" loading={isLoading}>
                                    Check
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={{textAlign: 'center'}}>
                            <Typography.Text style={{padding: '5px'}}>
                                Back to sign in?
                            </Typography.Text>
                            <Link href="/login">
                                Sign in here
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}

export default StatusCheckPage;
