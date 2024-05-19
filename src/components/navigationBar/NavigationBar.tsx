import React from "react";
import { Image, Button, Dropdown, Space, Divider } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import "../../styles/PrimaryButton.css"
import "../../styles/Divider.css"

import { Header } from "antd/es/layout/layout";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Product Management
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Product Category Management
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Product Verification
      </a>
    ),
  },
  {
    key: "4",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Report Management
      </a>
    ),
  },
  {
    key: "5",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Suppliers Management
      </a>
    ),
  },
  {
    key: "6",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Admins Management
      </a>
    ),
  },
  {
    key: "7",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Role Management
      </a>
    ),
  },
  {
    key: "8",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Announcement Management
      </a>
    ),
  },
  {
    key: "9",
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Content Management
      </a>
    ),
  },
];

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
      />
      <Space>
        <Button className="primary-button">Home</Button>
        <Button className="primary-button">Announcement</Button>
        <Button className="primary-button">Product</Button>
        <Divider className="divider" type="vertical" />
        <Dropdown menu={{ items }} arrow>
          <Button className="primary-button" icon={<DownOutlined />} iconPosition="end">
            Management
          </Button>
        </Dropdown>
        <Dropdown menu={{ items }}>
          <Space>
            <UserOutlined />
            Name
            <DownOutlined />
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default NavigationBar;
