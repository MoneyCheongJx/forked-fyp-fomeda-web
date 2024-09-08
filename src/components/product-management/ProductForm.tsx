"use client";

import {Button, Card, Col, Form, GetProp, Image, Input, Layout, Row, Select, Upload, UploadProps} from "antd";
import {useEffect, useState} from "react";
import "../../styles/product.component.css";
import {
    DeleteOutlined,
    EditOutlined,
    InboxOutlined,
    PictureOutlined,
} from "@ant-design/icons";
import CategoryService from "@/services/category.service";
import {CategoryConstant} from "@/constants/category.constant";
import ProductService from "@/services/product.service";
import {useRouter} from "next/navigation";
import {ProductConstant} from "@/constants/product.constant";

class ProductFormProps {
    type?: "add" | "view";
    productId?: string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("File reading failed"));
    })

const ProductForm = ({type, productId}: ProductFormProps) => {
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

    const fetchSpecificationField = async () => {
        try {
            const response = await CategoryService.getProductSpecificationBySubcatId(subcatId)
            if (response) {
                setSpecificationFields(response);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    useEffect(() => {

        if (subcatId !== "") {
            fetchSpecificationField().then();
        }
    }, [subcatId]);

    const fetchAllCategoryAndSubcategory = async () => {
        try {
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
            fetchAllCategoryAndSubcategory().then();
        }
    }, [type]);

    const fetchProductByProductId = async () => {
        try {
            const response = await ProductService.getProductById(productId!)
            if (response) {
                setProductData(response)
                setSubcatId(response.subcat_id!);
                setImageUrl(response.product_img?.file.preview);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    useEffect(() => {
        if (productId) {
            fetchProductByProductId().then()
        }
    }, [productId]);

    const onCategoryChange = (value: any) => {
        form.setFieldValue("cat_id", undefined);
        setSubcatId("")
        setFilteredSubcatOptions(subcategoryOptions.filter(subcat => subcat.cat_id === value));
    }

    const handleUpload: UploadProps['onChange'] = async (info: any) => {
        const {file} = info;
        if (!file.url && !file.preview) file.preview = await getBase64(file as FileType)
        setImageUrl(file.preview);
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

    const getUpdatedFields = (currentSpecs: any[], originalSpecs: any[]) => {
        return Object.values(currentSpecs).filter((currentSpec) => {
            const originalSpec = originalSpecs.find((spec: any) => spec.spec_id === currentSpec.spec_id);
            if (!originalSpec) return true;

            const isSpecChanged = currentSpec.spec_desc !== originalSpec.spec_desc;
            const areSubspecsChanged = currentSpec.subspecification?.some((subspec: any, index: number) => {
                const originalSubspec = originalSpec.subspecification?.[index];
                return originalSubspec?.subspec_desc !== subspec.subspec_desc;
            });

            return isSpecChanged || areSubspecsChanged;
        });
    };

    const onSubmitProduct = async () => {
        form.setFieldValue("status", ProductConstant.PENDING);
        try {
            const productValues = form.getFieldsValue();
            const updateSpec = getUpdatedFields(productValues.specification, productData.specification);

            const payload = {
                ...productValues,
                specification: updateSpec,
            }

            console.log(payload)
            if (isEdit) {
                const res = await ProductService.updateProductById(productId!, payload);
                if (res) {
                    setIsEdit(false);
                    fetchProductByProductId().then();
                }
            } else {
                await ProductService.createProduct(productValues);
                router.back();
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const getSpecificationValue = (specId: string, prefix?: string, suffix?: string) => {
        if (!isView) return "";
        const spec = productData.specification?.find((spec: any) => spec.spec_id === specId);
        return (spec?.spec_desc !== undefined && spec.spec_desc !== "") ? prefix + " " + spec.spec_desc + " " + suffix : "-";
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
                                       rules={[{
                                           required: spec.is_required,
                                           message: `${spec.subcat_spec_name} is required`,
                                       },]}>

                                {!spec.subspecification && (isView && !isEdit ?
                                    <div>{getSpecificationValue(spec._id, spec.prefix, spec.suffix)}</div> :
                                    <Input prefix={spec.prefix} suffix={spec.suffix}/>)
                                }
                            </Form.Item>

                            {spec.subspecification && renderSubspecificationsForm(spec.subspecification, spec._id)}
                        </div>
                    ))}
            </Form.List>
        );
    }

    const getSubspecificationValue = (parentId: string, subspecId: string, prefix?: string, suffix?: string) => {
        if (!isView) return "";
        const subspec = productData.specification?.find((spec: any) => spec.spec_id === parentId)?.subspecification
            ?.find((subspec: any) => subspec.subspec_id === subspecId);
        return (subspec?.subspec_desc !== undefined && subspec.subspec_desc !== "") ? prefix + " " + subspec.subspec_desc + " " + suffix : "-";
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
                                   rules={[{
                                       required: subspec.is_required,
                                       message: `${subspec.subcat_subspec_name} is required`,
                                   },]}>
                            {isView && !isEdit ?
                                <div>{getSubspecificationValue(parentIndex, subspec._id, subspec.prefix, subspec.suffix)}</div> :
                                <Input prefix={subspec.prefix} suffix={subspec.suffix}/>}
                        </Form.Item>
                    </div>
                ))}
            </Form.List>
        )
    }

    return (
        <Form form={form} className={"w-full"}>
            <Row>
                <Col span={12} align={"middle"}>
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
                                        <div className={"mt-4"}>Click or drag image file to this area to upload</div>
                                    </div>
                                )}
                            </Upload.Dragger>
                        }
                    </Form.Item>
                </Col>
                <Col span={12} className={"mb-12"}>
                    <Card bordered={false}>
                        <Button type={"primary"} icon={<EditOutlined/>} className={"ml-auto flex items-center"}
                                disabled={isEdit} onClick={() => setIsEdit(true)}>Edit Product</Button>
                        <h5 className={"my-3.5"}>General Information</h5>
                        <Form.Item label={<h5>Product Name</h5>}
                                   labelAlign={"left"}
                                   labelCol={{span: 12}}
                                   className={"ml-8 mb-4"}
                                   name='product_name'
                                   rules={[{
                                       required: true,
                                       message: `Product Name is required`,
                                   },]}>
                            {isView ? <div>{productData.product_name}</div> : <Input/>}
                        </Form.Item>
                        <Form.Item label={<h5>Model No.</h5>}
                                   labelAlign={"left"}
                                   labelCol={{span: 12}}
                                   className={"ml-8 mb-4"}
                                   name='model_no'
                                   rules={[{
                                       required: true,
                                       message: `Model No. is required`,
                                   },]}>
                            {isView ? <div>{productData.model_no}</div> : <Input/>}
                        </Form.Item>
                        <Form.Item label={<h5>Category</h5>}
                                   labelAlign={"left"}
                                   labelCol={{span: 12}}
                                   className={"ml-8 mb-4"}
                                   name='category'
                                   rules={[{
                                       required: true,
                                       message: `Category is required`,
                                   },]}>
                            {isView ?
                                <div>{productData.cat_name}</div> :
                                <Select options={categoryOptions} onChange={(value) => onCategoryChange(value)}
                                        defaultActiveFirstOption={true}/>
                            }
                        </Form.Item>
                        <Form.Item label={<h5>Subcategory</h5>}
                                   labelAlign={"left"}
                                   labelCol={{span: 12}}
                                   className={"ml-8 mb-4"}
                                   name='subcat_id'
                                   rules={[{
                                       required: true,
                                       message: `Subcategory is required`,
                                   },]}>
                            {isView ?
                                <div>{productData.subcat_name}</div> :
                                <Select options={filteredSubcatOptions}
                                        defaultValue={filteredSubcatOptions.length > 0 ? undefined : filteredSubcatOptions[0]?.value}
                                        onChange={(value) => setSubcatId(value)}/>
                            }
                        </Form.Item>

                        {subcatId !== "" && <>
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
                                <Button type={"primary"} size={"large"} className={"m-2"} onClick={onSubmitProduct}
                                        disabled={subcatId === ""}>{isEdit ? "Save" : "AddProduct"}</Button>
                            </Row>
                        }
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

export default ProductForm;
