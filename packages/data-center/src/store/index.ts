import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import {
    filterRouter,
    getSideBarData,
    insertRoutes,
} from "@monorepo/share/utils/router";
import router, { rootRoute, asyncRoutes, NOT_FOUND } from "@/router";
import { encrypData, decryptData } from "@monorepo/share/utils/crypto";
export interface DataCenterStore {
    token: string;
    permissionRoutes: RouteRecordRaw[];
    activeRouteName: string;
    userRole: string;
    sidebarData: RouteRecordRaw[];
}
export const useMainStore = defineStore("data-center", {
    persist: {
        serializer: {
            deserialize: decryptData,
            serialize: encrypData,
        },
    },
    state: (): DataCenterStore => {
        return {
            token: "",
            userRole: "",
            permissionRoutes: [], // 权限内路由
            sidebarData: [], // 左侧栏sidebar数据
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
        setSidebarData(value) {
            this.sidebarData = value;
        },
        setActiveRouteName(value) {
            this.activeRouteName = value;
        },
        async getUserPermission() {
            const mockPromise = function () {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(1);
                    }, 2000);
                });
            };
            // const res = await 请求api
            await mockPromise();
            this.setUserRole("admin");
            const permissionRoutes = filterRouter(asyncRoutes, this.userRole); // 获取权限内路由
            this.setPermissionRoutes(permissionRoutes);
            insertRoutes(router, {
                rootRoute,
                asyncRoutes: permissionRoutes,
                notFoundRoute: NOT_FOUND,
            });
            const sidebarData = getSideBarData(permissionRoutes); // 获取左侧菜单栏所需数据
            this.setSidebarData(sidebarData);
        },
        resetUserRole() {
            this.setUserRole("");
            this.setActiveRouteName("");
            this.setPermissionRoutes([]);
            this.setSidebarData([]);
        },
    },
});
