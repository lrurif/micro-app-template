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
    const abortControllers = new Map<string, Promise<any>>(); // Promise池，存放未完成的请求
    function getPendingKey(config: AxiosRequestConfig): string {
        let { data } = config;
        const { url, method, params } = config;
        if (typeof data === "string") data = JSON.parse(data);
        return [url, method, JSON.stringify(params), JSON.stringify(data)].join(
            "&"
        );
    }
    const request = function <T>(data: AxiosRequestConfig): Promise<T> {
        // start
        return new Promise((resolve, reject) => {
            const key = getPendingKey(data);
            if (abortControllers.has(key))
                return resolve(abortControllers.get(key));
            const promise = axiosInstance(data);
            promise.finally(() => {
                abortControllers.delete(key);
            });
            promise.then(
                (res) => {
                    resolve(res as unknown as Promise<T>);
                },
                (err) => {
                    reject(err);
                }
            );
            abortControllers.set(key, promise);
        });
    };
    return request;
}
