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
import { firebaseAuthentication } from "./firebaseConfig";

export default {
  components: {
    TheNavbar
  },
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
