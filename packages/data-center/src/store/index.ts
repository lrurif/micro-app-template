import { defineStore } from "pinia";
import {RouteRecordRaw} from "vue-router"
export interface MainStore {
    token: string;
    permissionRoutes: RouteRecordRaw[],
    asyncRoutes: RouteRecordRaw[]
}
export const useMainStore = defineStore("main", {
    persist: true,
    state: (): MainStore => {
        return {
            token: "",
            permissionRoutes: [],
            asyncRoutes: [],
        };
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setPermissionRoutes(value) {
            this.permissionRoutes = value;
        },
        setAsyncRoutes(value) {
            this.asyncRoutes = value;
        }
    },
});
