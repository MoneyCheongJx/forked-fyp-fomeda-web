"use client"

import {Image, Button, Dropdown, Divider, Avatar, Row, notification} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import "../../styles/header.component.css"
import {MenuProps} from "antd/lib";
import {Header} from "antd/es/layout/layout";
import {
    HEADER_MENU_LIST_CONSTANTS, HEADER_USER_DROPDOWN_CONSTANTS
} from "@/constants/header.constants";
import Link from "next/link";
import {useState, useEffect} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import AuthenticationService from "@/services/authentication.service";
import NotificationService from "@/services/notification.service";
import { useAuth } from '../../app/(auth)/context/auth-context';
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../models/jwt.model"
import Cookies from 'js-cookie';

const NavigationBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [userData, setUserData] = useState<CustomJwtPayload>();
    const { setRedirecting } = useAuth();

    useEffect(() => {
        const userData = Cookies.get('token');
        if (userData) {
            setUserData(jwtDecode<CustomJwtPayload>(userData));
        }

    }, [setUserData]);

    const handleLogout = async () => {
        try {
            const sessionId = Cookies.get('session');
            if (sessionId) {
                await AuthenticationService.logout({session_id: sessionId}).then(res => {
                    setRedirecting(true);
                    router.push('/login');

                    Cookies.remove('session');
                    Cookies.remove('token');

                    NotificationService.success(
                        "Logout Successful",
                        "You have successfully logged out."
                    )
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const PROFILE_DROPDOWN_LIST: MenuProps["items"] = HEADER_USER_DROPDOWN_CONSTANTS.map((item) => ({
        key: item.key,
        label: item.key === "logout" ?
            <div onClick={handleLogout}>{item.label}</div>
            : (
                <Link href={item.link}>
                    <div>{item.label}</div>
                </Link>
            ),
    }));

    return (
        <Header className="header-box">
            <Image
                preview={false}
                width={50}
                src="/logoFomeda.svg"
                alt="fomeda-logo"
            />

            <Row style={{alignItems: "center"}}>
                {HEADER_MENU_LIST_CONSTANTS.map((item: any) => {
                    if (item.type === "divider") {
                        return <Divider className="divider" type="vertical" key={item.key}/>;
                    }

                    if (item.hasChild) {
                        if (!userData || userData?.modules?.length === 0) {
                            return null;
                        }

                        return (
                            <Dropdown
                                key={item.key}
                                trigger={['hover']}
                                menu={{
                                    items: item.children.filter((item: { key: string; }) => userData?.modules?.includes(item.key)).map((item: any) => ({
                                        key: item.key,
                                        label: (
                                            <Link href={item.link}>
                                                <div>{item.label}</div>
                                            </Link>
                                        ),
                                    }))
                                }}
                            >
                                <Button
                                    disabled={item.disabled}
                                    type="text"
                                    icon={<DownOutlined/>}
                                    iconPosition={"end"}
                                    className={`${pathname.startsWith(item.link) ? "nav-button-selected" : "nav-button"}`}
                                >
                                    {pathname.startsWith(item.link) ? item.children?.filter((header: { link: string; }) => header.link === pathname)[0]?.label : item.label}
                                </Button>
                            </Dropdown>
                        );
                    }

                    return (
                        <Button
                            key={item.key}
                            onClick={() => router.push(item.link)}
                            disabled={item.disabled}
                            type="text"
                            className={`${pathname === item.link ? "nav-button-selected" : "nav-button"}`}
                        >
                            {item.label}
                        </Button>
                    );
                })}

                {userData ?
                    <>
                        <Avatar icon={<UserOutlined/>} className="nav-avatar"/>
                        <Dropdown menu={{items: PROFILE_DROPDOWN_LIST}}>
                            <Button type="text" className="nav-button" icon={<DownOutlined/>} iconPosition="end">
                                {userData.username}
                            </Button>
                        </Dropdown>
                    </>
                    :
                    <Row>
                        <Button
                            type="text"
                            className={`${pathname === "/login" ? "nav-button-selected" : "nav-button"}`}
                            onClick={() => router.push('/login')
                        }>
                            Login
                        </Button>
                    </Row>
                }
            </Row>
        </Header>
    );
};

export default NavigationBar;
