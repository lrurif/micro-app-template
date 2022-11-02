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
const ROUTE_ROOT_NAME = "Home";
import {
    filterRouter,
    getSideBarData,
    insertRoutes,
} from "@monorepo/share/utils/router";
const rootRoute = {
    path: "/",
    name: ROUTE_ROOT_NAME,
    component: Home,
}
const routes: Array<RouteRecordRaw> = [
    rootRoute,
    {
        path: "/404",
        name: "404",
        component: NotFound,
    },
];
export const asyncRoutes: Array<RouteRecordRaw> = [
    ...overviewPage,
    ...userCenter,
    {
        path: "/:pathMatch(.*)",
        redirect: "/404",
        name: "404",
    },
];

const router: Router = createRouter({
    history: createWebHistory(
        window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL
    ),
    routes,
});

const mockPromise = function () {
    return new Promise((resolve) => {
        setTimeout(() => {
            const store = useMainStore();
            store.setUserRole("admin");
            console.log("展示");
            resolve(1);
        }, 1000);
    });
};
router.beforeEach(async (to, from, next) => {
    const store = useMainStore();
    const whiteList: (string | symbol)[] = ["404"];
    const hasWhite: boolean = whiteList.includes(to.name);
    if (hasWhite) {
        next();
    } else {
        if (store.userRole) {
            next();
        } else {
            try {
                await mockPromise();
                const permissionRoutes = filterRouter(asyncRoutes, "admin");
                const copyRoutes = JSON.parse(JSON.stringify(permissionRoutes));
                const res = getSideBarData(copyRoutes);
                store.setPermissionRoutes(permissionRoutes);
                store.setAsyncRoutes(res);
                insertRoutes(router, permissionRoutes, rootRoute);
                next({
                    ...to,
                });
            } catch (e) {
                console.log("error", e);
                next({
                    name: "login",
                });
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
router.afterEach((to, from, failure) => {
    const store = useMainStore();
    const routeNames = findSideNames(store.asyncRoutes);
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
        store.setActiveRouteName(findDefaultRouteName(store.asyncRoutes));
    }
});
export default router;
