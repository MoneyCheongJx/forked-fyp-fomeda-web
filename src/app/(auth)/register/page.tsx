"use client";

import React, { useState } from "react";
import {Image, Card, Row, Col, Button, Form, Input, Typography} from "antd";
import type {FormProps} from 'antd';
import PageLayout from '@/app/page';
import AuthenticationService from "@/services/authentication.service";
import { useRouter } from 'next/navigation';

const {Title, Link} = Typography;

type FieldType = {
    fullname?: string;
    email_address?: string;
    confirm_email_address?: string;
    company_name?: string;
    company_no?: string;
    company_address?: string;
    username?: string;
    password?: string;
    confirm_password?: string;
};

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const checkEmailDuplicate = async (email: string) => {
        try {
            const response = await AuthenticationService.checkEmailDuplicate(email);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const checkUsernameDuplicate = async (username: string) => {
        try {
            const response = await AuthenticationService.checkUsernameDuplicate(username);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        setIsLoading(true);

        try {
            const { confirm_password, confirm_email_address, ...rest} = values
            const payload = {
                ...rest,
                type: "supplier"
            }

            await AuthenticationService.register(payload).then(res => {
                router.push('/register/success');
            });

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                            name="basic"
                            layout="vertical"
                            autoComplete="off"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            style={{width: "600px"}}
                        >
                            <Title level={2}>Create an account</Title>
                            <Title level={3}>Personal information</Title>
                            <Form.Item<FieldType>
                                label="Fullname"
                                name="fullname"
                                rules={[
                                    {required: true, message: 'Please input your fullname'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Fullname"/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Email addresss"
                                name="email_address"
                                rules={[
                                    {required: true, message: 'Please input your email address'},
                                    {type: "email", message: 'Please enter a valid email address'},
                                    {
                                        validator: async (_, value) => {
                                            if (!value) {
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
                            <Form.Item<FieldType>
                                label="Confirm email addresss"
                                name="confirm_email_address"
                                dependencies={["email_address"]}
                                rules={[
                                    {required: true, message: 'Please input to confirm email address'},
                                    {type: "email", message: 'Please enter a valid email address'},
                                    {
                                        validator: async (_, value) => {
                                            if (!value) {
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
                            <Form.Item<FieldType>
                                label="Trading company name"
                                name="company_name"
                                rules={[
                                    {required: true, message: 'Please input your trading company name'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Trading company name"/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Trading company no"
                                name="company_no"
                                rules={[
                                    {required: true, message: 'Please input your trading company no'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Trading company no"/>
                            </Form.Item>
                            <Form.Item<FieldType>
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
                            <Form.Item<FieldType>
                                label="Username"
                                name="username"
                                rules={[
                                    {required: true, message: 'Please input your username'},
                                    {min: 6, max: 20, message: 'The username must be between 6 and 20 characters'},
                                    {whitespace: true, message: 'The username cannot be whitespaces only'},
                                    {
                                        pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
                                        message: 'The username must start with an alphabet and contain only alphanumeric characters and underscores'
                                    },
                                    {
                                        validator: async (_, value) => {
                                            if (!value) {
                                                return Promise.resolve();
                                            }
                                            const isDuplicate = await checkUsernameDuplicate(value);
                                            if (isDuplicate) {
                                                return Promise.reject(new Error('The username is already in use'));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Input placeholder="Username"/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Password"
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
                            <Form.Item<FieldType>
                                label="Confirm password"
                                dependencies={['password']}
                                name="confirm_password"
                                rules={[
                                    {required: true, message: 'Please input to confirm your new password'},
                                    {min: 12, max: 20, message: 'The confirm password must be between 12 and 20 characters'},
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
                                <Button block type="primary" htmlType="submit" loading={isLoading}>
                                    Create an  account
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}
