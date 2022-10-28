import { AxiosRequestConfig, AxiosInstance } from "axios";
import { InterceptorsType } from "./type";
interface ResType<T> {
    code: number;
    data?: T;
    msg: string;
    err?: string;
}
/**
 * axios添加拦截器
 * @param axiosInstance axios实例
 * @param interceptors 拦截器对象
 */
export function addInterceptors(
    axiosInstance: AxiosInstance,
    interceptors?: InterceptorsType
): void {
    const requestInterceptor =
        interceptors?.requestInterceptor ||
        ((config: AxiosRequestConfig) => {
            config.params = {
                ...config.params,
                t: Date.now(),
            };
            return config;
        });
    const requestInterceptorCatch =
        interceptors?.requestInterceptorCatch ||
        ((error) => {
            return Promise.reject(error);
        });
    const responseInterceptor =
        interceptors?.responseInterceptor ||
        ((response) => {
            return response;
        });
    const responseInterceptorCatch =
        interceptors?.responseInterceptorCatch ||
        ((error) => {
            return Promise.reject(error);
        });
    axiosInstance.interceptors.request.use(
        requestInterceptor,
        requestInterceptorCatch
    );
    axiosInstance.interceptors.response.use(
        responseInterceptor,
        responseInterceptorCatch
    );
}
