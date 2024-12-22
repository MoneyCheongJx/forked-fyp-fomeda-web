import {ReportModel} from "@/models/report.model";
import {HttpService} from "@/services/http.service";
import {ApiConstant} from "@/constants/api.constant";
import {ReportFilterModel} from "@/models/report-filter.model";

export default class ReportService {
    static readonly createReport = async (reportModel: ReportModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_REPORT,
                reportModel
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly getReportDetails = async (id: string) => {
        try {
            const param = {id};
            const response = await HttpService.get(
                ApiConstant.GET_REPORT_DETAILS,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly getSupplierReportListByFilter = async (filterModel: ReportFilterModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.GET_SUPPLIER_REPORT_LIST_BY_FILTER,
                filterModel
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly getAdminReportListByFilter = async (filterModel: ReportFilterModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.GET_ADMIN_REPORT_LIST_BY_FILTER,
                filterModel
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateReportStatus = async (id: string, reportModel: ReportModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_REPORT_STATUS,
                reportModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}