import {Button, Form, GetProp, Image, Input, Modal, Upload, UploadProps} from "antd";
import TextArea from "antd/es/input/TextArea";
import {UploadOutlined} from "@ant-design/icons";
import {useState} from "react";
import MessageService from "@/services/message.service";
import ReportService from "@/services/report.service";
import NotificationService from "@/services/notification.service";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("File reading failed"));
    })

const ReportModal = ({onOpen, onClose, productId, productName}: any) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handleOnCancel = () => {
        form.resetFields();
        onClose();
    }

    const handleOnOk = async () => {
        try {
            await form.validateFields();
        } catch (error) {
            MessageService.error("Please fill in all required fields")
            throw error;
        }

        const formData = form.getFieldsValue();
        formData.pro_id = productId;

        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            formData.rpt_img = {
                name: file.name,
                uid: fileList[0].uid,
                base64: await getBase64(file),
            };
        }

        try {
            await ReportService.createReport(formData);
            onClose();
            form.resetFields();
            NotificationService.success(
                "Report Product",
                `${productName} reported successfully`);
        } catch (error) {
            NotificationService.error(
                "Report Product",
                `Failed to report product - ${productName}`);
        }

    }

    const handleUpload = ({fileList}: any) => {
        setFileList(fileList)

        if (fileList.length === 0) {
            form.setFieldsValue({ rpt_img: null });
        }
    }

    const handlePreview = async (file: any) => {
        if (!file.base64 && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.base64 || (file.preview as string));
        setIsPreviewOpen(true);
    }

    return (
        <Modal open={onOpen}
               onCancel={handleOnCancel}
               title={<h3 className={"text-center"}>Report Product</h3>}
               width={"50%"}
               okText={"Report"}
               onOk={handleOnOk}>
            <Form form={form}>
                <Form.Item label={<h5>Product Name</h5>}
                           className={"mb-2"}
                           labelAlign={"left"}
                           labelCol={{span: 6}}>
                    <div>{productName}</div>
                </Form.Item>
                <Form.Item label={<h5>Title</h5>}
                           className={"mb-2"}
                           labelAlign={"left"}
                           name={"rpt_title"}
                           labelCol={{span: 6}}
                           rules={[
                               {required: true, message: "Title is required"},
                           ]}>
                    <Input/>
                </Form.Item>
                <Form.Item label={<h5>Reason</h5>}
                           className={"mb-2"}
                           labelAlign={"left"}
                           name={"rpt_reason"}
                           labelCol={{span: 6}}
                           rules={[
                               {required: true, message: "Reason is required"},
                           ]}>
                    <TextArea rows={4} placeholder="Reason"/>
                </Form.Item>
                <Form.Item name={"rpt_img"}>
                    <Upload listType="picture"
                            maxCount={1}
                            accept={"image/*"}
                            multiple={false}
                            onChange={handleUpload}
                            onPreview={handlePreview}
                    >
                        <Button icon={<UploadOutlined/>}>Upload (Max: 1)</Button>
                    </Upload>
                </Form.Item>
            </Form>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: isPreviewOpen,
                        onVisibleChange: (visible) => setIsPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                    alt={"report-image"}
                />
            )}
        </Modal>
    )
}

export default ReportModal;