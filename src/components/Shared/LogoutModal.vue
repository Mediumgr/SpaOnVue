<template>
  <v-dialog v-model="openDialog" max-width="500" :retain-focus="false">
    <v-card class="mx-auto">
      <v-card-text class="text-center text-h5 pt-3">
        Do you want to leave?
      </v-card-text>
      <v-spacer></v-spacer>
      <v-container class="d-flex">
        <v-row>
          <v-spacer></v-spacer>
          <v-col :cols="3" align="center" justify="center">
            <v-btn @click="onLogout" class="red" dark>
              Exit
            </v-btn>
          </v-col>
          <v-col :cols="3" align="center" justify="center">
            <v-btn @click="stayLoggedIn" class="green" dark>
              No
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['openDialog'],
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
      this.$emit('update:openDialog', false)
    },
    stayLoggedIn () {
      this.$emit('update:openDialog', false)
    }
  }
}
</script>

<style scoped></style>
