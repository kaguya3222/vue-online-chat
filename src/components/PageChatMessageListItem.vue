<template>
  <div class="card">
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">{{ message.nickname }}</h6>
      <div v-if="!isEditing" class="d-flex flex-row">
        <div class="d-flex flex-column">
          <span class="card-text">{{ message.text }}</span>
          <div v-if="isAuthUserMessage">
            <div class="mt-2">
              <a
                href="#"
                class="card-link"
                @click.prevent="deleteMessage(message)"
                >Delete</a
              >
              <a
                href="#"
                class="card-link"
                @click.prevent="beginEditingMessage(message)"
                >Edit</a
              >
            </div>
          </div>
        </div>
        <div class="ml-auto text-secondary mt-auto">
          <AppDate :unix-date="message.publishedAt" />
          <span v-if="isMessageUpdated"><small>(updated)</small></span>
        </div>
      </div>
      <MessageListItemFormEdit
        v-else
        :message="message"
        @onCancelEditing="stopEditingMessage"
      />
    </div>
  </div>
</template>

<script>
import AppDate from "./AppDate";
import MessageListItemFormEdit from "./PageChatMessageListItemFormEdit";
import { messagesRef } from "../firebaseTools";
import { mapGetters } from "vuex";
import notifications from "../mixins/notifications";

export default {
  components: { AppDate, MessageListItemFormEdit },
  mixins: [notifications],
  props: {
    message: {
      required: true,
      type: Object
    }
  },
  data() {
    return { isEditing: false };
  },
  computed: {
    ...mapGetters(["authUser"]),
    isAuthUserMessage() {
      return this.authUser ? this.message.uid === this.authUser.uid : null;
    },
    isMessageUpdated() {
      return this.message.isUpdated;
    }
  },
  methods: {
    deleteMessage(message) {
      messagesRef.child(message.id).remove();
      this.showDeleteNotification();
    },
    beginEditingMessage() {
      this.isEditing = true;
    },
    stopEditingMessage() {
      this.isEditing = false;
    },
    showDeleteNotification() {
      this.showNotification({
        message: `You deleted a message`,
        type: "warning"
      });
    }
  }
};
</script>

<style scoped></style>
