import React from "react";
import {Image, Button, Dropdown, Divider, Avatar, Row} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import "../../styles/header.component.css"
import {MenuProps} from "antd/lib";
import {Header} from "antd/es/layout/layout";
import {
    HEADER_MANAGEMENT_DROPDOWN_LIST_CONSTANTS, HEADER_USER_DROPDOWN_CONSTANTS
} from "@/utils/header.constants";

const MANAGEMENT_DROPDOWN_LIST: MenuProps["items"] = HEADER_MANAGEMENT_DROPDOWN_LIST_CONSTANTS;
const PROFILE_DROPDOWN_LIST: MenuProps["items"] = HEADER_USER_DROPDOWN_CONSTANTS;

const NavigationBar = () => {

    return (
        <Header
            style={{
                position: 'fixed',
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: "white",
            }}
        >
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
                    <Button type="text" icon={<DownOutlined/>} iconPosition="end">
                        Management
                    </Button>
                </Dropdown>
                <Row>
                    <Avatar icon={<UserOutlined/>} className="nav-avatar"/>
                    <Dropdown menu={{items: PROFILE_DROPDOWN_LIST}}>
                        <Button type="text" icon={<DownOutlined/>} iconPosition="end">
                            John Doe
                        </Button>
                    </Dropdown>
                </Row>
            </Row>
        </Header>
    );
};

export default NavigationBar;
