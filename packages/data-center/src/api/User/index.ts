import { request } from "@/utils/request";
import { LoginType, User } from "./model/userModel";

export function login(params: LoginType) {
    return request<User>({
        url: "https://oss.iuctrip.com/prod/tesla/h5/9910/setting.json",
        method: "get",
        params,
        withCredentials: false,
    });
}
