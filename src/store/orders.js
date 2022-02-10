import firebase from 'firebase/compat/app'
import 'firebase/compat/database';
import 'firebase/compat/storage';

class Order {
  constructor(name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder({
      commit
    }, {
      name,
      phone,
      adId,
      ownerId
    }) {
      const order = new Order(name, phone, adId)
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw new Error
      }
    },
    async fetchOrders({
      commit,
      getters
    }) {
      commit('clearError')
      const resultOrders = []
      try {
        const firebaseVal = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = firebaseVal.val()
        Object.keys(orders).forEach(key => {
          const order = orders[key]
          resultOrders.push(new Order(order.name, order.phone, order.adId, order.done, key))
        })
        commit('loadOrders', resultOrders)
      } catch (error) {
        commit('setError', error.message)
        throw new Error
      }
    },
    async markOrderDone({
      commit,
      getters
    }, payload) {
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('setError', 'Error: your input data has not been sent due to server failure(order.js)')
      }
    }
  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(order => order.done)
    },
    undoneOrders(state) {
      return state.orders.filter(order => !order.done)
    },
    orders(state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
