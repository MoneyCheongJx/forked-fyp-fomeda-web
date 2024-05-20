'use client'

import React from "react";
import {Image, Space, Row, Col} from "antd";
import {Card} from "antd";
import {Button, Checkbox, Form, Input} from 'antd';
import {Typography} from "antd";
import type {FormProps} from 'antd';
import PageLayout from '@/app/page';

const {Title, Link} = Typography;

type FieldType = {
    username?: string;
    password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function Login() {
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
                            initialValues={{remember: true}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            style={{width: "400px"}}
                        >
                            <Title level={2}>Login</Title>
                            <Form.Item<FieldType>
                                label="Username"
                                name="username"
                                rules={[{required: true, message: 'Please input your username!'}]}
                            >
                                <Input placeholder="Username"/>
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Password"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input.Password placeholder="Password"/>
                            </Form.Item>
                            <Form.Item style={{paddingTop: '5px'}}>
                                <Button style={{width: '100%'}} type="primary" htmlType="submit">
                                    Sign in
                                </Button>
                                <div style={{padding: '5px', textAlign: 'right'}}>
                                    <Link href="/forget-password">
                                        Forget Password
                                    </Link>
                                </div>
                            </Form.Item>
                        </Form>
                        <div style={{textAlign: 'center'}}>
                            <Typography.Text style={{padding: '5px'}}>
                                New to FOMEDA?
                            </Typography.Text>
                            <Link href="/forget-password">
                                Create account now
                            </Link>
                        </div>

                        <div style={{textAlign: 'center'}}>
                            <Typography.Text style={{padding: '5px'}}>
                                Check account registration status?
                            </Typography.Text>
                            <Link href="/forget-password">
                                Click here
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}
