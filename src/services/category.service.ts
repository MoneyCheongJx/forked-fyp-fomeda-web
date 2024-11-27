import {SpecificationModel} from "@/models/specification.model";
import {ApiConstant} from "@/constants/api.constant";
import {HttpService} from "@/services/http.service";
import {CategoryModel} from "@/models/category.model";
import {SubspecificationModel} from "@/models/subspecification.model";
import {SubcategoryModel} from "@/models/subcategory.model";

export default class CategoryService {
    static readonly createCategory = async (categoryModel: CategoryModel) =>  {
        try {
            const response = await HttpService.post(ApiConstant.CREATE_CATEGORY, categoryModel);
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly createGeneralSpecification = async (specificationModel: SpecificationModel) =>  {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_GENERAL_SPECIFICATION,
                specificationModel
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly getAllGeneralSpecifications = async () => {
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

    static readonly createGeneralSubspecification = async (subspecificationModel: SubspecificationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_GENERAL_SUBSPECIFICATION,
                subspecificationModel
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly createSubcategory = async (subcategoryModel: SubcategoryModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_SUBCATEGORY,
                subcategoryModel
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly getAllCategory = async () => {
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

    static readonly findOneSubcategoryById = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_ONE_SUBCATEGORY_BY_ID,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly findAllActiveCategories = async () => {
        try {
            const response = await HttpService.get(
                ApiConstant.FIND_ALL_ACTIVE_CATEGORIES
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateCategory = async (id: string, categoryModel: CategoryModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_CATEGORY,
                categoryModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateSubcategory = async (id: string, subcategoryModel: SubcategoryModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_SUBCATEGORY,
                subcategoryModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateGeneralSpecification = async (id: string, specificationModel: SpecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_GENERAL_SPECIFICATION,
                specificationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateGeneralSubspecification = async (id: string, subspecificationModel: SubspecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_GENERAL_SUBSPECIFICATION,
                subspecificationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deactivateCategory = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_CATEGORY,
                {},
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deactivateSubcategory = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_SUBCATEGORY,
                {},
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deleteCategory = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_CATEGORY,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deleteSubcategory = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_SUBCATEGORY,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deactivateGeneralSpecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_GENERAL_SPECIFICATION,
                {},
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deactivateGeneralSubspecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_GENERAL_SUBSPECIFICATION,
                {},
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deleteGeneralSpecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_GENERAL_SPECIFICATION,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deleteGeneralSubspecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_GENERAL_SUBSPECIFICATION,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deactivateCategoryBaseSpecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_BASE_SPECIFICATION,
                {},
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deactivateCategoryBaseSubspecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_BASE_SUBSPECIFICATION,
                {},
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    static readonly deactivateSubcategorySpecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_SUBCATEGORY_SPECIFICATION,
                {},
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deactivateSubcategorySubspecification = async (id: string, is_active: boolean) => {
        try{
            const param = {id, is_active}
            const response = await HttpService.put(
                ApiConstant.DEACTIVATE_SUBCATEGORY_SUBSPECIFICATION,
                {},
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deleteCategoryBaseSpecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_BASE_SPECIFICATION,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deleteCategoryBaseSubspecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_BASE_SUBSPECIFICATION,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deleteSubcategorySpecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_SUBCATEGORY_SPECIFICATION,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deleteSubcategorySubspecification = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_SUBCATEGORY_SUBSPECIFICATION,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly findCategoryBaseSpecificationByCatId = async (id: string) => {
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

    static readonly findSubcategorySpecificationByCatId = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_SUBCATEGORY_SPECIFICATION_BY_CAT_ID,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly findActiveSubcategorySpecificationByCatId = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_ACTIVE_SUBCATEGORY_SPECIFICATION_BY_CAT_ID,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly findSubcategorySpecificationById = async (id: string) => {
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

    static readonly findSubcategorySubspecificationById = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_SUBCATEGORY_SUBSPECIFICATION_BY_ID,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly findGeneralSpecificationById = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_GENERAL_SPECIFICATION_BY_ID,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly findGeneralSubspecificationById = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_GENERAL_SUBSPECIFICATION_BY_ID,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly findBaseSpecificationById = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_BASE_SPECIFICATION_BY_ID,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly findBaseSubspecificationById = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.FIND_BASE_SUBSPECIFICATION_BY_ID,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly createCategoryBaseSpecification = async (specificationModel: SpecificationModel) => {
        try {
            console.log(specificationModel)
            const response = await HttpService.post(
                ApiConstant.CREATE_BASE_SPECIFICATION,
                specificationModel
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly createCategoryBaseSubspecification = async (subspecificationModel: SubspecificationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_BASE_SUBSPECIFICATION,
                subspecificationModel
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly createSubcategorySpecification = async (specificationModel: SpecificationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_SUBCATEGORY_SPECIFICATION,
                specificationModel
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly createSubcategorySubspecification = async (subspecificationModel: SubspecificationModel) => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_SUBCATEGORY_SUBSPECIFICATION,
                subspecificationModel
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateBaseSpecification = async (id: string, specificationModel: SpecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_BASE_SPECIFICATION,
                specificationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateBaseSubspecification = async (id: string, subspecificationModel: SubspecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_BASE_SUBSPECIFICATION,
                subspecificationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateSubcategorySpecification = async (id: string, specificationModel: SpecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_SUBCATEGORY_SPECIFICATION,
                specificationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateSubcategorySubspecification = async (id: string, subspecificationModel: SubspecificationModel) => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_SUBCATEGORY_SUBSPECIFICATION,
                subspecificationModel,
                param
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly findNameById = async (id: string) => {
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

    static readonly getProductSpecificationBySubcatId = async (id: string) => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.GET_PRODUCT_SPECIFICATION_BY_SUBCAT_ID,
                param,
            );
            return response;
        } catch (error){
            console.error(error);
            throw error;
        }
    }
}
