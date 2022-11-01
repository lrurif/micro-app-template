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

export function getSideBarData(routes) {
    routes.forEach(route => {
        if (Array.isArray(route.children)) {
            console.log(route, route.children?.[0].meta?.name)
            if(!route.children?.[0].meta?.name) {
                route.children = []
            }else {
                getSideBarData(route.children)
            }
        }
    })
    return routes;
}