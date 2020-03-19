import Vue from "vue";
import Vuex from "vuex";

import messages from "./modules/messages";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    messages,
    user
  }
});
