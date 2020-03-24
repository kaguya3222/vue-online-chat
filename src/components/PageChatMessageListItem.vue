<template>
  <div class="card">
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">{{ message.nickname }}</h6>
      <div v-if="!isMessageEditing" class="d-flex flex-row">
        <div class="d-flex flex-column">
          <span class="card-text">{{ message.text }}</span>
          <div v-if="isAuthUserMessage">
            <div class="mt-2">
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
          </div>
        </div>
        <div class="ml-auto text-secondary mt-auto">
          <AppDate :unix-date="message.publishedAt" />
        </div>
      </div>
      <div v-else class="mt-2">
        <textarea v-model="editingMessage.text" class="form-control"></textarea>
        <div class="mt-1">
          <a @click.prevent="updateMessage(message)" href="#" class="card-link"
            >Update</a
          >
          <a @click.prevent="cancelEditing" href="#" class="card-link"
            >Cancel</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { messagesRef } from "../firebaseConfig";
import { mapGetters } from "vuex";
import AppDate from "./AppDate";
import MessageListItemFormEdit from "./MessageListItemFormEdit";

export default {
  name: "PageChatMessageListItem",
  components: { AppDate, MessageListItemFormEdit },
  props: {
    message: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      isEditing: false
    };
  },
  computed: {
    ...mapGetters(["authUser"]),
    isAuthUserMessage() {
      return this.authUser ? this.message.uid === this.authUser.uid : null;
    },
    isMessageEditing() {
      return this.isEditing;
    },
    isEdited() {
      return this.message.isEdited;
    }
  },
  methods: {
    deleteMessage(message) {
      messagesRef.child(message.id).remove();
    },
    beginEditingMessage() {
      this.isEditing = true;
    },
    stopEditingMessage() {
      this.isEditing = false;
    }
  }
};
</script>

<style scoped></style>
