import {ProductModel} from "@/models/product.model";
import {HttpService} from "@/services/http.service";
import {ApiConstant} from "@/constants/api.constant";
import {ProductFilterModel} from "@/models/product-filter.model";

export default class ProductService {

    static readonly getProductDetailsById = async (id: string): Promise<ProductModel> => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.GET_PRODUCT_DETAILS_BY_ID,
                param,
            );
            return response;
        } catch (error){
            console.error(error);
            throw error;
        }
    }

    static readonly getProductListByFilter = async (filterModel: ProductFilterModel): Promise<ProductModel[]> => {
        try {
            const response = await HttpService.post(
                ApiConstant.GET_PRODUCT_LIST_BY_FILTER,
                filterModel,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    //might not be used
    static readonly updateProductDetailsById = async (id: string, productModel: ProductModel): Promise<boolean> => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_PRODUCT_DETAILS_BY_ID,
                productModel,
                param,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateProductIsActive = async (id: string): Promise<boolean> => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_PRODUCT_IS_ACTIVE,
                {},
                param,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    static readonly deleteProductById = async (id: string): Promise<boolean> => {
        try{
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_PRODUCT_BY_ID,
                param,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly createProductVerification = async (productModel: ProductModel): Promise<boolean> => {
        try {
            const response = await HttpService.post(
                ApiConstant.CREATE_PRODUCT_VERIFICATION,
                productModel
            );
            return response;
        } catch (error){
            console.error(error);
            throw error;
        }
    }

    static readonly getProductVerificationDetailsById = async (id: string): Promise<ProductModel> => {
        try {
            const param = {id}
            const response = await HttpService.get(
                ApiConstant.GET_PRODUCT_VERIFICATION_DETAILS_BY_ID,
                param,
            );
            return response;
        } catch (error){
            console.error(error);
            throw error;
        }
    }

    static readonly getProductVerificationListByFilter = async (filterModel: ProductFilterModel): Promise<ProductModel[]> => {
        try {
            const response = await HttpService.post(
                ApiConstant.GET_PRODUCT_VERIFICATION_LIST_BY_FILTER,
                filterModel,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateProductVerificationDetailsById = async (id: string, productDto: ProductModel): Promise<boolean> => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_PRODUCT_VERIFICATION_DETAILS_BY_ID,
                productDto,
                param,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly updateProductVerificationReviewById = async (id: string, productDto: ProductModel): Promise<boolean> => {
        try {
            const param = {id}
            const response = await HttpService.put(
                ApiConstant.UPDATE_PRODUCT_VERIFICATION_REVIEW_BY_ID,
                productDto,
                param,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static readonly deleteProductVerificationDetailsById = async (id: string): Promise<boolean> => {
        try{
            const param = {id}
            const response = await HttpService.delete(
                ApiConstant.DELETE_PRODUCT_VERIFICATION_DETAILS_BY_ID,
                param,
            )
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}