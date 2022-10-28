import { createAxiosInstance } from "@monorepo/share/utils/http/axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";
const axiosInstance = createAxiosInstance({
    baseURL: process.env.VUE_APP_BASE_URL,
});
const abortControllers = new Map<string, Promise<AxiosResponse>>();
function getPendingKey(config): string {
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
