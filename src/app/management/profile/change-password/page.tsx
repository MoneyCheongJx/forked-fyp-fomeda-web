"use client"

import {useEffect, useState} from "react";
import PageLayout from "@/app/page";
import AuthenticationService from "@/services/authentication.service";
import NotificationService from "@/services/notification.service";
import {Button, Card, Col, Form, Input, Row, Typography} from "antd";
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';
import {CustomJwtPayload} from "@/models/jwt.model";
import {jwtDecode} from "jwt-decode";
import {DateTimeUtils} from "@/utils/date-time.utils";

const {Title, Paragraph} = Typography;

const ChangePasswordPage = () => {
    const [data, setData] = useState<any>([]);
    const [userType, setUserType] = useState<string | null>(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const userData = jwtDecode<CustomJwtPayload>(token);
                setData(userData);
            } catch (error) {
                console.error(error);
                ;
            }
        }
    }, [router, form]);
    
    const handleChangePassword = async (values: any) => {
        setLoading(true);

        const { confirm_password, ...rest} = values
        const payload = {
            ...rest,
        }

        try {
            await AuthenticationService.updatePassword(data?.user_id, payload).then(res => {
                NotificationService.success('Update password', 'Your password has been updated sucessfully.');
                router.push('/management/profile')
            });
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                const errorMessage = error.message
                if (errorMessage === "Invalid old password") {
                    NotificationService.error(
                        "Update Password Failed",
                        "Invalid old password. Please try again."
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout showTitle={false}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Card style={{width: '700px'}}>
                    <Form form={form} layout="vertical" onFinish={handleChangePassword}>
                        <Title level={2}>Change password</Title>
                        <Form.Item
                            label="Old password"
                            name="password"
                            rules={[
                                {required: true, message: 'Please input your old password'}
                            ]}
                        >
                            <Input.Password placeholder="Old Password"/>
                        </Form.Item>
                        <Form.Item
                            label="New Password"
                            name="new_password"
                            rules={[
                                {required: true, message: 'Please input your new password'},
                                {min: 12, max: 20, message: 'The new password must be between 12 and 20 characters'},
                                {whitespace: true, message: 'The password cannot be whitespaces only'},
                                {
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                                    message: 'The new password contains at least one uppercase letter, one lowercase letter, at least one number and at least one special character'
                                }
                            ]}
                        >
                            <Input.Password placeholder="Password"/>
                        </Form.Item>
                        <Form.Item
                            label="Confirm password"
                            dependencies={['new_password']}
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
                                        if (!value || getFieldValue('new_password') === value) {
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
                            <Button htmlType="submit" type="primary" loading={loading} block>
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </PageLayout>
    );
};

export default ChangePasswordPage;
