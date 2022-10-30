import { createAxiosInstance } from "@monorepo/share/utils/http/axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
const requestBaseUrl: string =
    process.env.NODE_ENV === "development"
        ? process.env.VUE_APP_BASE_URL
        : window.location.origin;
const axiosInstance = createAxiosInstance({
    baseURL: requestBaseUrl,
});
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
export function request(data: AxiosRequestConfig): Promise<AxiosResponse> {
    const key = getPendingKey(data);
    if (abortControllers.has(key)) return abortControllers.get(key);
    const promise = axiosInstance(data);
    promise.finally(() => {
        abortControllers.delete(key);
    });
    abortControllers.set(key, promise);
    return promise;
}
