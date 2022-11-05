import { createPinia } from "pinia";
import { App } from "vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // pinia数据持久化插件
export default function installPinia(vm: App): void {
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);
    vm.use(pinia);
}
