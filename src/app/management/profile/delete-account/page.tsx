"use client"

import {useEffect, useState} from "react";
import PageLayout from "@/app/page";
import AuthenticationService from "@/services/authentication.service";
import NotificationService from "@/services/notification.service";
import {Button, Card, Col, Form, Input, Row, Typography, Alert, List} from "antd";
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';
import {CustomJwtPayload} from "@/models/jwt.model";
import {jwtDecode} from "jwt-decode";
import {DateTimeUtils} from "@/utils/date-time.utils";

const {Title, Paragraph} = Typography;

const DeleteAccountPage = () => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDeleteClick = () => {
        setIsLoading(true);
        router.push(`/management/profile/verify/${data?.user_id}`);
    };

    const handleBack = () => {
        router.push('/management/profile');
    };

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
    }, [router]);

    return (
        <PageLayout showTitle={false}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Card style={{width: '700px'}}>
                    <Title level={2}>Delete account</Title>
                    <Alert
                        message="Are you sure you want to delete your account?"
                        description={
                            <div>
                                <Paragraph>
                                    Deleting your account will permanently remove all your data associated with it. This
                                    action cannot be undone.
                                </Paragraph>
                                <Paragraph>
                                    <List
                                        dataSource={[
                                            "You will lose access to your account.",
                                            "You will no longer be able to log in or access any associated services."
                                        ]}
                                        renderItem={(item) => (
                                            <Typography>- {item}</Typography>
                                        )}
                                    />
                                </Paragraph>
                                <Paragraph>
                                    If you are certain about deleting your account, please click the
                                    "Continue Delete Account" button below.
                                </Paragraph>
                            </div>
                        }
                        type="warning"
                        showIcon
                        style={{margin: '20px 0'}}
                    />
                    <div>
                        <Button block type="primary" loading={isLoading} onClick={handleDeleteClick}>
                            Continue Delete Account
                        </Button>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <Button block type="default" onClick={handleBack}>
                            Back
                        </Button>
                    </div>
                </Card>
            </div>
        </PageLayout>
    );
};

export default DeleteAccountPage;
