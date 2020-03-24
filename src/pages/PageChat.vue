<template>
  <div id="chat" class="d-flex flex-column  mt-4 container">
    <b-spinner
      variant="primary"
      label="Spinning"
      v-if="!areMessagesLoaded"
      class="align-self-center"
    ></b-spinner>
    <div v-else>
      <ChatMessageList />
      <hr />
      <ChatMessageSubmit />
      <h2 class="text-center" v-if="!authUser">
        In order to start chatting, please, sign in!
      </h2>
    </div>
  </div>
</template>

<script>
import ChatMessageList from "../components/PageChatMessageList";
import ChatMessageSubmit from "../components/PageChatMessageFormSubmit";
import { mapGetters } from "vuex";

export default {
  components: {
    ChatMessageSubmit,
    ChatMessageList
  },
  computed: {
    ...mapGetters(["authUser", "areMessagesLoaded"])
  }
};
</script>

<style scoped></style>
