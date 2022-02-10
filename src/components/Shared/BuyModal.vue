<template>
  <v-container>
    <v-dialog
      v-model="open"
      max-width="290"
      :retain-focus="false"
      content-class="vDialog">
      <v-card class="cardStyle">
        <v-card-text class="text-center text-h5">
          Do you want to buy it?
        </v-card-text>
        <v-divider></v-divider>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:10">
              <v-text-field
                label="Your name"
                name="name"
                :counter="10"
                :error-messages="errors"
                v-model="name"
                required>
              </v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="phone"
              :rules="{
                required: true,
                digits: 11,
                regex: '^(8)\\d{10}$'
              }">
              <v-text-field
                label="Your phone"
                name="phone"
                v-model="phone"
                :counter="11"
                :error-messages="errors"
                required>
              </v-text-field>
            </validation-provider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="yellow darken-1"
                text
                @click="onCancel"
                :disabled="localLoading">
                Close
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                type="submit"
                @click="onSave"
                :disabled="invalid"
                :loading="localLoading">
                Buy it!
              </v-btn>
            </v-card-actions>
          </form>
        </validation-observer>
      </v-card>
    </v-dialog>
    <v-dialog
      max-width="290"
      v-model="openSuccess"
      v-if="openSuccessDialog"
      persistent>
      <v-card class="successCard">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken"
            text
            @click.stop="openSuccessDialog = false"
            width="20px"
            class="relativeBtn">
            <span class="material-icons">
              close
            </span>
          </v-btn>
        </v-card-actions>
        <v-card-text class="text-center mt-4 text-h6 card">
          {{ success }}
          <v-icon class="icon">done_outline</v-icon>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { required, digits, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})"
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {8*********}"
});

export default {
  props: ["ad", "openModal"],
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      phone: "",
      name: "",
      localLoading: false,
      success: "Заказ отправлен",
      openSuccess: true,
      openSuccessDialog: false
    };
  },
  methods: {
    onCancel() {
      this.phone = "";
      this.name = "";
      this.$emit("update:openModal", false);
    },
    submit() {
      this.$refs.observer.validate();
    },
    onSave() {
      if (
        this.name !== "" &&
        this.phone !== "" &&
        this.$refs.observer.validate()
      ) {
        this.localLoading = true;
        this.$store
          .dispatch("createOrder", {
            phone: this.phone,
            name: this.name,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
          .then(() => {
            this.openSuccessDialog = true;
          })
          .finally(() => {
            this.phone = "";
            this.name = "";
            this.localLoading = false;
            this.$emit("update:openModal", false);
          });
      }
    }
  },
  computed: {
    open: {
      get: function() {
        return this.openModal;
      },
      set: function() {
        this.$emit("update:openModal", false);
      }
    }
  }
};
</script>

<style>
.cardStyle {
  padding: 20px;
}
.vDialog {
  box-shadow: none !important;
}
.icon {
  position: relative;
  top: -2px;
}
.relativeBtn {
  position: relative;
  top: -10px;
  right: -25px;
}
.successCard {
  overflow: hidden;
}
.card {
  height: 80px;
}
</style>
