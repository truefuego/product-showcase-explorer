export interface ApiResponseData<T> {
    success?: boolean;
    status?: boolean;
    errorMsg: string | T;
    data: T;
};
