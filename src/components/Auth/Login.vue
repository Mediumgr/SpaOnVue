<template>
<v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="cyan lighten-1"
                  dark
                  flat
                >
                  <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="valid" ref="form" validation>
                    <v-text-field
                      label="Email"
                      name="email"
                      prepend-icon="mdi-account"
                      type="email"
                      v-model="email"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="cyan lighten-1" @click="onSubmit">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: '',
      valid: false
    }
  },
  methods: {
    onSubmit () {

    }
  }
}
// начать с 6 видео 8:43
</script>
