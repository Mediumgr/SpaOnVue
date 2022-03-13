import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/storage'

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({
      commit
    }, {
      name,
      phone,
      adId,
      ownerId
    }) {
      const order = { name, phone, adId, done: false }
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        console.log(error)
        commit('setError', 'Server failure: Your order has not been sent')
        throw new Error()
      }
    },
    async fetchOrders ({
      commit,
      getters
    }) {
      commit('clearError')
      try {
        const orders = (await firebase.database().ref(`/users/${getters.user}/orders`).once('value')).val()
        const resultOrders = Object.keys(orders).map((key) => ({
          ...orders[key],
          done: orders[key].done,
          id: key
        }))
        commit('loadOrders', resultOrders)
      } catch (error) {
        commit('setError', 'Server failure: data has not been received')
        throw new Error()
      }
    },
    async markOrderDone ({
      commit,
      getters
    }, payload) {
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${getters.user}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('setError', 'Server failure: order has not been changed')
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    undoneOrders (state) {
      return state.orders.filter(order => !order.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
