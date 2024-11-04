"use client";

import React from "react";
import {Image, Card, Row, Col, Button, Form, Input, Typography, notification} from "antd";
import {usePathname, useRouter} from "next/navigation";
import {useState, useEffect} from 'react';
import type {FormProps} from 'antd';
import PageLayout from '@/app/page';
import AuthenticationService from "@/services/authentication.service";
import NotificationService from "@/services/notification.service";
import Cookies from 'js-cookie';

const {Title, Link} = Typography;

export default function VerificationPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const userId = pathname.substring(pathname.lastIndexOf("/") + 1);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const onFinish: FormProps['onFinish'] = async (values) => {
        setIsLoading(true);

        try {
            const response = await AuthenticationService.getEmail(userId);
            const email = response?.email_address;

            const payload = {
                ...values,
                email: email
            }

            await AuthenticationService.verifyOtp(payload).then(res => {
                if (res?.verified) {
                    NotificationService.success(
                        `Verification Code Successful`,
                        `Valid verification code was entered.`
                    );
                    router.push(`/reset-password/${userId}`);
                } else {
                    NotificationService.error(
                        `Verification Code Failed`,
                        `Invalid verifciation code was entered. Please try again`
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

    const handleSendCode = async () => {
        setIsSending(true);
        try {
            const response = await AuthenticationService.getEmail(userId);
            const email = response?.email_address;
            await AuthenticationService.sendOtp({email: email});
            NotificationService.info(
                "Verification Code Sent",
                "A verification code has been sent to your email."
            );
            setCountdown(60);
        } catch (error) {
            console.error("Error sending OTP:", error);
            NotificationService.error(
                "Error",
                "An error occurred while sending the verification code. Please try again later."
            );
        } finally {
            setIsSending(false);
        }
    };

    const handleBack = () => {
        router.push('/forget-password');
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
                            name="verification_code"
                            layout="vertical"
                            autoComplete="off"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            style={{width: "425px"}}
                        >
                            <Title level={2}>Verification code</Title>
                            <Typography style={{paddingTop: '5px'}}>Please click the send code link to send verification code to the email.</Typography>
                            <Row align="middle">
                                <Col>
                                    <Form.Item
                                        label="Verification code"
                                        name="otp"
                                        rules={[{required: true, message: 'Please enter the verification code'}]}
                                        hasFeedback
                                        style={{paddingTop: '5px'}}
                                    >
                                        <Input.OTP/>
                                    </Form.Item>
                                </Col>
                                <Col style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                    <Button
                                        onClick={handleSendCode}
                                        disabled={countdown > 0}
                                        loading={isSending}
                                        type="link"
                                        style={{paddingTop: '8px'}}
                                    >
                                        {countdown > 0 ? `Send in ${countdown}s` : "Send code"}
                                    </Button>
                                </Col>
                            </Row>
                            <Form.Item>
                                <div style={{marginTop: '10px'}}>
                                    <Button block type="primary" htmlType="submit" loading={isLoading}>
                                        Submit
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
