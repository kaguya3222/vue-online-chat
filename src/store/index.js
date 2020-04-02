import Vue from "vue";
import Vuex from "vuex";

import messages from "./modules/messages";
import user from "./modules/users";

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
