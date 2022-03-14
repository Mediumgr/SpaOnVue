<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="col-sm-10 registrationForm" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary lighten-2" dark flat>
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-text-field
                label="E-mail"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                v-model="email"
                :error-messages="emailErrors"
                @blur="$v.email.$touch()"
                required
              >
              </v-text-field>
              <v-text-field
                id="password"
                label="Password"
                name="input-10-2"
                prepend-icon="mdi-lock"
                v-model="password"
                :counter="8"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                hint="At least 6 characters"
                class="input-group--focused"
                @click:append="show = !show"
                required
              >
              </v-text-field>
              <v-text-field
                id="confirmPassword"
                label="Confirm Password"
                name="input-10-2"
                prepend-icon="mdi-lock"
                v-model="confirmPassword"
                :counter="8"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min, rules.passwordMatch]"
                :type="show ? 'text' : 'password'"
                hint="At least 6 characters"
                class="input-group--focused"
                @click:append="show = !show"
                required
              >
              </v-text-field>
              <v-card-actions>
                <v-btn class="error" @click="resetForm">
                  Reset form
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="cyan lighten-1"
                  @click="onSubmit"
                  :disabled="!valid || loading"
                  :loading="loading"
                >
                  create account
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email }
  },
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      show: false,
      confirmPassword: "",
      rules: {
        required: value => !!value || "Minimum 6 characters required ",
        min: value =>
          (value && value.length >= 6 && value.length <= 8) ||
          "Min 6 characters and max 8",
        passwordMatch: value =>
          value === this.password || "Password should be matched"
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          password: this.password,
          email: this.email
        };
        this.$store
          .dispatch("registerUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});
      }
    },
    resetForm() {
      this.$refs.form.reset();
      this.$v.$reset();
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
.registrationForm {
  padding-top: 80px;
}
</style>
