import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueBootstrap from "./plugins/vue-bootstrap";
import vuelidate from "./plugins/vuelidate";
import "native-toast/dist/native-toast.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  VueBootstrap,
  vuelidate,
  render: h => h(App)
}).$mount("#app");
