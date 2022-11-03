import "./publicPath.ts";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@monorepo/share/style/normalize.css";
import "@monorepo/share/style/iconfont.css";
import installPinia from "@monorepo/share/plugins/pinia";
import { useMainStore } from "@/store/index";
import 'element-plus/dist/index.css'

const dataListener = () => {
    const store = useMainStore();
    store.setUserRole("");
    store.setActiveRouteName("");
    store.setPermissionRoutes([]);
    store.setAsyncRoutes([]);
};
// 监听卸载操作
window.addEventListener("unmount", dataListener);
window?.microApp?.addDataListener(() => {
    dataListener();
});
const vm = createApp(App);
installPinia(vm);
vm.use(router).mount("#app");
