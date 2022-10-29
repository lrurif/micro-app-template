import { defineStore } from "pinia";
export interface MainStore {
    token: string;
}
export const mainStore = defineStore("main", {
    persist: true,
    state: (): MainStore => {
        return {
            token: "",
        };
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
    },
});
