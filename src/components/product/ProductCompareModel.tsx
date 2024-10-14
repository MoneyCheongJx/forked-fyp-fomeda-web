import {Image, Modal, Rate, Row, Table} from "antd";
import {CONSUMER_COMPARE_TABLE_CONSTANT} from "@/constants/product.constant";

const ProductCompareModel = ({compareData, onClose, onOpen}: any) => {

    const generateColumns = () => {
        const columnWidth = `${70 / compareData.length}%`

        return [
            {
                title: "Specification",
                dataIndex: 'specName',
                key: "specName",
                width: "30%",
            },
            ...compareData.map((product: any) => ({
                title: product.product_name,
                dataIndex: product._id,
                key: product._id,
                width: columnWidth,
            }))
        ]
    }

    const doesRowExist = (tableData: any[], key: string): boolean => {
        return tableData.some((row) => row.key === key);
    };

    const createSubspecRow = (subspec: any, spec: any, compareData: any[]): any => {
        const subspecRow: any = {
            key: subspec.subspec_id,
            specName: <h5 className={"pl-4"}>{subspec.subspec_name}</h5>,
        };

        compareData.forEach((product: any) => {
            const productSpec = product.specification.find((s: any) => s.spec_id === spec.spec_id);
            subspecRow[product._id] = productSpec?.subspecification.find((sub: any) => sub.subspec_id === subspec.subspec_id)?.subspec_desc || "N/A";
        });

        return subspecRow;
    };

    const processAndCreateSpecRow = (spec: any, compareData: any[], tableData: any[]): void => {
        if (!doesRowExist(tableData, spec.spec_id)) {
            const hasSubspecifications = spec.subspecification && spec.subspecification.length > 0;
            const specRow: any = {
                key: spec.spec_id,
                specName: <h5>{spec.spec_name}</h5>,
            };
            compareData.forEach((product: any) => {
                specRow[product._id] = hasSubspecifications ? "" : product.specification.find((s: any) => s.spec_id === spec.spec_id)?.spec_desc || "N/A";
            });
            tableData.push(specRow);
        }

        spec.subspecification?.forEach((subspec: any) => {
            if (!doesRowExist(tableData, subspec.subspec_id)) {
                tableData.push(createSubspecRow(subspec, spec, compareData));
            }
        });
    };

    const generateTableData = (specType: any): any[] => {
        const tableData: any[] = [];

        compareData.forEach((product: any) => {
            const filteredSpecs = product.specification.filter((spec: any) => spec.spec_type === specType);
            filteredSpecs.forEach((spec: any) => {
                processAndCreateSpecRow(spec, compareData, tableData);
            });
        });

        return tableData;
    };

    return (
        <Modal title={<h3 className={"text-center"}>Compare Product</h3>}
               open={onOpen} onCancel={onClose} footer={null} width={1000}>
            <div className={"max-h-96 overflow-y-auto"}>
                <Row className={"mb-4"}>
                    <div className="flex flex-col justify-end w-1/4">
                        <span className={"font-bold mb-2"}>Product Name</span>
                        <span className={"font-bold mb-2"}>Model No.</span>
                        <span className={"font-bold"}>Rating</span>
                    </div>
                    <Row className={"w-3/4"} justify={"space-around"}>
                        {compareData.map((product: any) => (
                            <div key={product._id} className="flex flex-col items-center">
                                <Image
                                    src={product.product_img?.file?.preview ?? "images/fault-image.png"}
                                    alt={product.product_name}
                                    className="w-16 h-16 object-cover mb-2 rounded-md"
                                    preview={false}
                                    width={150}
                                    height={120}
                                />
                                <span className="text-center mb-2">{product.product_name}</span>
                                <span className="text-center mb-2">{product.model_no}</span>
                                <Rate disabled value={product.rating}/>
                            </div>
                        ))}
                    </Row>
                </Row>

                {CONSUMER_COMPARE_TABLE_CONSTANT.map((item) => (
                    <div key={item.key} className={"mb-4"}>
                        <h5>{item.title}</h5>
                        <Table
                            columns={generateColumns()}
                            dataSource={generateTableData(item.type)}
                            pagination={false}
                            showHeader={false}
                            className={"ml-4"}
                        />
                    </div>
                ))}
            </div>
        </Modal>
    )
}

export default ProductCompareModel;