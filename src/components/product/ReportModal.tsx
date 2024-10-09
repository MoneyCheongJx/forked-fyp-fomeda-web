import {Button, Form, Input, Modal, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {UploadOutlined} from "@ant-design/icons";

const ReportModal = ({onOpen, onClose, productId, productName}: any) => {

    const [form] = Form.useForm();

    return (
        <Modal open={onOpen}
               onCancel={onClose}
               title={<h3 className={"text-center"}>Report Product</h3>}
               width={"50%"}>
            <Form form={form}>
                <Form.Item label={<h5>Product Name</h5>}
                           labelAlign={"left"}
                           labelCol={{span: 6}}>
                    <div>{productName}</div>
                </Form.Item>
                <Form.Item label={<h5>Title</h5>}
                           labelAlign={"left"}
                           labelCol={{span: 6}}>
                    <Input/>
                </Form.Item>
                <Form.Item label={<h5>Reason</h5>}
                           labelAlign={"left"}
                           labelCol={{span: 6}}>
                    <TextArea rows={4} placeholder="Reason"/>
                </Form.Item>
                <Upload listType="picture"
                        maxCount={1}
                >
                    <Button icon={<UploadOutlined/>}>Upload (Max: 1)</Button>
                </Upload>
            </Form>
        </Modal>
    )
}

export default ReportModal;