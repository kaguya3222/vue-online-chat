<template>
  <div>
    <ChatMessageListItem
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
  </div>
</template>

<script>
import ChatMessageListItem from "./PageChatMessageListItem";
import { mapGetters } from "vuex";

export default {
  components: { ChatMessageListItem },
  computed: { ...mapGetters(["messages"]) }
};
</script>

<style scoped></style>
