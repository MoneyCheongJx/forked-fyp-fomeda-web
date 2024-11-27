import {Card, Checkbox, Col, Image, Rate, Row, Typography} from "antd";
import {ReadOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

const ProductTile = ({productData, onCompareChange, isChecked}: any) => {
    const router = useRouter();

    return (
        <Card cover={<Image src={productData.product_img?.file?.preview ?? "/images/fault-image.png"}
                            alt={productData.product_name}
                            height={200}
                            className={"object-cover"}
                            preview={false}/>}
              actions={[
                  <Checkbox key={"checkbox"}
                            className={"items-center"}
                            onChange={(e) => onCompareChange(productData, e.target.checked)}
                            checked={isChecked}>
                      Compare
                  </Checkbox>,
                  <Typography key={"details"}
                          className={"text-black hover:text-blue-600"}
                          onClick={() => router.push(`product/details?id=${productData._id}`)}>
                      <ReadOutlined/> Details
                  </Typography>,
              ]}
              className={"w-72"}>
            <Col className={"h-20"}>
                <h5>{productData.product_name}</h5>
                <div>{productData.model_no}</div>
                <Rate value={productData.rating} disabled/>
            </Col>
        </Card>
    )
}

export default ProductTile;