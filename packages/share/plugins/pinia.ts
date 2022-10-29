import { createPinia } from "pinia";
import { App } from "vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
export default function installPinia(vm: App): void {
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);
    vm.use(pinia);
}
