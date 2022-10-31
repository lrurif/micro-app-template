import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from "vue-router";
import Home from "@/views/Home.vue";
import NotFound from "@monorepo/share/components/404/index.vue";
import { mainStore } from "@/store/index";
import empty from "@/layout/empty.vue"
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: () => import("@/views/About.vue")
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
    {
        path: "/user-center",
        name: "user-center",
        component: empty,
        meta: {
            permission: ['admin']
        },
        children: [
            {
                path: "userList",
                name: "userList",
                component: () => import("@/views/user-center/UserList.vue"),
                meta: {
                    title: "用户列表"
                },
            },
            {
                path: "operateUser",
                name: "operateUser",
                component: () => import("@/views/user-center/OperateUser.vue"),
                meta: {
                    title: "新增/编辑用户"
                },
            }
        ]
    },
];

const router: Router = createRouter({
    history:createWebHistory((window as any).__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL),
    routes,
});

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
    const store = mainStore();
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

