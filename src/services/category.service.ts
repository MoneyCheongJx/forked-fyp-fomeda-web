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

    static updateCategory = async (id: string, categoryModel: CategoryModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_CATEGORY,
                categoryModel,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateSubcategory = async (id: string, subcategoryModel: SubcategoryModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_SUBCATEGORY,
                subcategoryModel,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateGeneralSpecification = async (id: string, specificationModel: SpecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_GENERAL_SPECIFICATION,
                specificationModel,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateGeneralSubspecification = async (id: string, subspecificationModel: SubspecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_GENERAL_SUBSPECIFICATION,
                subspecificationModel,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deactivateCategory = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active: is_active.toString()}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_CATEGORY,
                {},
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deactivateSubcategory = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active: is_active.toString()}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_SUBCATEGORY,
                {},
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
