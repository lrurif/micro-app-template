import { request } from "@/utils/request";
import { AxiosResponse } from "axios";
import { LoginType, User } from "@/models/User";
export function login(params: LoginType): Promise<AxiosResponse> {
    return request({
        url: "https://oss.iuctrip.com/prod/tesla/h5/9910/setting.json",
        method: "get",
        params,
        withCredentials: false,
    });
}
