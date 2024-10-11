"use client"

import PageLayout from "@/app/page";
import {Button, Col, Form, Input, Row, Segmented} from "antd";
import React, {useEffect, useState} from "react";
import {REPORT_MANAGEMENT_TAB} from "@/constants/report.constant";
import ReportPendingTable from "@/components/report/ReportPendingTable";
import ReportHistoryTable from "@/components/report/ReportHistoryTable";
import {SearchOutlined} from "@ant-design/icons";
import CustomSelect from "@/components/common/CustomSelect";
import CategoryService from "@/services/category.service";
import {ReportFilterModel} from "@/models/report-filter.model";

const ReportPage = () => {

    const [segmentedTab, setSegmentedTab] = useState(REPORT_MANAGEMENT_TAB[0].value)
    const [filterForm] = Form.useForm();
    const [filterData, setFilterData] = useState({});
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSegmentedChange = (value: any) => {
        setSegmentedTab(value);
        setFilterData({})
        filterForm.resetFields();
    };

    const fetchAllCategoryAndSubcategory = async () => {
        try {
            setLoading(true);
            const response = await CategoryService.findAllActiveCategories();
            if (response) {
                const catOptions = response.map((cat: any) => {
                    const subcatOptions = cat.children?.map((subcat: any) => ({
                        title: subcat.subcat_name,
                        value: subcat._id,
                        key: subcat._id,
                    }));
                    return {
                        title: cat.cat_name,
                        value: cat._id,
                        key: cat._id,
                        children: subcatOptions,
                    }
                })
                setCategoryOptions(catOptions);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    useEffect(() => {
        fetchAllCategoryAndSubcategory().then(() => setLoading(false));
    }, []);

    const handleSelectedCategory = (values: any) => {
        setSelectedCategory(values);
    }

    const handleSearch = async () => {
        setFilterData(filterForm.getFieldsValue());
    };

    const handleReset = async () => {
        filterForm.resetFields();
        setFilterData(filterForm.getFieldsValue());
    };

    return (
        <PageLayout title="Report Management">
           <Segmented options={REPORT_MANAGEMENT_TAB} onChange={handleSegmentedChange} value={segmentedTab} />
            <Row className="flex justify-between items-center space-x-3 mt-4">
                <Col flex={"auto"}>
                    <Form form={filterForm}>
                        <Row className="flex space-x-3">
                            <Form.Item<ReportFilterModel> name="search" className={"w-1/3 m-0"}>
                                <Input prefix={<SearchOutlined/>} placeholder="Product Name / Model Number"
                                       size={"large"}/>
                            </Form.Item>
                            <Form.Item<ReportFilterModel> name="subcat_ids" className={"w-1/6 m-0"}>
                                <CustomSelect placeholder="Category" options={categoryOptions} showSearch={true}
                                              optionsPlaceholder={"Search Category..."}
                                              onChange={handleSelectedCategory}
                                              values={selectedCategory}
                                              size={"large"}
                                              loading={loading}/>
                            </Form.Item>
                            <Button type="primary" onClick={handleSearch} size={"large"}>Search</Button>
                            <Button type="default" onClick={handleReset} size={"large"}>Reset</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
            {segmentedTab === "pending" && (<ReportPendingTable filterData={filterData}/>)}
            {segmentedTab === "history" && (<ReportHistoryTable filterData={filterData}/>)}
        </PageLayout>
    )
}

export default ReportPage;