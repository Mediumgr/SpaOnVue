import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import BuyModal from '@/components/Shared/BuyModal'
import LogoutModal from '@/components/Shared/LogoutModal'
import firebase from 'firebase/compat/app'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModal)
Vue.component('app-logout-modal', LogoutModal)

new Vue({
  router,
  store,
  vuetify,
  props: {
    source: String
  },
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAkmJC44dDYy7DpDipE7FdcrcdziB8UaZI',
      authDomain: 'itc-ads-5539f.firebaseapp.com',
      databaseURL: 'https://itc-ads-5539f-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'itc-ads-5539f',
      storageBucket: 'itc-ads-5539f.appspot.com',
      messagingSenderId: '843900498226',
      appId: '1:843900498226:web:3c8c28b379d665c1b6a72b',
      measurementId: 'G-D6SNMTS0YB'
    })
    firebase.auth().onAuthStateChanged(() => {
      this.$store.dispatch('autoLoginUser')
    })
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
