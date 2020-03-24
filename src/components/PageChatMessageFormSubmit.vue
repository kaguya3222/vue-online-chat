<template>
  <form @submit.prevent="storeMessage" v-if="authUser">
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
  data() {
    return { messageText: "" };
  },
  computed: {
    ...mapGetters(["nickname", "authUser"])
  },
  methods: {
    storeMessage() {
      messagesRef.push({
        text: this.messageText,
        nickname: this.nickname,
        uid: this.authUser.uid,
        publishedAt: Math.round(Date.now() / 1000),
        isUpdated: false
      });
      this.messageText = "";
    }
  }
};
</script>

<style scoped></style>
