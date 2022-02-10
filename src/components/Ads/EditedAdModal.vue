<template>
  <v-dialog v-model="open" max-width="290" :retain-focus="false">
    <v-card>
      <v-card-text>
        <v-card-text class="text-center text-h4 font-weight-bold">
          Edit ad
        </v-card-text>
        <v-text-field label="Title" name="title" v-model="title"></v-text-field>
        <v-text-field
          label="Description"
          name="description"
          v-model="description"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="yellow darken-1" text @click="onCancel">
          cancel
        </v-btn>
        <v-btn color="green darken-1" text @click="onSave">
          success
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["ad", "edited"],
  data() {
    return {
      description: this.ad.description,
      title: this.ad.title
    };
  },
  methods: {
    onCancel() {
      this.description = this.ad.description;
      this.title = this.ad.title;
      this.$emit("update:edited", false);
    },
    onSave() {
      if (this.ad.description !== "" && this.ad.title !== "") {
        this.$store.dispatch("updatedAd", {
          description: this.description,
          title: this.title,
          id: this.ad.id
        });
        this.$emit("update:edited", false);
      }
    }
  },
  computed: {
    open: {
      get: function() {
        return this.edited;
      },
      set: function() {
        this.$emit("update:edited", false);
      }
    }
  }
};
</script>
