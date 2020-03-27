<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center h-100"
  >
    <b-form
      @submit.prevent="registerAndMoveToHomePage"
      class="d-flex flex-column"
    >
      <b-form-group label="Email: " label-for="email">
        <b-form-input
          id="email"
          type="email"
          placeholder="Email"
          v-model="form.email"
        ></b-form-input>
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
      <b-form-group label="Nickname: " label-for="name">
        <b-form-input
          id="name"
          type="text"
          placeholder="Nickname"
          v-model="form.nickname"
        ></b-form-input>
      </b-form-group>
      <b-button
        type="submit"
        class="align-self-center"
        variant="primary"
        :disabled="isRegistering"
      >
        <b-spinner small v-if="isRegistering"></b-spinner>
        <template v-else>Sign up</template>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { firebaseAuthentication } from "../firebaseConfig";
import { mapGetters } from "vuex";
import page from "../mixins/page";

export default {
  mixins: [page],
  data() {
    return {
      form: {
        email: null,
        password: null,
        nickname: null
      },
      isRegistering: false
    };
  },
  computed: {
    ...mapGetters(["authUser"])
  },
  methods: {
    async registerAndMoveToHomePage() {
      await this.register();
      this.moveToHomePage();
    },
    async register() {
      this.isRegistering = true;
      await firebaseAuthentication.createUserWithEmailAndPassword(
        this.form.email,
        this.form.password
      );
      await this.updateProfileWithRegistrationData({
        registrationData: { displayName: this.form.nickname }
      });
      this.isRegistering = false;
    },
    async addUserToDatabase() {
      await usersRef.child(`${this.authUser.uid}`).set({
        email: this.authUser.email,
        nickname: this.authUser.displayName,
        uid: this.authUser.uid
      });
    },
    async updateProfileWithRegistrationData({ registrationData }) {
      await this.$store.dispatch("updateUserProfile", {
        user: {
          ...this.authUser,
          ...registrationData
        }
      });
    },
    moveToHomePage() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style scoped></style>
