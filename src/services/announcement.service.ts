import {AnnouncementModel} from "@/models/announcement.model";
import {ApiConstant} from "@/constants/api.constant";
import {HttpService} from "@/services/http.service";
import moment from 'moment';

export default class AnnouncementService {

    static getAllAnnouncements = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.FIND_ALL_ANNOUNCEMENT
            )
            // sort the response by created_on field
            response.sort((a: any, b: any) => moment(b.created_on).diff(moment(a.created_on)));

            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createAnnouncement(announcementModel: AnnouncementModel) {
        try {
            const response = await HttpService.post(ApiConstant.CREATE_ANNOUNCEMENT, announcementModel);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    static updateAnnouncement = async (id: string, announcementModel: AnnouncementModel) => {
        try {
            const param = {id}
            const response = await HttpService.patch(
                ApiConstant.EDIT_ANNOUNCEMENT,
                announcementModel,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateAnnouncementVisibility = async (id: string, visibility: boolean) => {
        try {
            const param = {id}
            const response = await HttpService.patch(
                ApiConstant.EDIT_ANNOUNCEMENT,
                {visibility: visibility},
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
