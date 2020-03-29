import Vue from "vue";
import VueRouter from "vue-router";
import { redirectOrPass } from "./helpers";

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
    component: () => import("@/pages/PageRegistration.vue"),
    meta: {
      requiresToBeUnauthorized: true
    }
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: () => import("@/pages/PageAuthorization.vue"),
    meta: {
      requiresToBeUnauthorized: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach(async (to, from, next) => {
  await redirectOrPass(to, next);
});

export default router;
