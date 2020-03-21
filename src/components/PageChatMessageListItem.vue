<template>
  <div class="card">
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">{{ message.nickname }}</h6>
      <div class="d-flex flex-row">
        <div class="d-flex flex-column">
          <span class="card-text">{{ message.text }}</span>
          <div v-if="isAuthUserMessage">
            <div class="mt-2" v-if="!areMessagesMatch(message)">
              <a
                @click.prevent="deleteMessage(message)"
                href="#"
                class="card-link"
                >Delete</a
              >
              <a
                @click.prevent="beginEditingMessage(message)"
                href="#"
                class="card-link"
                >Edit</a
              >
            </div>
            <template v-else>
              <a
                @click.prevent="updateMessage(message)"
                href="#"
                class="card-link"
                >Update</a
              >
              <a @click.prevent="cancelEditing" href="#" class="card-link"
                >Cancel</a
              >
            </template>
          </div>
        </div>
        <div class="ml-auto text-secondary mt-auto">
          <AppDate :unix-date="message.publishedAt" />
        </div>
      </div>
      <textarea
        v-model="editingMessage.text"
        class="form-control"
        v-if="areMessagesMatch(message)"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { messagesRef } from "../firebaseConfig";
import { mapGetters } from "vuex";
import AppDate from "./AppDate";

export default {
  name: "PageChatMessageListItem",
  components: { AppDate },
  props: {
    message: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      editingMessage: null
    };
  },
  computed: {
    ...mapGetters(["authUser"]),
    isAuthUserMessage() {
      return this.authUser ? this.message.uid === this.authUser.uid : null;
    }
  },
  methods: {
    areMessagesMatch(message) {
      return this.editingMessage
        ? message.id === this.editingMessage.id
        : false;
    },
    deleteMessage(message) {
      messagesRef.child(message.id).remove();
    },
    beginEditingMessage(message) {
      this.editingMessage = { ...message };
    },
    updateMessage(message) {
      messagesRef
        .child(message.id)
        .update({
          text: this.editingMessage.text
        })
        .then(() => {
          this.cancelEditing();
        });
    },
    cancelEditing() {
      this.editingMessage = null;
    }
  }
};
</script>

<style scoped></style>
