import {AnnouncementModel} from "@/models/announcement.model";
import {ApiConstant} from "@/constants/api.constant";
import {HttpService} from "@/services/http.service";
import "@/styles/announcement.component.css"

export default class AnnouncementService {

    static getAllAnnouncements = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.FIND_ALL_ANNOUNCEMENT
            )
            response.sort((a: any, b: any) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime());

            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getVisibleAnnouncements = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.FIND_VISIBLE_ANNOUNCEMENT
            )
            response.sort((a: any, b: any) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime());

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
