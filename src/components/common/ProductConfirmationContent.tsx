const ProductConfirmationContent = ({action, record, details}: any) => {
    return (
        <div>
            <br/>
            Are you confirmed to <b>{action}</b> this {details}?
            <br/>
            <div>
                <b>Product:</b> {record.product_name}
            </div>
            <br/>
        </div>
    );
}

export default ProductConfirmationContent;