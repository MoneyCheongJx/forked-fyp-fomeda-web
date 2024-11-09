"use client"

import {Card, Carousel, Timeline, Typography} from "antd";
import PageLayout from "../page";
import {useEffect, useState} from "react";
import {useRouter} from 'next/navigation';
import ContentService from "@/services/content.service";
import "@/styles/content.component.css"
import {DateTimeUtils} from "@/utils/date-time.utils";
import Image from 'next/image';

const {Paragraph, Text} = Typography;

const HomePage = () => {
    const [carouselData, setCarouselData] = useState<any[]>([]);
    const [contentData, setContentData] = useState<any[]>([]);
    const [historyData, setHistoryData] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchCarouselData();
        fetchContentData();
        fetchHistoryData();
    }, [router]);

    const fetchCarouselData = async () => {
        try {
            const response = await ContentService.getVisibleCarousels();
            setCarouselData(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchContentData = async () => {
        try {
            const response = await ContentService.getVisibleContent();
            setContentData(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchHistoryData = async () => {
        try {
            const response = await ContentService.getVisibleHistoryTimeline();
            setHistoryData(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <PageLayout title={"About us"}>
            <Carousel autoplay={true} dots className="mb-8 carousal">
                {carouselData.map((image, index) => (
                    <div key={index}>
                        <Image
                            src={image?.image?.base64}
                            alt={`Slide ${index + 1}`}
                            layout="responsive"
                            width={1920}
                            height={1080}
                            objectFit="cover"
                            priority
                        />
                    </div>
                ))}
            </Carousel>
            {contentData.map((content, index) => (
                <Card title={content?.title} key={index} className="mb-8">
                    <p>{content?.description}</p>
                </Card>
            ))}
            <Timeline
                mode="left"
                items={historyData.map(item => ({
                    label: DateTimeUtils.formatDate(item?.date),
                    children:
                        <Paragraph>
                            <Text strong>{item?.title}</Text>
                            <br/>{item?.description}
                        </Paragraph>
                }))}
            />
        </PageLayout>
    );
}

export default HomePage;
