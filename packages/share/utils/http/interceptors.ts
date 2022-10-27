import { type AxiosRequestConfig, AxiosInstance } from "axios";
interface ResType<T> {
    code: number
    data?:T
    msg: string
    err?: string
}
export function addInterceptors(axiosInstance: AxiosInstance): void {
	axiosInstance.interceptors.request.use(
		(config: AxiosRequestConfig) => {
			config.params = {
				...config.params,
				t: Date.now(),
			};
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	axiosInstance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
}
