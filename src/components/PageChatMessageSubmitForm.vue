<template>
  <form @submit.prevent="storeMessage">
    <div class="form-group">
      <label>Message:</label>
      <textarea v-model="messageText" class="form-control"></textarea>
    </div>
    <div class="form-group">
      <p>Nickname: {{ this.nickname }}</p>
    </div>
    <button class="btn btn-primary">Send</button>
  </form>
</template>

<script>
import { messagesRef } from "../firebaseConfig";
import { mapGetters } from "vuex";

export default {
  name: "ChatMessageSubmit",
  data() {
    return {
      messageText: ""
    };
  },
  computed: {
    ...mapGetters(["nickname"])
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
