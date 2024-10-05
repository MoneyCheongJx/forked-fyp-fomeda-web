"use client";

import React from "react";
import {Row, Col, Card, Typography, Button, Image} from "antd";
import PageLayout from "@/app/page";
import {useRouter} from "next/navigation";

const {Title, Paragraph} = Typography;

const RegisterSuccessPage = () => {
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
                        <Title level={3}>Registered successfully</Title>
                        <Paragraph>
                            Congratulations! Your account registration request was successful. Please note that your
                            account is pending review from the administrator. Once approved, you will be able to
                            login to the system. Thank you for your patience.
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

export default RegisterSuccessPage;
