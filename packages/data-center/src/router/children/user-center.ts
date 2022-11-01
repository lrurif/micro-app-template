import empty from "@/layout/empty.vue";
export default [
    {
        path: "/user-center",
        name: "userCenter",
        component: empty,
        meta: {
            name: "用户中心",
            permission: ["admin"],
        },
        
        children: [
            {
                path: "user-list-out",
                name: "userListOut",
                meta: {
                    name: "用户列表",
                    permission: ["admin"],
                },
                component: empty,
                redirect: {
                    name: "userList"
                },
                children: [
                    {
                        path: "user-list",
                        name: "userList",
                        component: () =>
                            import("@/views/user-center/UserList.vue"),
                    },
                    {
                        path: "operate-user",
                        name: "operateUser",
                        component: () =>
                            import("@/views/user-center/OperateUser.vue"),
                    },
                ],
            },
        ],
    },
];
