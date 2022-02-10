import firebase from 'firebase/compat/app'
import 'firebase/compat/database';
import 'firebase/compat/storage';

class Ad {
  constructor(title, description, ownerId, imageSrc, promo, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    loadAds(state, payload) {
      state.ads = payload
    },
    updateAd(state, {
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
    async createAd({
      commit,
      getters
    }, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image
      try {
        const newAd = new Ad(payload.title, payload.description, getters.user.id, '', payload.promo)
        const ad = await firebase.database().ref('ads').push(newAd)
        /* получаем формат переданной картинки */
        const imageExtension = image.name.slice(image.name.lastIndexOf('.'))

        /* загружаем картинку в storage папки ads*/
        await firebase.storage().ref('ads').child(`${ad.key}${imageExtension}`).put(image)

        const link = [];
        await firebase.storage().ref('ads').child(`${ad.key}${imageExtension}`).getDownloadURL().then((url) => {
          link.push(url)
        }).catch(() => {
          console.log('url is not recieved')
        });

        /* обновляем url картинки в базе данных realtime.database */
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
        commit('setError', 'Error')
        commit('setLoading', false)
        throw new Error
      }
    },
    async fetchAds({
      commit
    }) {
        commit('clearError'),
        commit('setLoading', true)
      const resultAds = []
      try {
        const fbVal = await firebase.database().ref('ads').once('value')
        const ads = fbVal.val()
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key))
        })
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', 'No data received')
        commit('setLoading', false)
        throw new Error
      }
    },
    async updatedAd({
      commit
    }, {
      description,
      title,
      id
    }) {
      commit('clearError'),
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
        commit('setError', error.message)
        commit('setLoading', false)
        throw new Error
      }
    }
  },
  getters: {
    ads(state) {
      return state.ads
    },
    myAds(state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    addById(state) {
      return function (adId) {
        return state.ads.find(ad => adId === ad.id)
      }
    }
  }
}
