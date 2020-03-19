import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/PageChat.vue")
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => import("@/pages/PageRegistration.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
