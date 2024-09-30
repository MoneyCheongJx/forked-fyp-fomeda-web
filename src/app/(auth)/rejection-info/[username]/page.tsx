"use client"

import React, {useEffect, useState} from "react";
import PageLayout from "@/app/page";
import {Col, Row, Card, Image, Typography, Form, Button} from "antd";
import AuthenticationService from "@/services/authentication.service";
import { useRouter } from 'next/router';

const {Title, Link, Text} = Typography;

const RejectionInfoPage = () => {
    const router = useRouter();
    const { username } = router.query;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetchRejectionData()
    }, []);

    const fetchRejectionData = async () => {
        try {
            const response = await AuthenticationService.getRejectionInfo(username);
            setData(response)
        } catch (error) {
            console.error(error);
            throw error;
        } 
    }
    
    return (
        <PageLayout showTitle={false}>
            <Row align="middle" justify="space-evenly" style={{height: '100vh'}}>
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
                            style={{width: "500px"}}
                        >
                            <Title level={2}>Your registration was rejected.</Title>
                            <Text strong>Reason:</Text>
                            <br/>
                            <Text>
                                fetch reject data
                            </Text>
                            <Button type="primary" block className="mt-5">
                                Appeal registration
                            </Button>
                        </Form>
                        <div style={{textAlign: 'center', paddingTop: '16px'}}>
                            <Typography.Text style={{padding: '5px'}}>
                                Back to sign in?
                            </Typography.Text>
                            <Link href="/login">
                                Sign in here
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
}

export default RejectionInfoPage;
