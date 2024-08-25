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

interface UserData {
    user_id?: string;
    fullname?: string;
    username?: string;
    email_address?: string;
    is_active?: string;
    type?: string;
}

const NavigationBar = () => {
    const [userData, setUserData] = useState<UserData>({});
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            const sessionId = sessionStorage.getItem('session');

            if (sessionId) {
                await AuthenticationService.logout(sessionId).then(res => {
                    sessionStorage.clear();

                    NotificationService.success(
                        "Logout Successful",
                        "You have successfully logged out."
                    )

                    router.push('/login');
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

    // Check session storage on component mount
    useEffect(() => {
        const fetchData = async () => {
            const sessionId = sessionStorage.getItem('session')
            if (sessionId) {
                try {
                    await AuthenticationService.getDetails(sessionId).then(res => {
                        console.log('res', res)
                        setUserData(res);
                        console.log('userData', userData)
                    });
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
        fetchData();
    }, []);

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
                        return (
                            <Dropdown
                                key={item.key}
                                trigger={['hover']}
                                menu={{
                                    items: item.children.map((item: any) => ({
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
                                    {item.label}
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
                        <Button type="text" className="nav-button" onClick={
                            () => router.push('/login')
                        }>
                            Login
                        </Button>
                    </Row>
                }
            </Row>

            {/*<Row style={{alignItems: "center"}}>*/}
            {/*    {userData ? (*/}
            {/*        <>*/}
            {/*            <Divider className="divider" type="vertical"/>*/}
            {/*            <Dropdown menu={{items: MANAGEMENT_DROPDOWN_LIST}}>*/}
            {/*                <Button type="text" className="nav-button" icon={<DownOutlined/>} iconPosition="end">*/}
            {/*                    Management*/}
            {/*                </Button>*/}
            {/*            </Dropdown>*/}
            {/*            <Avatar icon={<UserOutlined/>} className="nav-avatar"/>*/}
            {/*            <Dropdown menu={{items: PROFILE_DROPDOWN_LIST}}>*/}
            {/*                <Button type="text" className="nav-button" icon={<DownOutlined/>} iconPosition="end">*/}
            {/*                    {userData.username}*/}
            {/*                </Button>*/}
            {/*            </Dropdown>*/}
            {/*        </>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            <Divider className="divider" type="vertical"/>*/}
            {/*            <Row>*/}
            {/*                <Button type="text" className="nav-button" onClick={*/}
            {/*                    () => router.push('/login')*/}
            {/*                }>*/}
            {/*                    Login*/}
            {/*                </Button>*/}
            {/*            </Row>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</Row>*/}
        </Header>
    );
};

export default NavigationBar;
