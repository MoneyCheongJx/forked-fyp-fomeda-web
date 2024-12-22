"use client";

import React from "react";
import {Image, Card, Row, Col, Button, Form, Input, Typography, notification} from "antd";
import {usePathname, useRouter} from "next/navigation";
import {useState, useEffect} from 'react';
import type {FormProps} from 'antd';
import PageLayout from '@/app/page';
import AuthenticationService from "@/services/authentication.service";
import NotificationService from "@/services/notification.service";

const {Title, Link} = Typography;

export default function ResetPasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const userId = pathname.substring(pathname.lastIndexOf("/") + 1);

    const onFinish: FormProps['onFinish'] = async (values) => {
        setIsLoading(true);

        const {confirm_password, ...rest} = values
        const payload = {
            ...rest,
        }

        try {
            await AuthenticationService.resetPassword(userId, payload).then(res => {
                NotificationService.success('Reset password', 'Your password has been reset sucessfully.');
                router.push('/reset-password/success')
            });
        } catch (error) {
            console.error(error);
            NotificationService.error(
                "Internal Error",
                "Reset password failed. Please contact the support."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                            name="forget_password"
                            layout="vertical"
                            autoComplete="off"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            style={{width: "400px"}}
                        >
                            <Title level={2}>Reset password</Title>
                            <Form.Item
                                label="New password"
                                name="password"
                                rules={[
                                    {required: true, message: 'Please input your password'},
                                    {min: 12, max: 20, message: 'The password must be between 12 and 20 characters'},
                                    {whitespace: true, message: 'The password cannot be whitespaces only'},
                                    {
                                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                                        message: 'The password contains at least one uppercase letter, one lowercase letter, at least one number and at least one special character'
                                    }
                                ]}
                            >
                                <Input.Password placeholder="Password"/>
                            </Form.Item>
                            <Form.Item
                                label="Confirm new password"
                                dependencies={['password']}
                                name="confirm_password"
                                rules={[
                                    {required: true, message: 'Please input to confirm your new password'},
                                    {
                                        min: 12,
                                        max: 20,
                                        message: 'The confirm password must be between 12 and 20 characters'
                                    },
                                    {whitespace: true, message: 'The confirm password cannot be whitespaces only'},
                                    {
                                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                                        message: 'The confirm password contains at least one uppercase letter, one lowercase letter, at least one number and at least one special character'
                                    },
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The confirm password that you entered does not match with password above'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Confirm password"/>
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
