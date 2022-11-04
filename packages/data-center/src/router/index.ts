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

// 异步路由 -start
import userCenter from "./children/user-center";
import overviewPage from "./children/overview-page";
// 异步路由 -end
const ROUTE_ROOT_NAME = "Home";
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
export const asyncRoutes: Array<RouteRecordRaw> = [
    ...overviewPage,
    ...userCenter,
];

const router: Router = createRouter({
    history: createWebHistory(
        window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL
    ),
    routes,
});

router.beforeEach(async (to, from, next) => {
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
function findSideNames(routes) {
    let res = [];
    for (const route of routes) {
        if (route.name) {
            res.push(route.name);
        }
        if (route.children) {
            res = res.concat(findSideNames(route.children));
        }
    }
    return res;
}
function findDefaultRouteName(routes) {
    if (routes?.[0]?.children?.length > 0) {
        return findDefaultRouteName(routes[0].children);
    } else {
        return routes[0]?.name || "";
    }
}
router.afterEach((to) => {
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
