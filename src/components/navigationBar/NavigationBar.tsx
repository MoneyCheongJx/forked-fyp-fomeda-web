import React from "react";
import {Image, Button, Dropdown, Divider, Avatar, Row} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import "../../styles/header.component.css"
import {MenuProps} from "antd/lib";
import {Header} from "antd/es/layout/layout";
import {
    HEADER_MANAGEMENT_DROPDOWN_LIST_CONSTANTS, HEADER_USER_DROPDOWN_CONSTANTS
} from "@/constants/header.constants";
import Link from "next/link";

const MANAGEMENT_DROPDOWN_LIST: MenuProps["items"] = HEADER_MANAGEMENT_DROPDOWN_LIST_CONSTANTS.map((item) => ({
    key: item.key,
    label: (
        <Link href={item.link}>
            <div>{item.label}</div>
        </Link>
    ),
}));

const PROFILE_DROPDOWN_LIST: MenuProps["items"] = HEADER_USER_DROPDOWN_CONSTANTS.map((item) => ({
    key: item.key,
    label: (
        <Link href={item.link}>
            <div>{item.label}</div>
        </Link>
    ),
}));

const NavigationBar = () => {

    return (
        <Header className="header-box">
            <Image
                preview={false}
                width={50}
                src="/logoFomeda.svg"
                alt="fomeda-logo"
            />
            <Row style={{alignItems: "center"}}>
                <Button type="text" className="nav-button">Home</Button>
                <Button type="text" className="nav-button">Announcement</Button>
                <Button type="text" className="nav-button">Product</Button>
                <Divider className="divider" type="vertical"/>
                <Dropdown menu={{items: MANAGEMENT_DROPDOWN_LIST}}>
                    <Button type="text" className="nav-button" icon={<DownOutlined/>} iconPosition="end">
                        Management
                    </Button>
                </Dropdown>
                <Row>
                    <Avatar icon={<UserOutlined/>} className="nav-avatar"/>
                    <Dropdown menu={{items: PROFILE_DROPDOWN_LIST}}>
                        <Button type="text" className="nav-button" icon={<DownOutlined/>} iconPosition="end">
                            John Doe
                        </Button>
                    </Dropdown>
                </Row>
            </Row>
        </Header>
    );
};

export default NavigationBar;
