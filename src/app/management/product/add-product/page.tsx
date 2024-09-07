import PageLayout from "@/app/page";
import ProductForm from "@/components/product-management/ProductForm";

const AddProductPage = () => {
    return (
        <PageLayout title="Add Product">
            <ProductForm type={"add"}/>
        </PageLayout>
    )
}

export default AddProductPage;