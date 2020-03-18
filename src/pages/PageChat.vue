<template>
  <div id="chat" class="container">
    <h1>Vue School Chat Room</h1>
    <ChatMessageList />
    <hr />
    <ChatMessageSubmit />
  </div>
</template>

<script>
import ChatMessageList from "../components/PageChatMessageList";
import { messagesRef } from "../firebaseConfig";
import { mapGetters } from "vuex";
import ChatMessageSubmit from "../components/PageChatMessageSubmitForm";

export default {
  name: "PageChat.vue",
  components: {
    ChatMessageSubmit,
    ChatMessageList
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["messages"])
  },
  methods: {
    setFireBaseEvents() {
      messagesRef.on("child_added", snapshot => {
        this.$store.dispatch("appendMessage", {
          message: { ...snapshot.val(), id: snapshot.key }
        });
      });
      messagesRef.on("child_removed", snapshot => {
        this.$store.dispatch("removeMessage", { messageId: snapshot.key });
      });
      messagesRef.on("child_changed", snapshot => {
        this.$store.dispatch("updateMessage", {
          updatedMessage: { ...snapshot.val(), id: snapshot.key }
        });
      });
    }
  },
  created() {
    this.setFireBaseEvents();
  }
};
</script>

<style scoped></style>
