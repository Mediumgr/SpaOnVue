<template>
  <v-container>
    <v-carousel hide-delimiters class="mb-6">
      <v-carousel-item v-for="ad in ads" :key="ad.id" :src="ad.imageSrc">
        <v-row class="car-link mb-1">
          <v-btn class="error" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-row>
      <v-col class="col-sm-4" v-for="ad in ads" :key="ad.id">
        <v-card class="mx-auto" max-width="400px">
          <v-img :src="ad.imageSrc" height="200px"></v-img>
          <v-card-title>{{ ad.title }}</v-card-title>
          <v-card-subtitle class="subtitle">
            {{ ad.description }}
          </v-card-subtitle>
          <v-row class="mt-3 mb-1 mr-2">
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn text :to="'/ad/' + ad.id" :disabled="notRegistered">
                Open
              </v-btn>
              <v-btn color="primary" dark @click.stop="onClick(ad)">
                Buy
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
        <app-buy-modal :ad="orderAd" :openModal.sync="dialog"></app-buy-modal>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      orderAd: null
    };
  },
  methods: {
    onClick(ad) {
      this.dialog = true;
      this.orderAd = ad;
    }
  },
  computed: {
    ads() {
      return this.$store.getters.ads;
    },
    notRegistered() {
      return this.$store.getters.user === null;
    }
  }
};
</script>

<style scoped>
.car-link {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 5px 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.subtitle {
  min-height: 60px;
}
</style>
