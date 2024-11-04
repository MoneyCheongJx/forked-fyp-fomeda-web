"use client";

import React from "react";
import {Image, Card, Row, Col, Button, Form, Input, Typography, Alert, Checkbox} from "antd";
import {usePathname, useRouter} from "next/navigation";
import {useState, useEffect} from 'react';
import PageLayout from '@/app/page';
import AuthenticationService from "@/services/authentication.service";
import NotificationService from "@/services/notification.service";
import Cookies from 'js-cookie';

const {Title, Link} = Typography;

export default function DeleteAccountConfirmationPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const userId = pathname.substring(pathname.lastIndexOf("/") + 1);
    const [loading, setLoading] = useState(false);
    const {Title, Paragraph} = Typography;

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsChecked(e.target.checked);
    };

    const handleDeleteAccount = async () => {
        try {
            await AuthenticationService.deleteAccount(userId, {}).then(res => {
                NotificationService.success(
                    `Account deleted`,
                    `The account was successfully deleted.`
                );
                Cookies.remove('session');
                Cookies.remove('token');
                router.push(`/delete-info/success`);
            });
        } catch (error) {
            console.error(error);
            NotificationService.error(
                "Delete Account Failed",
                "Delete account failed. Please contact the admin."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        router.push('/management/profile');
    };

    return (
        <PageLayout showTitle={false}>
            <Row align="middle" justify="space-evenly" style={{height: '100vh'}}>
                <Col>
                    <Card style={{width: '700px'}}>
                        <Alert
                            message="Are you sure you want to delete your account?"
                            description={
                                <div>
                                    <Paragraph>
                                        Deleting your account will permanently remove all your data associated with it.
                                        This action cannot be undone.
                                    </Paragraph>
                                </div>
                            }
                            type="warning"
                            showIcon
                            style={{margin: '20px 0'}}
                        />
                        <div style={{marginTop: 20}}>
                            <Checkbox onChange={handleCheckboxChange}>
                                I understand the consequences of deleting my account.
                            </Checkbox>
                        </div>
                        <div style={{marginTop: 20}}>
                            <Button
                                type="primary"
                                danger
                                block
                                disabled={!isChecked}
                                onClick={handleDeleteAccount}
                                loading={loading}
                            >
                                Delete Account
                            </Button>
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <Button block type="default" onClick={handleBack}>
                                Back to profile management
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}
