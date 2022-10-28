import axios, { AxiosInstance } from "axios";
import { ExtendAxiosRequestConfig } from "./type";
import { addInterceptors } from "./interceptors";
axios.defaults.baseURL = "";
axios.defaults.timeout = 20 * 1000;
axios.defaults.maxBodyLength = 5 * 1024 * 1024;
axios.defaults.withCredentials = true;

export function createAxiosInstance(
    options: ExtendAxiosRequestConfig
): AxiosInstance {
    const instance = axios.create({
        ...options,
    });
    addInterceptors(instance, options.interceptors);
    return instance;
}
