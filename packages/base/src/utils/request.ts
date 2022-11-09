import { createRequestMethod } from "@monorepo/share/plugins/http/axios";
const requestBaseUrl: string =
    process.env.NODE_ENV === "development"
        ? process.env.VUE_APP_BASE_URL
        : window.location.origin;
export const request = createRequestMethod({
    baseUrl: requestBaseUrl,
    interceptors: {
        requestInterceptor(config) {
            config.params = Object.assign(config.params, {
                timestap: Date.now(),
            });
            return config;
        },
        responseInterceptor(response) {
            const { data = {}, status } = response;
            if (status !== 200) {
                throw new Error("接口请求失败");
            }
            return data;
        },
    },
});
