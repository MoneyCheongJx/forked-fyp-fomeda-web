import {Button, Form, Image, Modal, Spin, Typography, Upload} from "antd";
import React, {useEffect, useState} from "react";
import ReportService from "@/services/report.service";
import NotificationService from "@/services/notification.service";
import {DISPLAY_STATUS, DISPLAY_STATUS_MESSAGE, ReportConstant} from "@/constants/report.constant";
import ProductConfirmationContent from "@/components/common/ProductConfirmationContent";


const ReportDetailsModal = ({onOpen, onClose, reportId, productName, onUpdate, user = 'admin'}: any) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [reportData, setReportData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const handleOnCancel = () => {
        form.resetFields();
        onClose();
    }

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                setLoading(true);
                const response = await ReportService.getReportDetails(reportId);
                if (response) {
                    if (response.rpt_img) {
                        const imgData = [{
                            uid: response.rpt_img.uid,
                            name: response.rpt_img.name,
                            status: "done",
                            thumbUrl: response.rpt_img.base64,
                        }]
                        setFileList(imgData)
                    }
                    setReportData(response);
                }
            } catch (error) {
                console.error(error);
                throw error
            } finally {
                setLoading(false);
            }
        }
        fetchReportData().then()
    }, [reportId]);

    const handleUpdate = async (status: string) => {
        Modal.confirm({
            title: <h3>Confirmation</h3>,
            content: <ProductConfirmationContent action={DISPLAY_STATUS_MESSAGE[status]}
                                                 record={{product_name: productName}}
                                                 details={"report"}/>,
            className: "confirmation-modal",
            centered: true,
            width: "35%",
            okText: "Confirm",
            onOk: () => onSubmit(status),
        })
    }

    const onSubmit = async (status: string) => {
        try {
            setUpdateLoading(true)
            const reportDto: any = {}
            if (user === "admin") {
                reportDto.adm_status = status
            } else {
                reportDto.sup_status = status
            }
            await ReportService.updateReportStatus(reportId, reportDto);
            onClose();
            onUpdate();
            NotificationService.success(
                "Review Product",
                `Report of ${productName} is ${DISPLAY_STATUS[status]} successfully`);
        } catch (error) {
            NotificationService.error(
                "Review Product",
                `Report of ${productName} is failed to review`);
        } finally {
            setUpdateLoading(false)
        }
    }

    const handlePreview = async (file: any) => {
        setPreviewImage(file.thumbUrl || "");
        setIsPreviewOpen(true);
    }

    const modalFooter = [
        <Button key={"cancel"} type={"default"} onClick={onClose}>Cancel</Button>,
        <Button key={"notify"} type={"primary"} loading={updateLoading}
                onClick={() => handleUpdate(ReportConstant.NOTIFIED)}
                hidden={user === "supplier"}
                disabled={reportData.adm_status === ReportConstant.NOTIFIED}>
            Notify Owner
        </Button>,
        <Button key={"close"} type={"primary"} danger loading={updateLoading}
                onClick={() => handleUpdate(ReportConstant.CLOSED)}
                disabled={reportData.sup_status === ReportConstant.PENDING && user !== "supplier"}>
            Resolved
        </Button>,
    ]

    return (
        <Modal open={onOpen}
               onCancel={handleOnCancel}
               title={<h3 className={"text-center"}>Reported Details</h3>}
               width={"50%"}
               footer={reportData.adm_status === ReportConstant.CLOSED || (reportData.sup_status === ReportConstant.CLOSED && user === "supplier") ? null : modalFooter}
        >
            <Spin spinning={loading}>
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
                               labelCol={{span: 6}}>
                        <div>{reportData.rpt_title}</div>
                    </Form.Item>
                    <Form.Item label={<h5>Reason</h5>}
                               className={"mb-2"}
                               labelAlign={"left"}
                               labelCol={{span: 6}}>
                        <Typography.Paragraph ellipsis={{rows: 4, expandable: true, symbol: "more"}}>
                            {reportData.rpt_reason}
                        </Typography.Paragraph>
                    </Form.Item>

                    {reportData.rpt_img && (
                        <Upload
                            listType="picture"
                            fileList={fileList}
                            showUploadList={{showRemoveIcon: false}}
                            onPreview={handlePreview}
                            disabled
                        />
                    )}
                </Form>
            </Spin>

            {previewImage && (
                <Image
                    wrapperStyle={{display: 'none'}}
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

export default ReportDetailsModal;