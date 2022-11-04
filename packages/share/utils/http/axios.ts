import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { ExtendAxiosRequestConfig } from "./type";
import { addInterceptors } from "./interceptors";
axios.defaults.baseURL = "";
axios.defaults.timeout = 20 * 1000;
axios.defaults.maxBodyLength = 5 * 1024 * 1024;
axios.defaults.withCredentials = true;

function createAxiosInstance(options: ExtendAxiosRequestConfig): AxiosInstance {
    const instance = axios.create({
        ...options,
    });
    addInterceptors(instance, options.interceptors);
    return instance;
}

export function createRequestMethod(options) {
    const axiosInstance = createAxiosInstance(options);
    /**
     * 如果请求参数和url一样，则返回相同的promise
     */
    const abortControllers = new Map<string, Promise<AxiosResponse>>();
    function getPendingKey(config: AxiosRequestConfig): string {
        let { data } = config;
        const { url, method, params } = config;
        if (typeof data === "string") data = JSON.parse(data);
        return [url, method, JSON.stringify(params), JSON.stringify(data)].join(
            "&"
        );
    }
    const request = function (
        data: AxiosRequestConfig
    ): Promise<AxiosResponse> {
        const key = getPendingKey(data);
        if (abortControllers.has(key)) return abortControllers.get(key);
        const promise = axiosInstance(data);
        promise.finally(() => {
            abortControllers.delete(key);
        });
        abortControllers.set(key, promise);
        return promise;
    };
    return request;
}
