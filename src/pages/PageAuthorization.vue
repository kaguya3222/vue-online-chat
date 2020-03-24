<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center h-100"
  >
    <b-form
      @submit.prevent="authorizeAndMoveToHomePage"
      class="d-flex flex-column"
    >
      <b-form-group label="Email: " label-for="email">
        <b-form-input
          id="email"
          type="email"
          placeholder="Email"
          v-model="form.email"
        />
      </b-form-group>
      <b-form-group label="Password: " label-for="password">
        <b-form-input
          id="password"
          type="password"
          placeholder="Password"
          v-model="form.password"
          autocomplete="cc-password"
        ></b-form-input>
      </b-form-group>
      <b-button
        type="submit"
        class="align-self-center"
        variant="primary"
        :disabled="isAuthorizing"
      >
        <b-spinner small v-if="isAuthorizing"></b-spinner>
        <template v-else>Sign In</template>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { firebaseAuthentication } from "../firebaseConfig";
import page from "../mixins/page";

export default {
  mixins: [page],
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      isAuthorizing: false
    };
  },
  methods: {
    async authorizeAndMoveToHomePage() {
      await this.authorize();
      this.moveToHomePage();
    },
    async authorize() {
      this.isAuthorizing = true;
      await firebaseAuthentication.signInWithEmailAndPassword(
        this.form.email,
        this.form.password
      );
      this.isAuthorizing = false;
    }
  }
};
</script>

<style scoped></style>
