import React from 'react';
import NavigationBar from '@/components/navigationBar/NavigationBar';
import {Layout} from "antd";

const PageLayout = ({ }) => {
    return (
        <Layout>
            <NavigationBar />
            <main>THIS IS ANNOUNCEMENTS PAGE</main>
        </Layout>
    );
};

export default PageLayout;
