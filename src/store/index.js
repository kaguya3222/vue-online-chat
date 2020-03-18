import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: []
  },
  getters: {
    messages(state) {
      return state.messages;
    }
  },
  mutations: {
    appendToMessages(state, { message }) {
      state.messages.push(message);
    },
    removeFromMessages(state, { index }) {
      state.messages.splice(index, 1);
    },
    updateMessages(state, { payload }) {
      Vue.set(state.messages, payload.index, payload.message);
    }
  },
  actions: {
    appendMessage(store, { message }) {
      store.commit("appendToMessages", { message });
    },
    removeMessage(store, { messageId }) {
      const index = store.state.messages.findIndex(
        message => message.id === messageId
      );
      store.commit("removeFromMessages", { index });
    },
    updateMessage(store, { updatedMessage }) {
      const index = store.state.messages.findIndex(
        message => message.id === updatedMessage.id
      );
      store.commit("updateMessages", {
        payload: { message: updatedMessage, index }
      });
    }
  },
  modules: {}
});
