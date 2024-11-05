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
import { DateTimeUtils } from "@/utils/date-time.utils";

const {Title, Paragraph} = Typography;

const ProfileManagementPage = () => {
    const [data, setData] = useState<any>([]);
    const [userType, setUserType] = useState<string | null>(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        let userData;
        const token = Cookies.get('token');
        if (token) {
            try {
                userData = jwtDecode<CustomJwtPayload>(token);
                setUserType(userData?.role ?? null);
            } catch (error) {
                console.error(error);
                ;
            }
        }
        const userId = userData?.user_id ?? "UndefinedAdmin";

        try {
            const response = await AuthenticationService.getProfileInfo(userId);
            const formattedResponse = {
                ...response,
                ...(response?.created_on && { created_on: DateTimeUtils.formatDate(response.created_on) }),
                ...(response?.registered_on && { registered_on: DateTimeUtils.formatDate(response.registered_on) }),
                ...(response?.approved_on && { approved_on: DateTimeUtils.formatDate(response.approved_on) }),
            }
            form.setFieldsValue({ ...formattedResponse });
            setData(formattedResponse);
        } catch (error) {
            console.error(error);
            NotificationService.error(
                'Error Fetching Profile Info',
                'An error occurred while trying to retrieve profile information. Please try again later.'
            );
            throw error;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [router, form]);

    const handleUpdateProfile = async (values: any) => {
        setLoading(true);

        try {
            await AuthenticationService.updateProfile(data?.user_id, values).then(res => {
                NotificationService.success('Update profile', 'Your profile has been updated sucessfully.');
                router.push('/content');
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

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
        <PageLayout title={"Profile Management"} >
            <Row align="middle" justify="space-evenly" style={{height: '100vh'}}>
                <Col>
                    <Card style={{width: "500px", flexGrow: 1}}>
                        <Title level={3}>Change password</Title>
                        <Paragraph>
                            Keeping your account secure is important. Updating your password periodically
                            and use a strong password with a mix of letters, numbers, and symbols is a good practice.
                        </Paragraph>
                        <Button type="primary" onClick={() => router.push('/management/profile/change-password')} block>
                            Change Password
                        </Button>
                    </Card>
                    <Card style={{width: "500px", flexGrow: 1, marginTop: "20px"}}>
                        <Title level={3}>Delete account</Title>
                        <Paragraph>
                            Deleting the entire account is irreversible in this system. Please ensure you
                            have carefully considered your decision before proceeding with account deletion.
                        </Paragraph>
                        <Button type="primary" onClick={() => router.push('/management/profile/deactivate-account')} block>
                            Delete Account
                        </Button>
                    </Card>
                </Col>
                <Col>
                    <Card style={{width: '600px'}}>
                        <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
                            <Title level={2}>Account basic information</Title>
                            <Form.Item
                                label="Fullname"
                            >
                                <Input value={data?.fullname} disabled/>
                            </Form.Item>
                            <Form.Item
                                label="Username"
                            >
                                <Input value={data?.username} disabled/>
                            </Form.Item>
                            <Form.Item
                                name="email_address"
                                label="Email address"
                                rules={[
                                    {required: true, message: 'Please enter the email address'},
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
                                <Input placeholder="Admin email"/>
                            </Form.Item>

                            {userType === "admin" && (
                                <>
                                    <Form.Item label="Created on">
                                        <Input value={data?.created_on} disabled/>
                                    </Form.Item>
                                </>
                            )}

                            {userType === "supplier" && (
                                <>
                                    <Form.Item
                                        label="Registered on"
                                    >
                                        <Input value={data?.registered_on} disabled/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Approved on"
                                    >
                                        <Input value={data?.approved_on} disabled/>
                                    </Form.Item>
                                    <Title level={3}>Company information</Title>
                                    <Form.Item
                                        label="Trading company name"
                                    >
                                        <Input value={data?.company_name} disabled/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Trading company no"
                                    >
                                        <Input value={data?.company_no} disabled/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Trading company address"
                                    >
                                        <Input value={data?.company_address} disabled/>
                                    </Form.Item>
                                </>
                            )}
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Update Profile
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
};

export default ProfileManagementPage;
