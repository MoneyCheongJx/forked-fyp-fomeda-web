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

const DeleteAccountPage = () => {
    return (
        <PageLayout title={"Delete Account"}>

        </PageLayout>
    );
};

export default DeleteAccountPage;
