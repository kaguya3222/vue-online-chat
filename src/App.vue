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
import {
  firebaseAuthentication,
  messagesRef,
  usersRef
} from "./firebaseConfig";

export default {
  components: {
    TheNavbar
  },
  created() {
    this.setFirebaseAuthEvents();
    this.setFirebaseDatabaseEvents();
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
      this.setUsersRefEvents();
      this.setMessagesRefEvents();
    },
    setUsersRefEvents() {
      usersRef.on("child_added", snapshot => {
        this.$store.dispatch("appendUser", { user: snapshot.val() });
      });
    },
    setMessagesRefEvents() {
      messagesRef.on("child_added", snapshot => {
        this.$store.dispatch("appendMessage", {
          message: {
            ...snapshot.val(),
            id: snapshot.key
          }
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
