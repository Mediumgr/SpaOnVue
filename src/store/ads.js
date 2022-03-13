import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/storage'

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {
      title,
      description,
      id
    }) {
      const ad = state.ads.find(element => {
        return element.id === id
      })
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd ({
      commit,
      getters
    }, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image
      try {
        const newAd = {
          title: payload.title,
          description: payload.description,
          ownerId: getters.user,
          imageSrc: '',
          promo: payload.promo
        }
        const ad = await firebase.database().ref('ads').push(newAd)

        const imageExtension = image.name.slice(image.name.lastIndexOf('.'))
        await firebase.storage().ref('ads').child(`${ad.key}${imageExtension}`).put(image)

        const link = []
        await firebase.storage().ref('ads').child(`${ad.key}${imageExtension}`).getDownloadURL().then((url) => {
          link.push(url)
        }).catch(() => {
          commit('setError', 'Server error: image has not been received')
        })
        await firebase.database().ref('ads').child(ad.key).update({
          imageSrc: link[0]
        })

        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc: link[0]
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', 'Server Error: your promotion has not been added')
        commit('setLoading', false)
        throw new Error()
      }
    },
    async fetchAds ({
      commit
    }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const ads = (await firebase.database().ref('ads').once('value')).val()
        const resultAds = Object.keys(ads).map(key => ({ ...ads[key], id: key }))
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', 'Server Error: no data has been received from server')
        commit('setLoading', false)
        throw new Error()
      }
    },
    async updatedAd ({
      commit
    }, {
      description,
      title,
      id
    }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('ads').child(id).update({
          title,
          description
        })
        commit('updateAd', {
          title,
          description,
          id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', 'Server Error: Your promotion has not been updated')
        commit('setLoading', false)
        throw new Error()
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user
      })
    },
    addById (state) {
      return function (adId) {
        return state.ads.find(ad => adId === ad.id)
      }
    }
  }
}
