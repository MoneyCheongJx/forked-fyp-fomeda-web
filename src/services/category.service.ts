import {SpecificationModel} from "@/app/models/specification.model";
import {ApiConstant} from "@/constants/api.constant";
import {HttpService} from "@/services/http.service";
import {CategoryModel} from "@/app/models/category.model";

export default class CategoryService {
    static async createCategory(categoryModel: CategoryModel) {
        try {
            const response = await HttpService.post(ApiConstant.CREATE_CATEGORY, categoryModel);
            console.log(response);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async createGeneralSpecification(specificationModel: SpecificationModel) {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_GENERAL_SPECIFICATION,
                specificationModel
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getAllGeneralSpecifications = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.FIND_ALL_GENERAL_SPECIFICATION
            )
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
