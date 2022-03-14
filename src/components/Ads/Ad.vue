<template>
  <v-container>
    <v-row align="center" justify="center" v-if="!loading">
      <v-col :cols="10">
        <v-card class="elevation-14">
          <v-img contain :src="ad.imageSrc"></v-img>
          <v-card-text class="text--primary">
            <h1 class="text--primary mb-1">{{ ad.title }}</h1>
            <p>{{ ad.description }}</p>
          </v-card-text>
          <v-row>
            <v-spacer></v-spacer>
            <v-card-actions class="mr-3">
              <v-btn
                color="amber"
                dark
                @click.stop="editedDialog = true"
                class="mr-2"
                v-if="isOwner"
              >
                <v-icon left>
                  mdi-pencil
                </v-icon>
                Edit
              </v-btn>
              <edited-ad-modal :ad="ad" :edited.sync="editedDialog" />
              <v-btn color="primary" dark @click.stop="dialog = true">
                Buy
              </v-btn>
              <app-buy-modal :ad="ad" :openModal.sync="dialog"></app-buy-modal>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditedAdModal from "./EditedAdModal.vue";

export default {
  props: ["id"], // props: true (router/index.js)
  data() {
    return {
      dialog: false,
      editedDialog: false
    };
  },
  components: { EditedAdModal },
  computed: {
    ad() {
      return this.$store.getters.addById(this.id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isOwner() {
      return this.ad.ownerId === this.$store.getters.user;
    }
  }
};
</script>
