<template>
  <div>
    <v-container fluid v-if="orders.length && localLoading === false">
      <h1 class="text-center mb-5 mt-8 text-lg-h4 ">Orders:</h1>
      <v-row>
        <v-col v-for="order in orders" :key="order.id" cols="12" sm="3">
          <v-col class="d-flex justify-center">
            <v-checkbox
              :ripple="false"
              class="checkbox"
              :input-value="order.done"
              @change="markDone(order)"
              color="primary"
              :label="order.name"
            >
            </v-checkbox>
          </v-col>
          <v-col class="d-flex justify-center">
            {{ order.phone }}
          </v-col>
          <v-col class="d-flex justify-center">
            <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="!orders.length && localLoading === false">
      <h3 align="center" class="text-sm-h5 mt-16 pl-4">
        You have no any orders from your presented cars. You can <router-link style="text-decoration: none; color: green;"
            :to="{ name: 'new' }">add</router-link> a car and then place an order of it to see how it works.
      </h3>
      <v-row align="center" justify="center" class="text-sm-h4 mt-16"
        ><router-link
          style="text-decoration: none; color: green;"
          :to="{ name: 'home' }"
          >or click here to buy a car!
        </router-link>
      </v-row>
    </v-container>
    <v-container v-else-if="localLoading === true" class="circular" d-flex>
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <v-progress-circular
            indeterminate
            color="green"
            :size="100"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      localLoading: false
    }
  },
  methods: {
    markDone (order) {
      this.$store
        .dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
    }
  },
  computed: {
    orders () {
      return this.$store.getters.orders
    }
  },
  created () {
    this.localLoading = true
    this.$store.dispatch('fetchOrders').finally(() => {
      this.localLoading = false
    })
  }
}
</script>

<style scoped>
.checkbox {
  margin-top: 0;
}
.circular {
  height: 420px;
}
</style>
