import { createRequestMethod } from "@monorepo/share/utils/http/axios"
const requestBaseUrl: string =
    process.env.NODE_ENV === "development"
        ? process.env.VUE_APP_BASE_URL
        : window.location.origin;
export const request = createRequestMethod({
    baseUrl: requestBaseUrl
})

