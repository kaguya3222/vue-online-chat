<template>
  <div id="chat" class="d-flex flex-column  mt-4 container">
    <b-spinner
      v-if="messages.length === 0"
      variant="primary"
      label="Spinning"
      class="align-self-center"
    ></b-spinner>
    <div v-else>
      <ChatMessageList />
      <hr />
      <ChatMessageSubmit />
      <h2 v-if="!authUser" class="text-center">
        In order to start chatting, please, sign in!
      </h2>
    </div>
  </div>
</template>

<script>
import ChatMessageList from "../components/PageChatMessageList";
import ChatMessageSubmit from "../components/PageChatFormMessageSubmit";
import { mapGetters } from "vuex";

export default {
  components: {
    ChatMessageSubmit,
    ChatMessageList
  },
  computed: {
    ...mapGetters(["authUser", "areMessagesLoaded", "messages"])
  }
};
</script>

<style scoped></style>
