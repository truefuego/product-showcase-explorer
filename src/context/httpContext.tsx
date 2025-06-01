import axios from "axios";
import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { ApiResponseData } from "../interface/ApiResponseData";

interface IHttpMethodContext {
    showApiLoader: boolean;
    get: <T>(
        endpoint: string,
        showLoader?: boolean
    ) => Promise<ApiResponseData<T>>;
};

export const HttpMethodContext = createContext<IHttpMethodContext | undefined>(undefined);

const Axios = axios.create({
    baseURL: 'https://dummyjson.com/products', // This can be in a env file (better for security obv)
});

export const HttpMethodContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [showApiLoader, setShowApiLoader] = useState<boolean>(false);
    const get = useCallback(
        async <T,>(
            endpoint: string,
            showLoader = true
        ): Promise<ApiResponseData<T>> => {
            if (showLoader) setShowApiLoader(true);

            return Axios
                .get(endpoint)
                .then((res) => {
                    console.log(`🟢 Get: ${endpoint}, ${res.status}`);
                    return {
                        success: true,
                        errorMsg: "",
                        data: res as T,
                    }
                })
                .catch(err => {
                    console.log(`🔴 Get: ${endpoint}, ${err}`);
                    return {
                        success: false, 
                        errorMsg: err, 
                        data: {} as T
                    }
                })
                .finally(() => {
                    if (showLoader) setShowApiLoader(false);
                })
        },[]
    );

    const value = useMemo(() => ({showApiLoader,get}),[showApiLoader, get]);

    return (
        <HttpMethodContext.Provider value={value}>
            {children}
        </HttpMethodContext.Provider>
    );
}

export const useHttpMethodContext = () => {
    const context = useContext(HttpMethodContext);
    if (!context) {
        throw new Error("useHttpMethodContext must be used within a HttpMethodContextProvider");
    }
    return context;
};