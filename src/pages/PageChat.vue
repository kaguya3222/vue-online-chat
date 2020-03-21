<template>
  <div id="chat" class="mt-4 container">
    <ChatMessageList />
    <hr />
    <ChatMessageSubmit />
    <h2 class="text-center" v-if="!authUser">
      In order to start chatting, please, sign in!
    </h2>
  </div>
</template>

<script>
import ChatMessageList from "../components/PageChatMessageList";
import ChatMessageSubmit from "../components/PageChatMessageSubmitForm";
import { mapGetters } from "vuex";

export default {
  name: "PageChat.vue",
  computed: {
    ...mapGetters(["authUser"])
  },
  components: {
    ChatMessageSubmit,
    ChatMessageList
  }
};
</script>

<style scoped></style>
