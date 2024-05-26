import {SpecificationModel} from "@/app/models/specification.model";
import {ApiConstant} from "@/constants/api.constant";
import {HttpService} from "@/services/http.service";
import {CategoryModel} from "@/app/models/category.model";
import {SubspecificationModel} from "@/app/models/subspecification.model";
import {SubcategoryModel} from "@/app/models/subcategory.model";

export default class CategoryService {
    static async createCategory(categoryModel: CategoryModel) {
        try {
            const response = await HttpService.post(ApiConstant.CREATE_CATEGORY, categoryModel);
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
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static createGeneralSubspecification = async (subspecificationModel: SubspecificationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_GENERAL_SUBSPECIFICATION,
                subspecificationModel
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static createSubcategory = async (subcategoryModel: SubcategoryModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_SUBCATEGORY,
                subcategoryModel
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static getAllCategory = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.FIND_ALL_CATEGORY
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
