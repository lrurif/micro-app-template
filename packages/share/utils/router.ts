export function filterRouter(routes, userRole) {
    const res = routes.filter((route) => {
        const permission = route?.meta?.permission || [];
        const hasPermission = permission.includes(userRole) || permission.length === 0;
        if (Array.isArray(route.children) && hasPermission) {
            route.children = filterRouter(route.children, userRole);
        }
        return hasPermission;
    });
    return res;
}
