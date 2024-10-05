"use client"

import React, {useEffect, useState} from "react";
import PageLayout from "@/app/page";
import {Col, Row, Card, Image, Typography, Form, Button} from "antd";
import AuthenticationService from "@/services/authentication.service";
import {usePathname,} from "next/navigation";
import { DateTimeUtils } from "@/utils/date-time.utils";

const {Title, Link, Text} = Typography;

interface Rejection {
    rejected_by: string;
    rejected_on: string;
    reason: string;
}

const RejectionInfoPage = () => {
    const pathname = usePathname();
    const username = pathname.substring(pathname.lastIndexOf("/") + 1);

    const [data, setData] = useState<Rejection>({
        rejected_by: "",
        rejected_on: "",
        reason: ""
    });

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
                                {data?.reason}
                            </Text>
                            <br/><br/>
                            <Text strong>Rejected on:</Text>
                            <br/>
                            <Text>
                                {DateTimeUtils.formatDate(new Date(data?.rejected_on))}
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
