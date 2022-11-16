import { request } from "@/utils/request";
import { LoginType, User } from "./model/userModel";
enum Api {
    login = "https://oss.iuctrip.com/prod/tesla/h5/9910/setting.json",
}
export function login(params: LoginType) {
    return request<User>({
        url: Api.login,
        method: "get",
        params,
        withCredentials: false,
    });
}
