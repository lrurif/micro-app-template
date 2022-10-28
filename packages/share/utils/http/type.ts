import type { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * @description 扩展 `AxiosRequestConfig`, 使用时可以传递专属拦截器
 */
export interface ExtendAxiosRequestConfig<
	T = ExtendResponse,
	K = ExtendResponse
> extends AxiosRequestConfig {
	/**
	 * @description 拦截器
	 */
	interceptors?: InterceptorsType<T, K>;
}

/**
 * @description 封装拦截器接口
 */
export interface InterceptorsType<T = ExtendResponse, K = ExtendResponse> {
	requestInterceptor?: (
		config: ExtendAxiosRequestConfig<T, K>
	) => ExtendAxiosRequestConfig<T, K>;
	requestInterceptorCatch?: (err: any) => any;
	responseInterceptor?: (res: T) => K;
	responseInterceptorCatch?: (err: any) => any;
}

/**
 * @description 将响应类型给外部使用
 */
export interface ExtendResponse<T = any> extends AxiosResponse<T, any> {}
