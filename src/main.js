import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag";
import "./index.css";
createApp(App)
  .use(store) // state management
  .use(router) // managing links and metadata
  .use(VueGtag, {
    config: { id: process.env.VUE_APP_GTAG_ID } //google analytic tag
  })
  .mount("#app");