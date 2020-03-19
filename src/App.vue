<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { firebaseAuthentication } from "./firebaseConfig";

export default {
  created() {
    this.setFirebaseAuthEvents();
  },
  methods: {
    setFirebaseAuthEvents() {
      firebaseAuthentication.onAuthStateChanged(user => {
        this.$store.dispatch("authorize", {
          user
        });
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}
</style>
