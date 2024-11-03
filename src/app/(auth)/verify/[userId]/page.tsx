"use client";

import React from "react";
import {Image, Card, Row, Col, Button, Form, Input, Typography, notification} from "antd";
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';
import type {FormProps} from 'antd';
import PageLayout from '@/app/page';
import AuthenticationService from "@/services/authentication.service";
import NotificationService from "@/services/notification.service";
import Cookies from 'js-cookie';

const {Title, Link} = Typography;

export default function VerificationPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish: FormProps['onFinish'] = async (values) => {
        setIsLoading(true);
        try {
            await AuthenticationService.checkEmailDuplicate(values).then(res => {
                if (res) {
                    NotificationService.success(
                        `${res}`,
                        `You have successfully logged in`
                    );
                } else {
                    NotificationService.error(
                        `Forget Password Failed`,
                        `Invalid email was entered. Please try again`
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
                            <Form.Item
                                label="Email addresss"
                                name="email_address"
                                rules={[
                                    {required: true, message: 'Please input your email address'},
                                    {type: "email", message: 'Please enter a valid email address'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Email address"/>
                            </Form.Item>
                            <Form.Item style={{paddingTop: '5px'}}>
                                <Button block type="primary" htmlType="submit" loading={isLoading}>
                                    Continue
                                </Button>
                                <Button block type="default" htmlType="submit" loading={isLoading}>
                                    Back
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}
