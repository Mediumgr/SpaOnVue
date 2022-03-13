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
          <v-form ref="observer" v-model="valid">
            <v-text-field
              label="Name"
              name="name"
              type="text"
              v-model="name"
              required
              :rules="[rules.nameRequired]"
            ></v-text-field>
            <v-text-field
              label="Phone"
              name="phone"
              type="text"
              v-model="phone"
              required
              :rules="[rules.phoneRequired, rules.phoneRegExp]"
            >
            </v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="yellow darken-2"
                @click="onCancel"
                :disabled="localLoading">
                Close
              </v-btn>
              <v-btn
                color="green darken-1"
                @click="onSave"
                :disabled="!valid"
                :loading="localLoading">
                Buy it!
              </v-btn>
            </v-card-actions>
          </v-form>
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
export default {
  props: ['ad', 'openModal'],
  data () {
    return {
      phone: '',
      name: '',
      localLoading: false,
      success: 'Заказ отправлен',
      openSuccess: true,
      openSuccessDialog: false,
      valid: false,
      rules: {
        nameRequired: value => !!value || 'Type your name',
        phoneRequired: value => !!value || 'Type your phone number',
        phoneRegExp: value => {
          const regExp = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/
          return regExp.test(value) || 'Please type your phone number: +7 (911) 111-11-11'
        }
      }
    }
  },
  methods: {
    onCancel () {
      this.phone = ''
      this.name = ''
      this.$emit('update:openModal', false)
    },
    onSave () {
      if (
        this.name !== '' &&
        this.phone !== '' &&
        this.$refs.observer.validate()
      ) {
        this.localLoading = true
        this.$store
          .dispatch('createOrder', {
            phone: this.phone,
            name: this.name,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
          .then(() => {
            this.openSuccessDialog = true
          })
          .finally(() => {
            this.phone = ''
            this.name = ''
            this.localLoading = false
            this.$emit('update:openModal', false)
          })
      }
    }
  },
  computed: {
    open: {
      get: function () {
        return this.openModal
      },
      set: function () {
        this.$emit('update:openModal', false)
      }
    }
  }
}
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
