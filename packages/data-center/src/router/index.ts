import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from "vue-router";
import Home from "@/views/Home.vue";
import NotFound from "@monorepo/share/components/404/index.vue";
import { useMainStore } from "@/store/index";
import { ElLoading } from "element-plus";
import {
    findSideNames,
    findDefaultRouteName,
} from "@monorepo/share/utils/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 自动引入权限路由 -start
export const asyncRoutes: Array<RouteRecordRaw> = [];
const modulesFiles = require.context("./children", true, /\.ts$/);
modulesFiles.keys().forEach((key) => {
    asyncRoutes.push(...modulesFiles(key).default);
});
// 自动引入权限路由 -end
const ROUTE_ROOT_NAME = "Home";
NProgress.configure({ showSpinner: false });
export const rootRoute = {
    path: "/",
    name: ROUTE_ROOT_NAME,
    component: Home,
};
export const NOT_FOUND = {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "404",
};
const routes: Array<RouteRecordRaw> = [
    rootRoute,
    {
        path: "/404",
        name: "NOT_FOUND",
        component: NotFound,
    },
];

const router: Router = createRouter({
    history: createWebHistory(
        window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL
    ),
    routes,
});

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const store = useMainStore();
    const whiteList: (string | symbol)[] = ["404", "login"];
    const hasWhite: boolean = whiteList.includes(to.name);
    if (hasWhite) {
        next();
    } else {
        if (store.userRole) {
            next();
        } else {
            let loading = null;
            try {
                loading = ElLoading.service({
                    target: ".content",
                    lock: true,
                    text: "加载应用中...",
                    background: "rgba(0, 0, 0, 0.7)",
                });
                await store.getUserPermission();
                next({
                    ...to,
                });
            } catch (e) {
                console.log("error", e);
                next({
                    name: "login",
                });
            } finally {
                loading.close();
            }
        }
    }
});

router.afterEach((to) => {
    NProgress.done();
    const store = useMainStore();
    const routeNames = findSideNames(store.sidebarData);
    const matchedRoutes = to.matched;
    const length = matchedRoutes.length;
    for (let i = length - 1; i >= 0; i--) {
        if (routeNames.includes(matchedRoutes[i].name)) {
            store.setActiveRouteName(matchedRoutes[i].name);
            break;
        }
    }
    // 如果第一次进入子应用，激活路由名取第一个
    if (!store.activeRouteName) {
        store.setActiveRouteName(findDefaultRouteName(store.sidebarData));
    }
});
export default router;
