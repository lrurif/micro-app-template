import "./publicPath.ts";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@monorepo/share/style/normalize.css";
import "@monorepo/share/style/iconfont.css";
import installPinia from "@monorepo/share/plugins/pinia";
import { useMainStore } from "@/store/index";

const dataListener = () => {
    const store = useMainStore();
    store.setUserRole("");
    store.setActiveRouteName("");
    store.setPermissionRoutes([]);
    store.setSidebarData([]);
};
// 监听卸载操作
window.addEventListener("unmount", dataListener);
window?.microApp?.addDataListener((e) => {
    const { type } = e;
    if (type === "destory") {
        dataListener();
    }
});
const data = window.microApp?.getData();
const vm = createApp(App);
vm.provide("eventBus", data.eventBus);
installPinia(vm);
vm.use(router).mount("#data-center");
