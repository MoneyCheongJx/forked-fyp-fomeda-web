import {SpecificationModel} from "@/models/specification.model";
import {ApiConstant} from "@/constants/api.constant";
import {HttpService} from "@/services/http.service";
import {CategoryModel} from "@/models/category.model";
import {SubspecificationModel} from "@/models/subspecification.model";
import {SubcategoryModel} from "@/models/subcategory.model";

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

    static deleteCategory = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_CATEGORY,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteSubcategory = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_SUBCATEGORY,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deactivateGeneralSpecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active: is_active.toString()}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_GENERAL_SPECIFICATION,
                {},
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deactivateGeneralSubspecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active: is_active.toString()}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_GENERAL_SUBSPECIFICATION,
                {},
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteGeneralSpecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_GENERAL_SPECIFICATION,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteGeneralSubspecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_GENERAL_SUBSPECIFICATION,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deactivateCategoryBaseSpecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active: is_active.toString()}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_BASE_SPECIFICATION,
                {},
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deactivateCategoryBaseSubspecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active: is_active.toString()}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_BASE_SUBSPECIFICATION,
                {},
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    static deactivateSubcategorySpecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active: is_active.toString()}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_SUBCATEGORY_SPECIFICATION,
                {},
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deactivateSubcategorySubspecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active: is_active.toString()}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_SUBCATEGORY_SUBSPECIFICATION,
                {},
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteCategoryBaseSpecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_BASE_SPECIFICATION,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteCategoryBaseSubspecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_BASE_SUBSPECIFICATION,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteSubcategorySpecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_SUBCATEGORY_SPECIFICATION,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static deleteSubcategorySubspecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_SUBCATEGORY_SUBSPECIFICATION,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static findCategoryBaseSpecificationByCatId = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_BASE_SPECIFICATION_BY_CAT_ID,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static findSubcategorySpecificationById = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_SUBCATEGORY_SPECIFICATION_BY_ID,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static createCategoryBaseSpecification = async (specificationModel: SpecificationModel) => {
        try {
            console.log(specificationModel)
            const response = await HttpService.post(
                ApiConstant.CREATE_BASE_SPECIFICATION,
                specificationModel
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static createCategoryBaseSubspecification = async (subspecificationModel: SubspecificationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_BASE_SUBSPECIFICATION,
                subspecificationModel
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static createSubcategorySpecification = async (specificationModel: SpecificationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_SUBCATEGORY_SPECIFICATION,
                specificationModel
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static createSubcategorySubspecification = async (subspecificationModel: SubspecificationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_SUBCATEGORY_SUBSPECIFICATION,
                subspecificationModel
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateBaseSpecification = async (id: string, specificationModel: SpecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_BASE_SPECIFICATION,
                specificationModel,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateBaseSubspecification = async (id: string, subspecificationModel: SubspecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_BASE_SUBSPECIFICATION,
                subspecificationModel,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateSubcategorySpecification = async (id: string, specificationModel: SpecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_SUBCATEGORY_SPECIFICATION,
                specificationModel,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static updateSubcategorySubspecification = async (id: string, subspecificationModel: SubspecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_SUBCATEGORY_SUBSPECIFICATION,
                subspecificationModel,
                param
            )
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static findNameById = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_NAME_BY_ID,
                param
            )
            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}
