import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
export interface MainStore {
    token: string;
    permissionRoutes: RouteRecordRaw[];
    activeRouteName: string;
    userRole: string;
    asyncRoutes: RouteRecordRaw[];
}
export const useMainStore = defineStore("data-center", {
    persist: true,
    state: (): MainStore => {
        return {
            token: "",
            userRole: "",
            permissionRoutes: [], // 权限内路由
            asyncRoutes: [], // 左侧栏sidebar数据
            activeRouteName: "", // 当前激活路由名称
        };
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setUserRole(value) {
            this.userRole = value;
        },
        setPermissionRoutes(value) {
            this.permissionRoutes = value;
        },
        setAsyncRoutes(value) {
            this.asyncRoutes = value;
        },
        setActiveRouteName(value) {
            this.activeRouteName = value;
        },
    },
});
