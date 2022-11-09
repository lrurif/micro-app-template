import "./publicPath.ts";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@monorepo/share/style/index.scss";
import installPinia from "@monorepo/share/plugins/pinia";
import { useMainStore } from "@/store/index";
import directives from "@/directives";
const dataListener = () => {
    const store = useMainStore();
    store.resetUserRole();
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
vm.provide("eventBus", data?.eventBus);
installPinia(vm);
vm.use(directives);
vm.directive("focus", {
    mounted: (el) => el.focus(),
});
vm.use(router).mount("#data-center");
console.log(vm, 'vm');