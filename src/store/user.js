import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({
      dispatch, commit
    }, {
      email,
      password
    }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const userId = await dispatch('getUid')
        commit('setUser', userId)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.code)
        throw new Error()
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async loginUser ({
      dispatch, commit
    }, {
      email,
      password
    }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        const userId = await dispatch('getUid')
        commit('setUser', userId)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.code)
        throw new Error()
      }
    },
    async autoLoginUser ({ commit, dispatch }) {
      const userId = await dispatch('getUid')
      commit('setUser', userId)
    },
    async logoutUser ({
      commit
    }) {
      await firebase.auth().signOut()
      commit('setUser', null)
      commit('setError', 'logout')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
