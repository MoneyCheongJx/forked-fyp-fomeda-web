"use client";

import React from "react";
import {Image, Card, Row, Col, Button, Form, Input, Typography} from "antd";
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';
import type {FormProps} from 'antd';
import PageLayout from '@/app/page';
import AuthenticationService from "@/services/authentication.service";
import NotificationService from "@/services/notification.service";

const {Title, Link} = Typography;

export default function ForgetPasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish: FormProps['onFinish'] = async (values) => {
        setIsLoading(true);
        try {
            await AuthenticationService.checkForgetPasswordEmail(values?.email_address).then(res => {
                if (res?.exist) {
                    router.push(`/verify/${res?.user_id}`);
                } else {
                    NotificationService.error(
                        `Invalid email`,
                        `No account was found with this email. Please try again`
                    );
                }
            });
        } catch (error) {
            console.error(error);
            NotificationService.error(
                'Error Fetching Info',
                'An error occurred while trying to retrieve account information. Please try again later.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleBack = () => {
        router.push('/login');
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
                            name="forget_password"
                            layout="vertical"
                            autoComplete="off"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            style={{width: "400px"}}
                        >
                            <Title level={2}>Forget password</Title>
                            <Typography >We will send a verification code to this email if it matches an existing account.</Typography>
                            <Form.Item
                                label="Email address"
                                name="email_address"
                                rules={[
                                    {required: true, message: 'Please input your email address'},
                                    {type: "email", message: 'Please enter a valid email address'},
                                ]}
                                hasFeedback
                                style={{paddingTop: '5px'}}
                            >
                                <Input placeholder="Email address"/>
                            </Form.Item>
                            <Form.Item style={{paddingTop: '5px'}}>
                                <div>
                                    <Button block type="primary" htmlType="submit" loading={isLoading}>
                                        Continue
                                    </Button>
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <Button block type="default" onClick={handleBack}>
                                        Back
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}
