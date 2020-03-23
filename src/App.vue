<template>
  <div id="app">
    <TheNavbar />
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";
import { firebaseAuthentication, messagesRef } from "./firebaseConfig";

export default {
  components: {
    TheNavbar
  },
  created() {
    this.setFirebaseDatabaseEvents();
    this.setFirebaseAuthEvents();
  },
  methods: {
    setFirebaseAuthEvents() {
      firebaseAuthentication.onAuthStateChanged(user => {
        this.$store.dispatch("authorize", {
          user
        });
      });
    },
    setFirebaseDatabaseEvents() {
      this.setMessagesRefEvents();
    },
    setMessagesRefEvents() {
      this.setEventsOnceMessagesAreLoaded();
      messagesRef.on("child_removed", snapshot => {
        this.$store.dispatch("removeMessage", { messageId: snapshot.key });
      });
      messagesRef.on("child_changed", snapshot => {
        this.$store.dispatch("updateMessage", {
          updatedMessage: { ...snapshot.val(), id: snapshot.key }
        });
      });
    },
    setEventsOnceMessagesAreLoaded() {
      messagesRef.once("value", () => {
        messagesRef.on("child_added", snapshot => {
          this.$store.dispatch("appendMessage", {
            message: {
              ...snapshot.val(),
              id: snapshot.key
            }
          });
        });
        this.$store.dispatch("messagesAreLoaded");
      });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.wrapper {
  height: 100%;
}
</style>
