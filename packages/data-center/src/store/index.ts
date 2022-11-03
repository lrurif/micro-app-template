import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import {
    filterRouter,
    getSideBarData,
    insertRoutes,
} from "@monorepo/share/utils/router";
import router, { rootRoute, asyncRoutes } from "@/router"
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
        async getUserPermission() {
            const mockPromise = function () {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(1);
                    },);
                });
            };
            // const res = await 请求api
            await mockPromise();
            this.setUserRole("admin");
            const permissionRoutes = filterRouter(asyncRoutes, this.userRole); // 获取权限内路由
            const copyRoutes = JSON.parse(JSON.stringify(permissionRoutes));
            const res = getSideBarData(copyRoutes); // 获取左侧菜单栏所需数据
            this.setPermissionRoutes(permissionRoutes);
            this.setAsyncRoutes(res);
            insertRoutes(router, permissionRoutes, rootRoute);
        },
    },
});
