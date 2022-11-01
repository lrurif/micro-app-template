import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from "vue-router";
import Home from "@/views/Home.vue";
import NotFound from "@monorepo/share/components/404/index.vue";
import { useMainStore } from "@/store/index";

// 异步路由 -start
import userCenter from "./children/user-center";
import overviewPage from "./children/overview-page";
// 异步路由 -end
const ROUTE_ROOT_NAME = "Home"
import { filterRouter,getSideBarData } from "@monorepo/share/utils/router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: ROUTE_ROOT_NAME,
        component: Home,
    },
    {
        path: "/404",
        name: "404",
        component: NotFound,
    },
    {
        path: "/:pathMatch(.*)",
        redirect: "/404",
    },
];
export const asyncRoutes: Array<RouteRecordRaw> = [
    ...userCenter,
    ...overviewPage,
];

setTimeout(() => {
    const permissionRoutes = filterRouter(asyncRoutes, "admin");
    const tempRoutes = JSON.parse(JSON.stringify(permissionRoutes))
    const res = getSideBarData(tempRoutes)
    const store = useMainStore();
    store.setPermissionRoutes(permissionRoutes);
    store.setAsyncRoutes(res);
    insertRoutes(router, permissionRoutes)
}, 1000);

const router: Router = createRouter({
    history: createWebHistory(
        (window as any).__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL
    ),
    routes,
});

const insertRoutes = (router: Router, asyncRoutes) => {
    asyncRoutes.forEach((route) => {
        router.addRoute(ROUTE_ROOT_NAME, route)
    });
}
const clearRoutes = (router: Router, asyncRoutes: RouteRecordRaw[]) => {
    asyncRoutes.forEach((route) => {
        if (route.name) {
            router.removeRoute(route.name);
        }
        if (route.children) {
            clearRoutes(router, route.children);
        }
    });
};
router.beforeEach(async (to, from, next) => {
    const store = useMainStore();
    const whiteList: (string | symbol)[] = ["404"];
    const hasWhite: boolean = whiteList.includes(to.name);
    if (store.token || hasWhite) {
        next();
    } else {
        next({
            name: "login",
        });
    }
});
export function resetRouter(): void {
    clearRoutes(router, asyncRoutes);
}
export default router;
