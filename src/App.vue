<template>
  <div id="app">
    <TheNavbar />
    <router-view />
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
#app {
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}
</style>
