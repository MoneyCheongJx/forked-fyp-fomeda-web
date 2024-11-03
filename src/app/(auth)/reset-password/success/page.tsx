"use client";

import React from "react";
import {Row, Col, Card, Typography, Button, Image} from "antd";
import PageLayout from "@/app/page";
import {useRouter} from "next/navigation";

const {Title, Paragraph} = Typography;

const ResetPasswordSuccessPage = () => {
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
                        <Title level={3}>Reset password successfully</Title>
                        <Paragraph>
                            Congratulations! Your password was reset successfully. You can now log in with new credentials.
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

export default ResetPasswordSuccessPage;
