import "./publicPath.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./main.ts"
createApp(App).use(router).mount("#app");
