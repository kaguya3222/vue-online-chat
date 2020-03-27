<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center h-100"
  >
    <b-form
      @submit.prevent="registerAndMoveToHomePage"
      class="d-flex flex-column"
    >
      <PageRegistrationInput
        v-for="(inputMetadata, index) in formInputMetadata"
        :key="index"
        :inputMetadata="inputMetadata"
        :validation="$v.formInputValues[inputMetadata.validationName]"
      />
      <b-button
        type="submit"
        class="align-self-center"
        variant="primary"
        :disabled="isDisabled"
      >
        <b-spinner small v-if="isRegistering"></b-spinner>
        <template v-else>Sign up</template>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import PageRegistrationInput from "../components/PageRegistrationInput";
import { firebaseAuthentication, usersRef } from "../firebaseConfig";
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import page from "../mixins/page";

export default {
  components: {
    PageRegistrationInput
  },
  mixins: [page, validationMixin],
  data() {
    return {
      formInputMetadata: [
        {
          label: "Email",
          id: "email",
          type: "email",
          placeholder: "Email",
          validationName: "email",
          validationErrors: {
            required: "Required",
            isUnique: "Email is already taken",
            email: "Email is not valid"
          }
        },
        {
          label: "Password",
          id: "password",
          type: "password",
          placeholder: "Password",
          validationName: "password",
          validationErrors: {
            required: "Required",
            minLength: "Password length should be at least 6 characters"
          }
        },
        {
          label: "Confirm Password",
          id: "confirmPassword",
          type: "password",
          placeholder: "Confirm Password",
          validationName: "confirmPassword",
          validationErrors: {
            required: "Required",
            sameAs: "Password mismatch"
          }
        },
        {
          label: "Nickname",
          id: "nickname",
          type: "text",
          placeholder: "Nickname",
          validationName: "nickname",
          validationErrors: {
            required: "Required",
            minLength: "Nickname length should be at least 3 characters"
          }
        }
      ],
      formInputValues: {
        email: null,
        password: null,
        confirmPassword: null,
        nickname: null
      },
      isRegistering: false
    };
  },
  validations: {
    formInputValues: {
      email: {
        required,
        email,
        isUnique(value) {
          return !this.user({ email: value });
        }
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAs: sameAs("password")
      },
      nickname: {
        required,
        minLength: minLength(3)
      }
    }
  },
  computed: {
    ...mapGetters(["authUser", "user"]),
    isDisabled() {
      return this.$v.formInputValues.$invalid || this.isRegistering;
    }
  },
  methods: {
    async registerAndMoveToHomePage() {
      await this.register();
      this.moveToHomePage();
    },
    async register() {
      this.isRegistering = true;
      await firebaseAuthentication.createUserWithEmailAndPassword(
        this.formInputValues.email,
        this.formInputValues.password
      );
      await this.updateProfileWithRegistrationData({
        registrationData: { displayName: this.formInputValues.nickname }
      });
      await this.addUserToDatabase();
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
    }
  }
};
</script>

<style scoped></style>
