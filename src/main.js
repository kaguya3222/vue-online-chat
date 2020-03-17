import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueBootstrap from "./plugins/vue-bootstrap";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  VueBootstrap,
  render: h => h(App)
}).$mount("#app");
