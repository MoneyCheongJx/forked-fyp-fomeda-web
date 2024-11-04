"use client";

import React from "react";
import {Row, Col, Card, Typography, Button, Image} from "antd";
import PageLayout from "@/app/page";
import {useRouter} from "next/navigation";

const {Title, Paragraph} = Typography;

const DeactivateSuccessPage = () => {
    const router = useRouter();

    const handleBackToLogin = () => {
        router.push("/login");
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
                    <Card style={{width: "600px", flexGrow: 1}}>
                        <Title level={3}>Deactivate account successfully</Title>
                        <Paragraph>
                            We&aposre sorry to see you go. Your account and all associated data have been permanently removed.
                            Thank you for being part of our community.
                        </Paragraph>
                        <Button type="primary" block onClick={handleBackToLogin}>
                            Back to Sign In
                        </Button>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
};

export default DeactivateSuccessPage;
