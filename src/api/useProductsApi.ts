import { useCallback } from "react";
import { useHttpMethodContext } from "../context/httpContext";
import type { ApiResponseData } from "../interface/ApiResponseData";
import type { ICategoriesData, ProductListData } from "../interface/ProductsData";
import { camelCaseSpaceToHyphen } from "../utils/utils";

const useProductsApi = () => {
    const { get } = useHttpMethodContext();

    const getAllProducts = useCallback(
        async<T>(
            showApiLoader= true
        ): Promise<ProductListData> => {
            const res: ApiResponseData<T>  = await get('/', showApiLoader);
            return res.data as ProductListData;
        },
        [get]
    )

    const getPaginatedProducts = useCallback(
        async<T>(
            skip: number,
            limit: number,
            showApiLoader= true
        ): Promise<ProductListData> => {
            const res: ApiResponseData<T>  = await get(`?skip=${skip}&limit=${limit}`, showApiLoader);
            return res.data as ProductListData;
        },
        [get]
    )

    const getPaginatedProductsByCategory = useCallback(
        async<T>(
            skip: number,
            limit: number,
            category: string,
            showApiLoader= true
        ): Promise<ProductListData> => {
            const res: ApiResponseData<T>  = await get(`/category/${camelCaseSpaceToHyphen(category)}?skip=${skip}&limit=${limit}`, showApiLoader);
            return res.data as ProductListData;
        },
        [get]
    );

    const getCategories = useCallback(
        async<T>(
            showApiLoader= true
        ): Promise<ICategoriesData> => {
            const res: ApiResponseData<T>  = await get('/categories', showApiLoader);
            return res.data as ICategoriesData;
        },
        [get]
    );

    return {
        getAllProducts,
        getPaginatedProducts,
        getPaginatedProductsByCategory,
        getCategories,
    };
}

export default useProductsApi;
