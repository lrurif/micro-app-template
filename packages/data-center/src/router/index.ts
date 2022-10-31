import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(
        (window as any).__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL
    ),
    routes,
});

export default router;
