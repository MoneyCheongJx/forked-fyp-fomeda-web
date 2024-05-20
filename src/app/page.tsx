import React from 'react';
import NavigationBar from '@/components/navigationBar/NavigationBar';
import {Layout} from "antd";

const PageLayout = ({ children }) => {
    return (
        <Layout>
            <NavigationBar />
            <main>{children}</main>
        </Layout>
    );
};

export default PageLayout;
