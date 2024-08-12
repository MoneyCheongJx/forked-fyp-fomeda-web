import {AuthenticationModel} from "@/models/authentication.model";
import {ApiConstant} from "@/constants/api.constant";
import {HttpService} from "@/services/http.service";

export default class Authenticationervice {

    static login = async (authenticationModel: AuthenticationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.LOGIN,
                authenticationModel
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static logout = async (sessionId: string) => {
        try {
            const response = await HttpService.post(
                ApiConstant.LOGOUT,
                sessionId
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    static register = async (authenticationModel: AuthenticationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.REGISTER,
                authenticationModel
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getDetails = async (sessionId: string) => {
        try {
            const param = {sessionId};
            const response = await HttpService.get(
                ApiConstant.GET_DETAILS,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
