<template>
  <form @submit.prevent="storeMessage">
    <div class="form-group">
      <label>Message:</label>
      <textarea v-model="messageText" class="form-control"></textarea>
    </div>
    <div class="form-group">
      <label>Nickname:</label>
      <input v-model="nickname" class="form-control" />
    </div>
    <button class="btn btn-primary">Send</button>
  </form>
</template>

<script>
import { messagesRef } from "../firebaseConfig";
export default {
  name: "ChatMessageSubmit",
  data() {
    return {
      messageText: "",
      nickname: ""
    };
  },
  methods: {
    storeMessage() {
      messagesRef.push({ text: this.messageText, nickname: this.nickname });
      this.messageText = "";
    }
  }
};
</script>

<style scoped></style>
