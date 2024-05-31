"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {Image, Card, Row, Col, Button, Form, Input, Typography} from "antd";

import type {FormProps} from 'antd';
import PageLayout from '@/app/page';

const {Title, Link} = Typography;

type FieldType = {
    fullName?: string;
    email?: string;
    confirmEmail?: string;
    tradingCompanyName?: string;
    tradingCompanyNo?: string;
    tradingCompanyAddress?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};



export default function RegisterPage() {

    return (
        <PageLayout>
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
                                name="fullName"
                                rules={[
                                    {required: true, message: 'Please input your fullname'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Fullname"/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Email addresss"
                                name="email"
                                rules={[
                                    {required: true, message: 'Please input your email address'},
                                    {type: "email", message: 'Please enter a valid email address'}
                                    // validator to check duplicate email
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Email address"/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Confirm email addresss"
                                name="confirmEmail"
                                dependencies={["email"]}
                                rules={[
                                    {required: true, message: 'Please input to confirm email address'},
                                    {type: "email", message: 'Please enter a valid email address'},
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('email') === value) {
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
                                name="tradingCompanyName"
                                rules={[
                                    {required: true, message: 'Please input your trading company name'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Trading company name"/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Trading company no"
                                name="tradingCompanyNo"
                                rules={[
                                    {required: true, message: 'Please input your trading company no'},
                                ]}
                                hasFeedback
                            >
                                <Input placeholder="Trading company no"/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Trading company address"
                                name="tradingCompanyAddress"
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
                                    }
                                    // Validate if username is valid
                                ]}
                            >
                                <Input placeholder="Username"/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Password"
                                name="password"
                                rules={[
                                    {required: true, message: 'Please input your password'},
                                    {min: 12, max: 20, message: 'The username must be between 12 and 20 characters'},
                                    {whitespace: true, message: 'The password cannot be whitespaces only'},
                                    {
                                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                                        message: 'The username contains at least one uppercase letter, one lowercase letter, at least one number and at least one special character'
                                    }
                                ]}
                            >
                                <Input.Password placeholder="Password"/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Confirm password"
                                dependencies={['password']}
                                name="confirmPassword"
                                rules={[
                                    {required: true, message: 'Please input your password'},
                                    {min: 12, max: 20, message: 'The username must be between 12 and 20 characters'},
                                    {whitespace: true, message: 'The password cannot be whitespaces only'},
                                    {
                                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                                        message: 'The username contains at least one uppercase letter, one lowercase letter, at least one number and at least one special character'
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
                                <Button block type="primary" htmlType="submit">
                                    Create an account
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}
