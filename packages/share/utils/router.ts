import { Router, RouteRecordRaw } from "vue-router";
interface insertOptions {
    rootRoute: RouteRecordRaw;
    notFoundRoute: RouteRecordRaw;
    asyncRoutes?: RouteRecordRaw[];
}
/**
 * 处理路由重定向配置
 * @param route
 */
function handleRedirect(route) {
    if (route.children?.length > 0) {
        route.redirect = {
            name: route.children[0].name,
        };
        route.children.forEach((cRoute) => {
            handleRedirect(cRoute);
        });
    }
}
/**
 * 过滤权限路由
 */
export function filterRouter(routes, userRole: string): RouteRecordRaw[] {
    const res = routes.filter((route) => {
        const permission = route?.meta?.permission || [];
        const hasPermission =
            permission.includes(userRole) || permission.length === 0;
        if (Array.isArray(route.children) && hasPermission) {
            route.children = filterRouter(route.children, userRole);
        }
        return hasPermission && route.name != "404";
    });
    return res;
}
/**
 * 获取左侧导航栏数据
 */
function handleUseSideData(routes) {
    routes.forEach((route) => {
        if (Array.isArray(route.children)) {
            if (!route.children?.[0].meta?.name) {
                route.children = [];
            } else {
                handleUseSideData(route.children);
            }
        }
    });
    return routes;
}
export function getSideBarData(routes) {
    const copyRoutes = JSON.parse(JSON.stringify(routes));
    return handleUseSideData(copyRoutes);
}
/**
 * 插入动态路由
 * @param router
 * @param asyncRoutes
 * @param rootRoute
 */
export function insertRoutes(router: Router, options: insertOptions): void {
    options.rootRoute.children = options.asyncRoutes || [];
    handleRedirect(options.rootRoute);
    router.addRoute(options.notFoundRoute);
    router.addRoute(options.rootRoute);
}
/**
 * 重置路由（新增一个名称相同的路由，会删除之前的路由）
 * @param router
 * @param asyncRoutes
 */
export function resetRouter(router: Router, options: insertOptions): void {
    router.addRoute(options.rootRoute);
    router.removeRoute(options?.notFoundRoute?.name || "404");
}
/**
 * 获取所有左侧菜单栏可激活的name
 * @param routes
 * @returns
 */
export function findSideNames(routes: RouteRecordRaw[]): (string | symbol)[] {
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
/**
 * 查找菜单栏第一个可激活的name
 * @param routes
 * @returns string
 */
export function findDefaultRouteName(
    routes: RouteRecordRaw[]
): string | symbol {
    if (routes?.[0]?.children?.length > 0) {
        return findDefaultRouteName(routes[0].children);
    } else {
        return routes[0]?.name || "";
    }
}
