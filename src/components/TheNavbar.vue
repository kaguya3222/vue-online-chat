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
          <BaseButton
            squared
            :variant="baseButtonVariants.dark"
            :to="{ name: 'SignIn' }"
            >Sign in</BaseButton
          >
          <BaseButton
            class="ml-2"
            squared
            :to="{ name: 'SignUp' }"
            :variant="baseButtonVariants.outlineLight"
          >
            Sign up
          </BaseButton>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import { firebaseAuthentication } from "@/firebaseTools";
import BaseButton from "@/components/BaseButton/index";
import { baseButtonVariants } from "@/components/BaseButton/constants";

export default {
  components: { BaseButton },
  computed: {
    ...mapGetters(["nickname"]),
    baseButtonVariants: () => baseButtonVariants
  },
  methods: {
    signOut() {
      firebaseAuthentication.signOut();
    }
  }
};
</script>
