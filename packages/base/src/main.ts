import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import microApp from "@micro-zoe/micro-app";
import installPinia from "@monorepo/share/plugins/pinia";
import "@monorepo/share/style/index.scss";
window.addEventListener("beforeunload", () => {
    microApp.setData("dataCenter", { type: "destory" });
});
microApp.start();
const vm = createApp(App);
installPinia(vm);
vm.use(router).mount("#app");
