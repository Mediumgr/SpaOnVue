<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="col-sm-10 col-md-6 loginForm">
        <v-card class="elevation-12">
          <v-toolbar color="primary lighten-2" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-text-field
                label="E-mail"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                v-model="email"
                required
                :rules="[rules.emailRequired, rules.emailRegExp]"
              >
              </v-text-field>
              <v-text-field
                id="password"
                label="Password"
                name="input-10-2"
                prepend-icon="mdi-lock"
                v-model="password"
                :counter="8"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                hint="At least 6 characters"
                class="input-group--focused"
                @click:append="show = !show"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn class="error" @click="resetForm">
              Reset
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="cyan lighten-1"
              @click="onSubmit"
              :disabled="!valid || loading"
              :loading="loading"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      show: false,
      rules: {
        required: value => !!value || "Minimum 6 characters required ",
        min: value =>
          (value && value.length >= 6 && value.length <= 8) ||
          "from 6 to 8 characters required",
        emailRequired: value => !!value || "E-mail is required",
        emailRegExp: value => {
          const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regExp.test(value) || "Must be valid e-mail";
        }
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate) {
        const user = {
          password: this.password,
          email: this.email
        };
        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});
      }
    },
    resetForm() {
      this.$refs.form.reset();
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  created() {
    if (this.$route.query.loginError && this.$store.getters.user === null) {
      this.$store.dispatch(
        "setError",
        "Please register your account to view all pages"
      );
    }
  }
};
</script>

<style scoped>
.loginForm {
  padding-top: 115px;
}
</style>
