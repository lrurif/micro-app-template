import axios, { type AxiosRequestConfig, AxiosInstance } from "axios";
axios.defaults.baseURL = "";
axios.defaults.timeout = 20 * 1000;
axios.defaults.maxBodyLength = 5 * 1024 * 1024;
axios.defaults.withCredentials = true;

export function createAxiosInstance(
	options: AxiosRequestConfig
): AxiosInstance {
	return axios.create({
		...options,
	});
}
