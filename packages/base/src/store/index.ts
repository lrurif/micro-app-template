import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
export interface MainStore {
    token: string;
    permissionRoutes: RouteRecordRaw[];
}
export const mainStore = defineStore("main", {
    persist: true,
    state: (): MainStore => {
        return {
            token: "",
            permissionRoutes: [],
        };
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
    },
});
