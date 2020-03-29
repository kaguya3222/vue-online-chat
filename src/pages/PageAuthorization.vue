<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center h-100"
  >
    <b-form @submit.prevent="authorize" class="d-flex flex-column">
      <b-form-group label="Email: " label-for="email">
        <b-form-input
          id="email"
          type="email"
          placeholder="Email"
          :state="isFormValid"
          v-model="$v.form.email.$model"
        />
      </b-form-group>
      <b-form-group label="Password: " label-for="password">
        <b-form-input
          id="password"
          type="password"
          placeholder="Password"
          v-model="$v.form.password.$model"
          :state="isFormValid"
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
    <span v-if="isAuthorizingFailed" class="text-danger mt-1"
      >Invalid email or password</span
    >
  </div>
</template>

<script>
import { firebaseAuthentication } from "../firebaseConfig";
import page from "../mixins/page";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [page, validationMixin],
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      isAuthorizing: false,
      isAuthorizingFailed: false
    };
  },
  validations: {
    form: {
      email: { required },
      password: { required },
      isValid() {
        return !this.isAuthorizingFailed;
      }
    }
  },
  computed: {
    isFormValid() {
      return this.$v.form.isValid ? null : false;
    }
  },
  methods: {
    async authorize() {
      this.isAuthorizing = true;
      await firebaseAuthentication
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.authorizingIsPassed();
        })
        .catch(() => {
          this.authorizingIsFailed();
        });
      this.isAuthorizing = false;
    },
    authorizingIsFailed() {
      this.isAuthorizingFailed = true;
    },
    authorizingIsPassed() {
      this.isAuthorizingFailed = false;
      if (!this.isAuthorizingFailed) this.moveToHomePage();
    }
  }
};
</script>

<style scoped></style>
