<template>
  <v-container>
    <v-row align="center" justify="center" v-if="myAds.length !== 0">
      <v-col class="col-sm-10 col-lg-8">
        <h1 class="text--secondary mb-5 text-center">My cars for clearance</h1>
        <v-card class="elevation-10 mb-6" v-for="ad in myAds" :key="ad.id">
          <v-row>
            <v-col :cols="6" class="ml-3">
              <v-img :src="ad.imageSrc" height="152" contain></v-img>
            </v-col>
            <v-col>
              <v-card-text>
                <h2
                  class="text--primary mb-3 text-subtitle-1 text-sm-h6 font-weight-black"
                >
                  {{ ad.title }}
                </h2>
                <p class="text-caption text-sm-subtitle-2">
                  {{ ad.description }}
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info" :to="'/ad/' + ad.id">Open</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-if="myAds.length === 0">
      <v-col class="col-sm-8 col-md-7 text-center mt-12">
        <h1 class="text--secondary">
          You have no your own cars for clearance, you can add it
          <router-link
            style="text-decoration: none; color: green;"
            :to="{ name: 'new' }"
            >here
          </router-link>
          .
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds;
    }
  }
};
</script>
