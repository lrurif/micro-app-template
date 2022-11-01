import empty from "@/layout/empty.vue";
export default [
    {
        path: "/overview-page",
        name: "overviewPage",
        component: empty,
        meta: {
            name: "首页概览",
            permission: ['admin'],
        },
        children: [
            {
                path: "data-overview",
                name: "dataOverview",
                meta: {
                    name: "数据看板",
                    permission: ["admin"],
                },
                component: () => import("@/views/overview-page/DataOverview.vue"),
            },
            {
                path: "trade-data",
                name: "tradeData",
                meta: {
                    name: "交易数据",
                    permission: ["admin"],
                },
                component: () => import("@/views/overview-page/TradeData.vue"),
            },
        ],
    },
];
