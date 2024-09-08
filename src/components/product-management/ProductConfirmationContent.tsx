const ProductConfirmationContent = ({action, record}: any) => {
    return (
        <div>
            <br/>
            Are you sure you want to <b>{action}</b> this product?
            <br/>
            <div>
                <b>Product:</b> {record.product_name}
            </div>
            <br/>
        </div>
    );
}

export default ProductConfirmationContent;