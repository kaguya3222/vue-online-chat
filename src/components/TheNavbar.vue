<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="{ name: 'Home' }">Vue Online Chat</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if="nickname" right>
          <template v-slot:button-content>
            <em>{{ nickname }}</em>
          </template>
          <b-dropdown-item href="#" @click.prevent="signOut"
            >Sign Out</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <template v-else>
          <b-button
            squared
            variant="dark"
            text-variant="dark"
            :to="{ name: 'SignIn' }"
            >Sign in</b-button
          >
          <b-button
            class="ml-2"
            squared
            variant="outline-light"
            :to="{ name: 'SignUp' }"
            >Sign up</b-button
          >
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import { firebaseAuthentication } from "../firebaseTools";

export default {
  computed: { ...mapGetters(["nickname"]) },
  methods: {
    signOut() {
      firebaseAuthentication.signOut();
    }
  }
};
</script>

<style scoped></style>
