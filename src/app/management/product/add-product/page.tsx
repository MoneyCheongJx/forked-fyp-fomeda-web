import PageLayout from "@/app/page";
import ProductForm from "@/components/product-management/ProductForm";

const AddProductPage = () => {
    return (
        <PageLayout title="Add Product" isRoot={false}>
            <ProductForm type={"add"}/>
        </PageLayout>
    )
}

export default AddProductPage;