import Vue from "vue";
import { getMessageIndexById } from "../helpers";

export default {
  state: {
    messages: [],
    areMessagesLoaded: false
  },
  getters: {
    messages: state => state.messages,
    areMessagesLoaded: state => state.areMessagesLoaded
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
    },
    updateAreMessagesLoaded(state, { flag }) {
      state.areMessagesLoaded = flag;
    }
  },
  actions: {
    appendMessage(store, { message }) {
      store.commit("appendToMessages", { message });
    },
    removeMessage(store, { messageId }) {
      const index = getMessageIndexById({ messageId });
      store.commit("removeFromMessages", { index });
    },
    updateMessage(store, { updatedMessage }) {
      const index = getMessageIndexById({ messageId: updatedMessage.id });
      store.commit("updateMessages", {
        payload: { message: { ...updatedMessage }, index }
      });
    },
    messagesAreLoaded(store) {
      store.commit("updateAreMessagesLoaded", { flag: true });
    }
  }
};
