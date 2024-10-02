import {Card, Checkbox, Image, Rate} from "antd";
import {ReadOutlined} from "@ant-design/icons";

const ProductTile = ({productData, onCompareChange, isChecked}: any) => {
    return (
        <Card cover={<Image src={productData.product_img?.file?.preview ?? "/images/fault-image.png"}
                            alt={productData.product_name}
                            height={200}
                            className={"object-cover"}
                            preview={false}/>}
              actions={[
                  <Checkbox key={"checkbox"}
                            onChange={(e) => onCompareChange(productData, e.target.checked)}
                            checked={isChecked}>
                      Compare
                  </Checkbox>,
                  <div key={"details"} className={"text-black hover:text-blue-600"}><ReadOutlined/> Details</div>,
              ]}
              className={"w-72"}>
            <h5>{productData.product_name}</h5>
            <div>{productData.model_no}</div>
            <Rate value={productData.rating} disabled/>
        </Card>
    )
}

export default ProductTile;