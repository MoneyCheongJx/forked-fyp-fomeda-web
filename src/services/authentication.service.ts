import {AuthenticationModel} from "@/models/authentication.model";
import {ApiConstant} from "@/constants/api.constant";
import {HttpService} from "@/services/http.service";

export default class AuthenticationService {

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

    static logout = async (authenticationModel: AuthenticationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.LOGOUT,
                authenticationModel
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

    static checkEmailDuplicate = async (email: string) => {
        try {
            const param = {email};
            const response = await HttpService.get(
                ApiConstant.CHECK_EMAIL_DUPLCIATE,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static checkUsernameDuplicate = async (username: string) => {
        try {
            const param = {username};
            const response = await HttpService.get(
                ApiConstant.CHECK_USERNAME_DUPLICATE,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static checkStatus = async (username: string) => {
        try {
            const param = {username};
            const response = await HttpService.get(
                ApiConstant.CHECK_STATUS,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getRejectionInfo = async (user_id: string) => {
        try {
            const param = {user_id};
            const response = await HttpService.get(
                ApiConstant.GET_REJECTION_INFO,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getAppealInfo = async (user_id: string) => {
        try {
            const param = {user_id};
            const response = await HttpService.get(
                ApiConstant.GET_APPEAL_INFO,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static appealRegistration = async (user_id: string, authenticationModel: AuthenticationModel) => {
        try {
            const param = {user_id};
            const response = await HttpService.patch(
                ApiConstant.APPEAL_REGISTRATION,
                authenticationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getProfileInfo = async (user_id: string) => {
        try {
            const param = {user_id};
            const response = await HttpService.get(
                ApiConstant.GET_PROFILE_INFO,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateProfile = async (user_id: string, authenticationModel: AuthenticationModel) => {
        try {
            const param = {user_id};
            const response = await HttpService.patch(
                ApiConstant.UPDATE_PROFILE,
                authenticationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updatePassword = async (user_id: string, authenticationModel: AuthenticationModel) => {
        try {
            const param = {user_id};
            const response = await HttpService.patch(
                ApiConstant.UPDATE_PASSWORD,
                authenticationModel,
                param
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

    static getPendingSuppliers = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.GET_PENDING_SUPPLIERS,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getRejectedSuppliers = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.GET_REJECTED_SUPPLIERS,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getApprovedSuppliers = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.GET_APPROVED_SUPPLIERS,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static approveSuppliers = async (userId: string, authenticationModel: AuthenticationModel) => {
        const param = {userId};
        try {
            const response = await HttpService.patch(
                ApiConstant.APPROVE_SUPPLIERS,
                authenticationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static rejectSuppliers = async (userId: string, authenticationModel: AuthenticationModel) => {
        const param = {userId};
        try {
            const response = await HttpService.patch(
                ApiConstant.REJECT_SUPPLIERS,
                authenticationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getAdmins = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.GET_ADMINS,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    static updateAdmin = async (userId: string, authenticationModel: AuthenticationModel) => {
        const param = {userId};
        try {
            const response = await HttpService.patch(
                ApiConstant.UPDATE_ADMIN,
                authenticationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static checkForgetPasswordEmail = async (email: string) => {
        try {
            const param = {email};
            const response = await HttpService.get(
                ApiConstant.CHECK_FORGET_PASSWORD_EMAIL,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static resetPassword = async (user_id: string, authenticationModel: AuthenticationModel) => {
        try {
            const param = {user_id};
            const response = await HttpService.patch(
                ApiConstant.RESET_PASSWORD,
                authenticationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static sendOtp = async (authenticationModel: AuthenticationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.SEND_OTP,
                authenticationModel
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static verifyOtp = async (authenticationModel: AuthenticationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.VERIFY_OTP,
                authenticationModel
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getEmail = async (user_id: string) => {
        try {
            const param = {user_id};
            const response = await HttpService.get(
                ApiConstant.GET_EMAIL,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static sendDeleteOtp = async (authenticationModel: AuthenticationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.SEND_DELETE_OTP,
                authenticationModel
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static verifyDeleteOtp = async (authenticationModel: AuthenticationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.VERIFY_DELETE_OTP,
                authenticationModel
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteAccount = async (user_id: string, authenticationModel: AuthenticationModel) => {
        try {
            const param = {user_id};
            const response = await HttpService.patch(
                ApiConstant.DELETE_ACCOUNT,
                authenticationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
