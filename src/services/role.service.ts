import {RoleModel} from "@/models/role.model";
import {ApiConstant} from "@/constants/api.constant";
import {HttpService} from "@/services/http.service";

export default class RoleService {
    static getAllRoles = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.GET_ALL_ROLES,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getActiveRoles = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.GET_ACTIVE_ROLES,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getModules = async (id: string) => {
        const param = {id}
        try {
            const response = await HttpService.get(
                ApiConstant.GET_MODULES,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static createRole = async (roleModel: RoleModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_ROLE,
                roleModel
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateRole = async (id: string, roleModel: RoleModel) => {
        try {
            const param = {id}
            const response = await HttpService.patch(
                ApiConstant.UPDATE_ROLE,
                roleModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
