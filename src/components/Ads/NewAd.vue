<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col class="col-sm-7 col-md-4">
        <h2 class="text--secondary mb-3 ml-4">Create new car</h2>
        <v-form v-model="valid" ref="form" validation>
          <v-text-field
            label="Ad tittle"
            name="title"
            type="text"
            v-model="title"
            required
            :rules="[rules.requiredTitle]"
          ></v-text-field>
          <v-textarea
            label="Ad description"
            name="description"
            v-model="description"
            :rules="[rules.requiredDescription]"
            class="input-group--focused"
          ></v-textarea>
        </v-form>
        <v-row class="mt-3 ml-1 mb-3">
          <v-btn class="warning" @click="triggerUpload">
            Picture
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
          <input
            type="file"
            ref="inputFile"
            id="inputFile"
            accept="image/*"
            @change="onFileChange"
          />
        </v-row>
        <v-row class="mt-3 ml-1">
          <img :src="imageSrc" height="80px" width="350px" v-if="imageSrc" />
        </v-row>
        <v-row class="mt-3 ml-1 mb-3">
          <v-switch
            v-model="promo"
            label="Add to promotion"
            color="primary"
            hide-details
          >
          </v-switch>
        </v-row>
        <v-row class="mt-4 ml-1 mb-3">
          <v-btn
            :loading="loading"
            :disabled="!(valid && promo) || loading || !image"
            class="success"
            @click="creatAd"
            >Create new car</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      valid: false,
      promo: false,
      imageSrc: "",
      image: null,
      rules: {
        requiredTitle: value => !!value || "Title is required",
        requiredDescription: value => !!value || "Description is required"
      }
    };
  },
  methods: {
    creatAd() {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        };
        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    },
    triggerUpload() {
      this.$refs.inputFile.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
#inputFile {
  display: none;
}
</style>
