"use client"

import React, {useCallback, useEffect, useRef, useState} from "react";
import PageLayout from '@/app/page';
import {Affix, Button, Card, Col, Empty, Form, Input, Row, Select, Spin} from "antd";
import {DeleteOutlined, InfoCircleOutlined, SearchOutlined} from "@ant-design/icons";
import CategoryService from "@/services/category.service";
import ProductFilterCard from "@/components/product/ProductFilterCard";
import ProductTile from "@/components/product/ProductTile";
import ProductService from "@/services/product.service";
import MessageService from "@/services/message.service";
import ProductCompareModel from "@/components/product/ProductCompareModel";

const ProductPage = () => {
    const [form] = Form.useForm();
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    const [subcategoryMap, setSubcategoryMap] = useState<{ [key: string]: any[] }>({});
    const [subcategoryOptions, setSubcategoryOptions] = useState<any[]>([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [filterModel, setFilterModel] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [productList, setProductList] = useState<any>([]);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [skip, setSkip] = useState(0);
    const [compareList, setCompareList] = useState<any[]>([]);
    const [compareData, setCompareData] = useState<any[]>([]);
    const [isCompareModelOpen, setIsCompareModelOpen] = useState(false);
    const [isComparing, setIsComparing] = useState(false);
    const limit = 20;

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const savedCatId = urlParams.get("cat_id");
        const savedSubcatId = urlParams.get("subcat_id");

        if (savedCatId) {
            if (subcategoryMap[savedCatId]) {
                setSubcategoryOptions(subcategoryMap[savedCatId]);
            } else {
                setSubcategoryOptions([]);
            }

            form.setFieldsValue({ cat_id: savedCatId });
            setFilterModel((prev: any) => ({ ...prev, cat_id: savedCatId }));
        }
        if(savedSubcatId) {
            form.setFieldsValue({ subcat_id: savedSubcatId });
            setFilterModel((prev: any) => ({ ...prev, subcat_id: savedSubcatId }));
            setSelectedSubcategory(savedSubcatId);
        }

    }, [form, subcategoryMap]);

    useEffect(() => {
        const handlePopState = (event: any) => {
            const savedState = event.state?.filterModel;
            if(savedState){
                setFilterModel(savedState);
                form.setFieldsValue(savedState);
                if (savedState.cat_id) setSubcategoryOptions(subcategoryMap[savedState.cat_id] || []);
                if (savedState.subcat_id) setSelectedSubcategory(savedState.subcat_id);
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [form, subcategoryMap]);

    const handleSelectedCategory = (value: any) => {
        form.setFieldsValue({subcat_id: null});
        setSelectedSubcategory(null);

        const updatedFilterModel = { ...filterModel, cat_id: value, subcat_id: null };
        setFilterModel(updatedFilterModel);
        form.setFieldsValue(updatedFilterModel);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("cat_id", value);
        newUrl.searchParams.delete("subcat_id");
        window.history.pushState({ filterModel: updatedFilterModel }, "", newUrl.toString());

        if (subcategoryMap[value]) {
            setSubcategoryOptions(subcategoryMap[value]);
        } else {
            setSubcategoryOptions([]);
        }
    }

    const handleSelectedSubcategory = (value: any) => {
        setSelectedSubcategory(value);

        const updatedFilterModel = { ...filterModel, subcat_id: value };
        setFilterModel(updatedFilterModel);
        form.setFieldsValue(updatedFilterModel);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("subcat_id", value);
        window.history.pushState({ filterModel: updatedFilterModel }, "", newUrl.toString());
    }

    const handleClearCategory = () => {
        setSubcategoryOptions([]);
        setSelectedSubcategory(null);
        setProductList([]);
        setCompareList([]);
        filterModel.specification= [];
        filterModel.subspecification= [];
        setSkip(0);
        form.setFieldsValue({subcat_id: null});
    };

    const handleClearSubcategory = () => {
        setSelectedSubcategory(null);
        setProductList([]);
        setCompareList([]);
        filterModel.specification= [];
        filterModel.subspecification= [];
        setSkip(0);
    };

    const fetchAllCategoryAndSubcategory = async () => {
        try {
            setLoading(true);
            const response = await CategoryService.findAllActiveCategories();
            if (response) {
                const catOptions = response.map((cat: any) => {
                    return {
                        label: cat.cat_name,
                        value: cat._id,
                    }
                })

                const subcatMap: { [key: string]: any[] } = {};
                response.forEach((cat: any) => {
                    if (cat.children?.length) {
                        subcatMap[cat._id] = cat.children.map((subcat: any) => ({
                            label: subcat.subcat_name,
                            value: subcat._id,
                        }));
                    }
                });

                setCategoryOptions(catOptions);
                setSubcategoryMap(subcatMap);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    useEffect(() => {
        fetchAllCategoryAndSubcategory().then(() => setLoading(false));
    }, []);

    const handleFilterChange = (newFilterModel: any) => {
        setFilterModel((prevFilterModel: any) => ({
            ...prevFilterModel,
            ...newFilterModel
        }));
        form.setFieldsValue({...newFilterModel});
    };

    const handleFormValuesChange = (changedValues: any, allValues: any) => {
        const {search} = allValues;
        setFilterModel({
            ...filterModel,
            search,
        });
    };

    const fetchProductList = useCallback(async (currSkip: number, append: boolean = false) => {
        try {
            if(!append) {
                setLoading(true);
            }

            if(filterModel.search) {
                filterModel.search = filterModel.search.trim();
            }
            const response = await ProductService.getConsumerProductByFilter(filterModel, currSkip, limit);
            if (response) {
                const {products, total} = response;
                if (append) {
                    setProductList((prevList: any) => [...prevList, ...products]);
                } else {
                    setProductList(products);
                }
                setTotalProducts(total);
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [filterModel]);

    const debouncedFetchProductList = useCallback(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            setSkip(0);
            fetchProductList(0).then();
        }, 500);
    }, [fetchProductList]);

    useEffect(() => {
        if (filterModel && selectedSubcategory) {
            debouncedFetchProductList();
        }
    }, [filterModel, debouncedFetchProductList, selectedSubcategory]);

    const handleLoadMore = async () => {
        setSkip((prevSkip) => prevSkip + limit);
        await fetchProductList(skip + limit, true);
    };

    const handleCompareChange = (product: any, isChecked: boolean) => {
        if (isChecked) {
            if (compareList.length >= 3) {
                return MessageService.error("Maximum compare item reached");
            }
            setCompareList((prevList) => [...prevList, product]);
        } else {
            setCompareList((prevList) => prevList.filter((item) => item._id !== product._id));
        }
    };

    const handleCompareProduct = async () => {
        if (compareList.length <= 1) {
            return MessageService.error("Please select at least 2 item to compare");
        }
        try {
            setIsComparing(true);
            const compareItemId = compareList.map((item: any) => item._id);
            const response = await ProductService.getConsumerComparedProduct(selectedSubcategory!, compareItemId);
            if (response) {
                setCompareData(response)
                setIsCompareModelOpen(true)
            }
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsComparing(false);
        }

    }

    return (
        <PageLayout title="Product">
            <Form form={form} onValuesChange={handleFormValuesChange}>
                <Row className="flex space-x-3">
                    <Form.Item name="search" className={"w-1/3 m-0"}>
                        <Spin spinning={loading}>
                            <Input prefix={<SearchOutlined/>} placeholder="Product Name / Model Number"
                                   size={"large"}/>
                        </Spin>
                    </Form.Item>
                    <Form.Item name="cat_id" className={"w-1/6 m-0"}>
                        <Select placeholder="Category"
                                options={categoryOptions}
                                onChange={handleSelectedCategory}
                                onClear={handleClearCategory}
                                size={"large"}
                                loading={loading}
                                allowClear
                        />
                    </Form.Item>
                    <Form.Item name="subcat_id" className={"w-1/6 m-0"}>
                        <Select placeholder="Subcategory"
                                options={subcategoryOptions}
                                onChange={handleSelectedSubcategory}
                                onClear={handleClearSubcategory}
                                size={"large"}
                                loading={loading}
                                disabled={subcategoryOptions.length === 0}
                                allowClear
                        />
                    </Form.Item>
                </Row>
                {selectedSubcategory ?
                    <Row className={"mt-4 w-full"}>
                        <Col xs={24} sm={24} lg={6} className={"mb-8"}>
                            <Spin spinning={loading}>
                                <ProductFilterCard subcatId={selectedSubcategory} onFilterChange={handleFilterChange}
                                                   total={totalProducts}/>
                            </Spin>
                        </Col>
                        <Col xs={24} sm={24} lg={18}>
                            <Spin spinning={loading}>
                                <Row className={"mb-6 w-full"}>
                                    {productList.map((productData: any) => (
                                        <div key={productData._id} className={"mb-4 ml-8"}>
                                            <ProductTile productData={productData}
                                                         onCompareChange={handleCompareChange}
                                                         isChecked={compareList.some((item: any) => item._id === productData._id)}/>
                                        </div>
                                    ))}
                                </Row>
                            </Spin>
                            {productList.length < totalProducts && (
                                <Button size={"large"} block className={"mb-6 w-full"} onClick={handleLoadMore}
                                        loading={loading}>
                                    Load More...
                                </Button>
                            )}
                            {productList.length === 0 && (
                                <Empty />
                            )}
                            {compareList.length > 0 && (
                                <Affix offsetBottom={0}>
                                    <Card className={"w-full rounded-b-none"}>
                                        <Row className={"items-center"}>
                                            <Col span={20}>
                                                <Row justify={"center"} className={"space-x-4"}>
                                                    {compareList.map((productData: any) => (
                                                        <Card key={productData._id} className={"w-60"}>
                                                            <Row className={"items-center justify-between"}>
                                                                <div
                                                                    className={"truncate w-4/5"}>{productData.product_name}</div>
                                                                <Button type={"text"}
                                                                        icon={<DeleteOutlined/>}
                                                                        shape={"circle"}
                                                                        onClick={() => setCompareList((prevList) => prevList.filter((item) => item._id !== productData._id))}
                                                                />
                                                            </Row>
                                                        </Card>
                                                    ))}
                                                </Row>
                                            </Col>
                                            <Col span={4}>
                                                <Row justify={"end"} className={"w-full"}>
                                                    <Button type={"primary"} size={"large"}
                                                            onClick={handleCompareProduct}
                                                            loading={isComparing}>Compare</Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Affix>
                            )}
                        </Col>
                    </Row> :
                    <div className={"italic text-yellow-500"}><InfoCircleOutlined /> Please Select Category and Subcategory</div>
                }
            </Form>
            {isCompareModelOpen && (
                <ProductCompareModel compareData={compareData} onOpen={isCompareModelOpen}
                                     onClose={() => setIsCompareModelOpen(false)}/>
            )}
        </PageLayout>
    );
};

export default ProductPage;