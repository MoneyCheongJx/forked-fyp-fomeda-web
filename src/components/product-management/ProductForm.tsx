"use client";

import {
    Button,
    Card,
    Col,
    Form,
    GetProp,
    Image,
    Input,
    Layout, Modal, QRCode, Rate,
    Row,
    Select,
    Spin,
    Tag,
    Upload,
    UploadProps
} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import "../../styles/product.component.css";
import {CloseOutlined, DeleteOutlined, EditOutlined, InboxOutlined, PictureOutlined,} from "@ant-design/icons";
import CategoryService from "@/services/category.service";
import {CategoryConstant} from "@/constants/category.constant";
import ProductService from "@/services/product.service";
import {useRouter} from "next/navigation";
import {ProductConstant} from "@/constants/product.constant";
import {RegexConstant} from "@/constants/regex.constant";
import {StringUtils} from "@/utils/string.utils";
import MessageService from "@/services/message.service";
import NotificationService from "@/services/notification.service";
import ProductConfirmationContent from "@/components/common/ProductConfirmationContent";

class ProductFormProps {
    type?: "add" | "view";
    productId?: string;
    verificationId?: string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("File reading failed"));
    })

const regexMapping: any = {
    [ProductConstant.ALPHABET]: RegexConstant.REGEX_ALPHABET,
    [ProductConstant.NUMERIC]: RegexConstant.REGEX_NUMERIC,
}

const ProductForm = ({type, productId, verificationId}: ProductFormProps) => {
    const router = useRouter();

    const isView = type === "view";
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [specificationFields, setSpecificationFields] = useState<any[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
    const [subcategoryOptions, setSubcategoryOptions] = useState<any[]>([]);
    const [filteredSubcatOptions, setFilteredSubcatOptions] = useState<any[]>([]);
    const [subcatId, setSubcatId] = useState("");
    const [productData, setProductData] = useState<any>({});
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingCategory, setLoadingCategory] = useState(false);

    useEffect(() => {
        const fetchSpecificationField = async () => {
            try {
                setLoading(true);
                const response = await CategoryService.findActiveSubcategorySpecificationByCatId(subcatId)
                if (response) {
                    setSpecificationFields(response);
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        if (subcatId !== "") {
            fetchSpecificationField().then(() => setLoading(false));
        }
    }, [subcatId]);

    const fetchAllCategoryAndSubcategory = async () => {
        try {
            setLoadingCategory(true);
            const response = await CategoryService.findAllActiveCategories();
            if (response) {
                let allSubcatOptions: any[] = [];
                const catOptions = response.map((cat: any) => {
                    const subcatOptions = cat.children?.map((subcat: any) => ({
                        label: subcat.subcat_name,
                        value: subcat._id,
                        cat_id: cat._id,
                    }));
                    if (subcatOptions) allSubcatOptions.push(...subcatOptions);
                    return {
                        label: cat.cat_name,
                        value: cat._id,
                    }
                })
                setCategoryOptions(catOptions);
                setSubcategoryOptions(allSubcatOptions)
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    useEffect(() => {
        if (!isView) {
            fetchAllCategoryAndSubcategory().then(() => setLoadingCategory(false));
        }
    }, [isView, type]);

    const fetchProductByProductId = useCallback(async () => {
        try {
            setLoading(true)
            let response;
            if (productId) {
                response = await ProductService.getProductDetailsById(productId)
            } else {
                response = await ProductService.getProductVerificationDetailsById(verificationId!);
            }

            if (response) {
                setProductData(response)
                setSubcatId(response.subcat_id!);
                setImageUrl(response.product_img?.file.preview);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }, [productId, verificationId]);
    useEffect(() => {
        if (productId || verificationId) {
            fetchProductByProductId().then(() => setLoading(false))
        }
    }, [fetchProductByProductId, productId, verificationId]);

    const onCategoryChange = (value: any) => {
        form.setFieldValue("cat_id", undefined);
        form.setFieldValue("subcat_id", undefined);
        setSubcatId("")
        setFilteredSubcatOptions(subcategoryOptions.filter(subcat => subcat.cat_id === value));
    }

    const handleUpload: UploadProps['onChange'] = (info: any) => {
        const {file} = info;
        if (!file.url && !file.preview) {
            getBase64(file as FileType).then((preview: any) => {
                file.preview = preview;
                setImageUrl(preview);
            })
        } else setImageUrl(file.preview);
    };

    const handleRemoveImage = (e: any) => {
        e.stopPropagation();
        setImageUrl(null);
        form.setFieldValue("product_img", null);
    };

    const onCancelProduct = () => {
        if (isEdit) {
            setIsEdit(false);
            setImageUrl(productData.product_img?.file.preview);
            form.resetFields();
        } else {
            router.back();
        }
    }

    const handleConfirmationModelOpen = async () => {
        try {
            await form.validateFields();
            Modal.confirm({
                title: <h3>Confirmation</h3>,
                content: <ProductConfirmationContent action={isView? "update" : "submit"} record={{product_name: form.getFieldValue("product_name") || productData.product_name}} details={isView? "product application" : "product"}/>,
                className: "confirmation-modal",
                centered: true,
                width: "35%",
                okText: "Confirm",
                onOk: () => onSubmitProduct(),
            });
        } catch (error) {
            MessageService.error("Please fill in all required fields")
            throw error;
        }
    };


    const onSubmitProduct = async () => {
        try {
            const productValues = form.getFieldsValue();
            const specValues = productValues.specification;

            const payload = {
                ...productData,
                ...(!isView ? productValues : {}),
                pro_id: productId ?? undefined,
                status: ProductConstant.PENDING,
                product_img: productValues.product_img ?? productData.product_img,
                verification_id: verificationId,
                specification: Object.values(specValues),
            }

            setLoading(true)
            await ProductService.createProductVerification(payload);
            if (isEdit && productData.status === ProductConstant.PENDING) {
                setIsEdit(false);
                fetchProductByProductId().then(() => setLoading(false));
            } else {
                setLoading(false)
                router.back();
            }
            isEdit ?
                NotificationService.success("Update Product", `${productData.product_name} updated successfully`) :
                NotificationService.success("Create Product", `Application of ${productValues.product_name} submitted successfully.`);
        } catch (error) {
            setLoading(false)
            isEdit ?
                NotificationService.error("Update Product", `${productData.product_name} failed to update.`) :
                NotificationService.error("Create Product", `Application of ${productData.product_name} failed to submit.`);
            throw error;
        }
    }

    const getSpecificationValue = (specId: string, prefix?: string, suffix?: string) => {
        if (!isView) return "";
        const spec = productData.specification?.find((spec: any) => spec.spec_id === specId);
        if (!isEdit) {
            return (spec?.spec_desc !== undefined && spec.spec_desc !== "") ? [prefix, spec.spec_desc, suffix].join(" ").trim() : "-";
        }

        return spec?.spec_desc || "";
    };

    const renderSpecificationForm = (specifications: any, catType: string) => {
        return (
            <Form.List name="specification">
                {() => specifications
                    .filter((spec: any) => spec.cat_type === catType)
                    .map((spec: any) => (
                        <div key={spec._id}>
                            <Form.Item name={[spec._id, 'spec_id']} hidden initialValue={spec._id}/>
                            <Form.Item label={<h5>{spec.subcat_spec_name}</h5>}
                                       labelAlign={"left"}
                                       labelCol={{span: 12}}
                                       className={"ml-8 mb-4"}
                                       name={[spec._id, 'spec_desc']}
                                       initialValue={getSpecificationValue(spec._id)}
                                       rules={[
                                           {
                                               required: spec.is_required && (isEdit || !isView),
                                               message: `${spec.subcat_spec_name} is required`,
                                           },
                                           {
                                               pattern: regexMapping[spec.field_type],
                                               message: `Only ${StringUtils.formatLowerCase(spec.field_type)} is allowed`
                                           }]}>

                                {!spec.children && (isView && !isEdit ?
                                    <div>{getSpecificationValue(spec._id, spec.prefix, spec.suffix)}</div> :
                                    <Input prefix={spec.prefix} suffix={spec.suffix} disabled={!spec.allow_input}/>)
                                }
                            </Form.Item>

                            {spec.children && renderSubspecificationsForm(spec.children, spec._id)}
                        </div>
                    ))}
            </Form.List>
        );
    }

    const getSubspecificationValue = (parentId: string, subspecId: string, prefix?: string, suffix?: string) => {
        if (!isView) return "";
        const subspec = productData.specification?.find((spec: any) => spec.spec_id === parentId)?.subspecification
            ?.find((subspec: any) => subspec.subspec_id === subspecId);
        if (!isEdit) {
            return (subspec?.subspec_desc !== undefined && subspec.subspec_desc !== "") ? [prefix, subspec.subspec_desc, suffix].join(" ").trim() : "-";
        }

        return subspec?.subspec_desc || "";
    };

    const renderSubspecificationsForm = (subspecifications: any[], parentIndex: string) => {
        return (
            <Form.List name={[parentIndex, 'subspecification']}>
                {() => subspecifications?.map((subspec: any, subIndex: any) => (
                    <div key={subspec._id}>
                        <Form.Item name={[subIndex, 'subspec_id']} hidden initialValue={subspec._id}/>
                        <Form.Item label={<h5>{subspec.subcat_subspec_name}</h5>}
                                   labelAlign={"left"}
                                   labelCol={{span: 12}}
                                   className={"ml-16 mb-4"}
                                   name={[subIndex, 'subspec_desc']}
                                   initialValue={getSubspecificationValue(parentIndex, subspec._id)}
                                   rules={[
                                       {
                                           required: subspec.is_required && (isEdit || !isView),
                                           message: `${subspec.subcat_subspec_name} is required`,
                                       },
                                       {
                                           pattern: regexMapping[subspec.field_type],
                                           message: `Only ${StringUtils.formatLowerCase(subspec.field_type)} is allowed`
                                       }
                                   ]}>
                            {isView && !isEdit ?
                                <div>{getSubspecificationValue(parentIndex, subspec._id, subspec.prefix, subspec.suffix)}</div> :
                                <Input prefix={subspec.prefix} suffix={subspec.suffix}/>}
                        </Form.Item>
                    </div>
                ))}
            </Form.List>
        )
    }

    const renderStatus = (status: string) => {
        switch (status) {
            case ProductConstant.APPROVED: {
                return <Tag color={'green'} bordered={false}
                            className="px-3 py-0.5 rounded-xl self-center">Approved</Tag>
            }
            case ProductConstant.PENDING: {
                return <Tag color={'yellow'} bordered={false}
                            className="px-3 py-0.5 rounded-xl self-center">Pending</Tag>
            }
            case ProductConstant.REJECTED: {
                return <Tag color={'red'} bordered={false} className="px-3 py-0.5 rounded-xl self-center">Rejected</Tag>
            }
        }
    };

    const renderDisplayInput = (value: string, alt: any) => {
        return isView ? <div>{value}</div> : alt
    }

    return (
        <Form form={form} className={"w-full"}>
            <Row>
                <Col span={12}>
                    <Row justify={"center"}>
                        <Form.Item name="product_img" key={"product_img"} className={"mt-8"}>
                            {(!isEdit && isView) ?
                                <Layout className={"max-w-96 bg-gray-300"}>
                                    {productData.product_img?.file.preview ?
                                        <Image src={productData.product_img?.file?.preview} alt="product_img"
                                               className={"max-h-96 object-cover"}/> :
                                        <PictureOutlined className={"text-5xl py-44 justify-center text-gray-500"}/>
                                    }
                                </Layout> :
                                <Upload.Dragger
                                    accept="image/*"
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    onChange={handleUpload}
                                    className={"product-drag"}
                                    maxCount={1}
                                    multiple={false}
                                >
                                    {imageUrl ? (
                                        <Layout className={"w-full"}>
                                            <Image src={imageUrl} alt="product_img" className={"max-h-96 object-cover"}
                                                   preview={false}/>
                                            <Button
                                                shape="circle"
                                                icon={<DeleteOutlined/>}
                                                onClick={handleRemoveImage}
                                                className={"float-end absolute top-2 right-2"}
                                            />
                                        </Layout>
                                    ) : (
                                        <div className={"py-32"}>
                                            <InboxOutlined className={"text-5xl"}/>
                                            <div className={"mt-4"}>Click or drag image file to this area to upload
                                            </div>
                                        </div>
                                    )}
                                </Upload.Dragger>
                            }
                        </Form.Item>
                    </Row>
                </Col>
                <Col span={12} className={"mb-12"}>
                    <Spin spinning={loading}>
                        <Card bordered={false}>
                            {isView &&
                                <Row>
                                    <Row hidden={!verificationId}>
                                        <h5 className={"self-center mr-4"}>Status:</h5>
                                        {renderStatus(productData.status)}
                                    </Row>
                                    <Button type={"primary"} icon={<EditOutlined/>}
                                            className={"ml-auto flex items-center"}
                                            disabled={isEdit} onClick={() => {
                                        setIsEdit(true);
                                        form.resetFields();
                                    }}>Edit Product</Button>
                                </Row>
                            }
                            <h5 className={"my-3.5"}>General Information</h5>
                            <Form.Item label={<h5>Product Name</h5>}
                                       labelAlign={"left"}
                                       labelCol={{span: 12}}
                                       className={"ml-8 mb-4"}
                                       name='product_name'
                                       rules={[{
                                           required: !isEdit && !isView,
                                           message: `Product Name is required`,
                                       },]}>
                                {renderDisplayInput(productData.product_name, <Input/>)}
                            </Form.Item>
                            <Form.Item label={<h5>Model No.</h5>}
                                       labelAlign={"left"}
                                       labelCol={{span: 12}}
                                       className={"ml-8 mb-4"}
                                       name='model_no'
                                       rules={[{
                                           required: !isEdit && !isView,
                                           message: `Model No. is required`,
                                       },]}>
                                {renderDisplayInput(productData.model_no, <Input/>)}
                            </Form.Item>
                            <Form.Item label={<h5>QR Code</h5>}
                                       labelAlign={"left"}
                                       labelCol={{span: 12}}
                                       className={"ml-8 mb-4"}
                                       hidden={!isView || productData.status === ProductConstant.PENDING || productData.status === ProductConstant.REJECTED}>
                                <QRCode value={productId ?? productData.pro_id}/>
                            </Form.Item>
                            <Form.Item label={<h5>Rating</h5>}
                                       labelAlign={"left"}
                                       labelCol={{span: 12}}
                                       className={"ml-8 mb-4"}
                                       hidden={!isView || productData.status === ProductConstant.PENDING}>
                                <Rate value={productData.rating} disabled/>
                            </Form.Item>
                            <Form.Item label={<h5>Category</h5>}
                                       labelAlign={"left"}
                                       labelCol={{span: 12}}
                                       className={"ml-8 mb-4"}
                                       name='category'
                                       rules={[{
                                           required: !isEdit && !isView,
                                           message: `Category is required`,
                                       },]}>
                                {renderDisplayInput(
                                    productData.cat_name,
                                    <Select options={categoryOptions}
                                            onChange={(value) => onCategoryChange(value)}
                                            defaultActiveFirstOption={true}
                                            allowClear={true}
                                            removeIcon={<CloseOutlined/>}
                                            loading={loadingCategory}/>)
                                }
                            </Form.Item>
                            <Form.Item label={<h5>Subcategory</h5>}
                                       labelAlign={"left"}
                                       labelCol={{span: 12}}
                                       className={"ml-8 mb-4"}
                                       name='subcat_id'
                                       rules={[{
                                           required: !isEdit && !isView,
                                           message: `Subcategory is required`,
                                       },]}>
                                {renderDisplayInput(
                                    productData.subcat_name,
                                    <Select options={filteredSubcatOptions}
                                            disabled={filteredSubcatOptions.length === 0}
                                            defaultValue={filteredSubcatOptions.length > 0 ? undefined : filteredSubcatOptions[0]?.value}
                                            onChange={(value) => setSubcatId(value ?? "")}
                                            allowClear={true}
                                            removeIcon={<CloseOutlined/>}
                                            loading={loadingCategory}/>
                                )}
                            </Form.Item>

                            {subcatId !== "" && !loading && <>
                                {renderSpecificationForm(specificationFields, CategoryConstant.INFORMATION)}
                                <h5 className={"mb-3.5 mt-8"}>Certification</h5>
                                {renderSpecificationForm(specificationFields, CategoryConstant.CERTIFICATION)}
                                <h5 className={"mb-3.5 mt-8"}>Warranty</h5>
                                {renderSpecificationForm(specificationFields, CategoryConstant.WARRANTY)}
                                <h5 className={"mb-3.5 mt-8"}>Specification</h5>
                                {renderSpecificationForm(specificationFields, CategoryConstant.SPECIFICATION)}
                            </>
                            }

                            <Form.Item name="status" hidden/>
                            {(!isView || isEdit) &&
                                <Row className={"justify-end mt-16"}>
                                    <Button type={"default"} size={"large"} className={"m-2"}
                                            onClick={onCancelProduct}>Cancel</Button>
                                    <Button type={"primary"} size={"large"} className={"m-2"} onClick={handleConfirmationModelOpen}
                                            disabled={subcatId === "" || loading}>{isEdit ? "Save" : "Add Product"}</Button>
                                </Row>
                            }
                        </Card>
                    </Spin>
                </Col>
            </Row>
        </Form>
    );
};

export default ProductForm;
