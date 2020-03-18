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
import ChatMessageSubmit from "../components/PageChatMessageSubmitForm";
import { messagesRef } from "../firebaseConfig";
import { mapGetters } from "vuex";

export default {
  name: "PageChat.vue",
  components: {
    ChatMessageSubmit,
    ChatMessageList
  },
  created() {
    this.setFireBaseEvents();
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
  }
};
</script>

<style scoped></style>
