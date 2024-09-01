import {CarouselModel} from "@/models/carousel.model";
import {ContentModel} from "@/models/content.model";
import {HistoryTimelineModel} from "@/models/history_timeline.model";
import {ApiConstant} from "@/constants/api.constant";
import {HttpService} from "@/services/http.service";

export default class ContentService {

    static getAllCarousels = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.FIND_ALL_CAROUSEL
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createCarousel(carouselModel: CarouselModel) {
        try {
            const response = await HttpService.post(ApiConstant.CREATE_CAROUSEL, carouselModel);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    static updateCarousel = async (id: string, carouselModel: CarouselModel) => {
        try {
            const param = {id}
            const response = await HttpService.patch(
                ApiConstant.EDIT_CAROUSEL,  
                carouselModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteCarousel = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_CAROUSEL,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getAllContent = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.FIND_ALL_CONTENT
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createContent(contentModel: ContentModel) {
        try {
            const response = await HttpService.post(ApiConstant.CREATE_CONTENT, contentModel);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateContent = async (id: string, contentModel: ContentModel) => {
        try {
            const param = {id}
            const response = await HttpService.patch(
                ApiConstant.EDIT_CONTENT,
                contentModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteContent = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_CONTENT,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getAllHistoryTimeline = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.FIND_ALL_HISTORY_TIMELINE
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createHistoryTimeline(historyTimelineModel: HistoryTimelineModel) {
        try {
            const response = await HttpService.post(ApiConstant.CREATE_HISTORY_TIMELINE, historyTimelineModel);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    static updateHistoryTimeline = async (id: string, historyTimelineModel: HistoryTimelineModel) => {
        try {
            const param = {id}
            const response = await HttpService.patch(
                ApiConstant.EDIT_HISTORY_TIMELINE,
                historyTimelineModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteHistoryTimeline = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_HISTORY_TIMELINE,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
