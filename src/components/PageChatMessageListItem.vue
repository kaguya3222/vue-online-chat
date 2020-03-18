<template>
  <div class="card">
    <div class="card-body">
      <!-- nickname -->
      <h6 class="card-subtitle mb-2 text-muted">{{ message.nickname }}</h6>
      <!-- content -->
      <p class="card-text">{{ message.text }}</p>
      <textarea
        v-model="editingMessage.text"
        class="form-control"
        v-if="isMessageMatched(message)"
      ></textarea>
      <!-- actions -->
      <template v-if="!isMessageMatched(message)">
        <a @click.prevent="deleteMessage(message)" href="#" class="card-link"
          >Delete</a
        >
        <a @click.prevent="editMessage(message)" href="#" class="card-link"
          >Edit</a
        >
      </template>
      <template v-else>
        <a @click.prevent="changeMessage(message)" href="#" class="card-link"
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
  name: "ChatMessage",
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
    deleteMessage(message) {
      messagesRef.child(message.id).remove();
    },
    editMessage(message) {
      this.editingMessage = { ...message };
    },
    changeMessage(message) {
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
    },
    isMessageMatched(message) {
      return this.editingMessage
        ? message.id === this.editingMessage.id
        : false;
    }
  }
};
</script>

<style scoped></style>
