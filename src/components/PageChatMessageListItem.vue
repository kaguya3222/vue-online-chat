<template>
  <div class="card">
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">{{ message.nickname }}</h6>
      <p class="card-text">{{ message.text }}</p>
      <textarea
        v-model="editingMessage.text"
        class="form-control"
        v-if="areMessagesMatch(message)"
      ></textarea>
      <template v-if="!areMessagesMatch(message)">
        <a @click.prevent="deleteMessage(message)" href="#" class="card-link"
          >Delete</a
        >
        <a
          @click.prevent="beginEditingMessage(message)"
          href="#"
          class="card-link"
          >Edit</a
        >
      </template>
      <template v-else>
        <a @click.prevent="updateMessage(message)" href="#" class="card-link"
          >Update</a
        >
        <a @click.prevent="cancelEditing" href="#" class="card-link">Cancel</a>
      </template>
    </div>
  </div>
</template>

<script>
import { messagesRef } from "../firebaseConfig";

export default {
  name: "PageChatMessageListItem",
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
