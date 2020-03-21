<template>
  <div id="chat" class="mt-4 container">
    <ChatMessageList />
    <hr />
    <ChatMessageSubmit />
  </div>
</template>

<script>
import ChatMessageList from "../components/PageChatMessageList";
import ChatMessageSubmit from "../components/PageChatMessageSubmitForm";
import { messagesRef } from "../firebaseConfig";
import { mapGetters } from "vuex";

export default {
  name: "PageChat.vue",
  components: {
    ChatMessageSubmit,
    ChatMessageList
  }
};
</script>

<style scoped></style>
