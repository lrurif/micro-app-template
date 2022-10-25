import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/data-center/:params*",
    name: "dataCenter",
    component: () => import("@/views/DataCenter.vue"),
  },
  {
    path: "/merchant/:params*",
    name: "merchant",
    component: () => import("@/views/Merchant.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
