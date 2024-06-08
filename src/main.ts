import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App).use(router).use(Toast).mount("#app");
