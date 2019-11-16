import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  /*  
    user: {
      uid: '',  // Firebase auth UID
      userEmail: '',  // Firebase auth email
      userName: '', // User name in the 'users' db table
      userRole: ''  // role 'users' db table (0=Admin, 1=Engineer, 2=Workshop)
    } */
    apiAccessToken: null,
    apiRefreshToken: null
  },
  mutations: {
    logUser(state, payload) {
      state.user = payload
    }

  },  // End of mutations
  actions: {
    signUserIn({commit}, payload) {
      let newUser = {}
      // Initialize Firebase store
      const db = fb.firestore().collection('users')
      fb.auth().signInWithEmailAndPassword(
        payload.email, payload.password)
      .then(resp => {
        newUser.uid = resp.user.uid
        newUser.userEmail = resp.user.email

        db.doc(resp.user.uid).get()
        .then(doc => {
            const data = doc.data()
            newUser.userName = data.name
            newUser.userRole = data.role
            commit('logUser', newUser)
        }) 
        .catch(err => console.log(err))
        })
      .catch(function(error) {
      // Handle Errors here.
        const errCode = error.code;
        const errMsg = error.message;
        console.log(`Firebase auth Error ${errCode}: ${errMsg}`)
    })
    }
  }, // End of actions
  getters: {
    user(state) {
      return state.user
    }
  }
})
