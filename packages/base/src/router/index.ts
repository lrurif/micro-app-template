import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from "vue-router";
import Home from "@/views/Home.vue";
import NotFound from "@monorepo/share/components/404/index.vue";
import { mainStore } from "@/store/index";
import { baseRouteName } from "@/enums"
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: baseRouteName.LOGIN,
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/data-center/:params*",
        name: "dataCenter",
        component: () => import("@/views/DataCenter.vue"),
    },
    {
        path: "/merchant/:params*",
        name: "merchant",
        component: () => import("@/views/Merchant.vue"),
    },
    {
        path: "/404",
        name: baseRouteName.NOT_FOUND,
        component: NotFound,
    },
    {
        path: "/:pathMatch(.*)",
        redirect: "/404",
    },
];
const asyncRoutes: Array<RouteRecordRaw> = [];

const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const store = mainStore();
    const whiteList: (string | symbol)[] = [baseRouteName.NOT_FOUND, baseRouteName.LOGIN];
    const hasWhite: boolean = whiteList.includes(to.name);
    if (store.token || hasWhite) {
        next();
    } else {
        next({
            name: "login",
        });
    }
});
export default router;
