import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/pages/PageNotFound.vue")
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/PageChat.vue")
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: () => import("@/pages/PageRegistration.vue")
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: () => import("@/pages/PageAuthorization.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
