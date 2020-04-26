<template>
  <div
    v-if="!authUser"
    class="d-flex flex-column justify-content-center align-items-center h-100"
  >
    <b-form @submit.prevent="formIsSubmitted" class="d-flex flex-column">
      <PageRegistrationInput
        v-for="(input, index) in Object.values(form)"
        :key="index"
        :input-metadata="input.metadata"
        :validation="$v.form[input.metadata.validationName].value"
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
    <p class="mt-2">
      Already have an account?
      <router-link :to="{ name: 'SignIn' }">Sign in</router-link>
    </p>
  </div>
</template>

<script>
import PageRegistrationInput from "../components/PageRegistrationInput";
import { firebaseAuthentication, usersRef } from "../firebaseTools";
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
      form: {
        email: {
          metadata: {
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
          value: null
        },
        password: {
          metadata: {
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
          value: null
        },
        confirmPassword: {
          metadata: {
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
          value: null
        },
        nickname: {
          metadata: {
            label: "Nickname",
            id: "nickname",
            type: "text",
            placeholder: "Nickname",
            validationName: "nickname",
            validationErrors: {
              required: "Required",
              minLength: "Nickname length should be at least 3 characters"
            }
          },
          value: null
        }
      },
      isRegistering: false
    };
  },
  validations: {
    form: {
      email: {
        value: {
          required,
          email,
          isUnique(value) {
            return !this.userByProperty({ property: { name: "email", value } });
          }
        }
      },
      password: {
        value: {
          required,
          minLength: minLength(6)
        }
      },
      confirmPassword: {
        value: {
          required,
          sameAs: sameAs(function() {
            return this.form.password.value;
          })
        }
      },
      nickname: {
        value: {
          required,
          minLength: minLength(3)
        }
      }
    }
  },
  computed: {
    ...mapGetters(["authUser", "userByProperty"]),
    isDisabled() {
      return this.$v.form.$invalid || this.isRegistering;
    }
  },
  methods: {
    async formIsSubmitted() {
      await this.register();
      this.addUserToDatabase();
      this.moveToHomePage();
    },
    async register() {
      this.isRegistering = true;
      await firebaseAuthentication.createUserWithEmailAndPassword(
        this.form.email.value,
        this.form.password.value
      );
      await this.updateProfileWithRegistrationData({
        registrationData: { displayName: this.form.nickname.value }
      });
      this.isRegistering = false;
    },
    addUserToDatabase() {
      usersRef.child(`${this.authUser.uid}`).set({
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
