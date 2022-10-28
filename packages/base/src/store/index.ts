import { defineStore } from "pinia";
export interface MainStore {
    token: string;
}
export const mainStore = defineStore("main", {
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
