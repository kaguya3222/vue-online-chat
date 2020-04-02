<template>
  <div id="chat" class="d-flex flex-column  mt-4 container">
    <b-spinner
      v-if="!areMessagesLoaded"
      variant="primary"
      label="Spinning"
      class="align-self-center"
    ></b-spinner>
    <div v-else>
      <h2 v-if="isAtLeastOneMessagePosted">Be the first to post a message!</h2>
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
import notifications from "../mixins/notifications";

export default {
  components: {
    ChatMessageSubmit,
    ChatMessageList
  },
  mixins: [notifications],
  data() {
    return {
      messagesLengthBeforePost: null,
      isLoading: true
    };
  },
  computed: {
    ...mapGetters([
      "userByProperty",
      "messages",
      "nickname",
      "areMessagesLoaded",
      "authUser"
    ]),
    shouldPostNotificationBeShown() {
      return this.isMessageNew && this.isMessagePostedByAnotherUser;
    },
    isMessageNew() {
      return this.messages.length > this.messagesLengthBeforePost;
    },
    isMessagePostedByAnotherUser() {
      return this.userThatPublishedMessage.nickname !== this.nickname;
    },
    userThatPublishedMessage() {
      return this.userByProperty({
        property: { name: "uid", value: this.lastPublishedMessage.uid }
      });
    },
    lastPublishedMessage() {
      return this.messages[this.messages.length - 1];
    },
    isAtLeastOneMessagePosted() {
      return this.messages.length === 0;
    }
  },
  watch: {
    areMessagesLoaded: {
      handler(value) {
        if (value) {
          this.messagesLengthBeforePost = this.messages.length;
        }
      }
    },
    messages: {
      handler(value) {
        this.showMessagePostNotification();
        this.messagesLengthBeforePost = value.length;
      }
    }
  },
  methods: {
    showMessagePostNotification() {
      if (this.shouldPostNotificationBeShown) {
        this.showNotification({
          message: `${this.userThatPublishedMessage.nickname} just posted a message!`,
          type: "success"
        });
      }
    }
  }
};
</script>

<style scoped></style>
