import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from 'firebase'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'https://esla7at-backend.herokuapp.com',
    user: null,
  /*  
    user: {
      uid: '',  // Firebase auth UID
      userEmail: '',  // Firebase auth email
      userName: '', // User name in the 'users' db table
      userRole: ''  // role 'users' db table (0=Admin, 1=Engineer, 2=Workshop)
    } */
    apiAccessToken: null,
    apiRefreshToken: null,
    account: null,
    makes: null,
    models: null,
    vehicles: null,
    loading: false,
    error: null

  },
  mutations: {
    logUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setTokens(state, payload) {
      state.accessToken = payload.access
      state.refreshToken = payload.refresh
    },
    setMakes(state, payload) {
      state.makes = payload
    },
    setModels(state, payload) {
      state.models = payload
    },
    setAccount(state, payload) {
      state.account = payload
    }


  },  // End of mutations
  actions: {
    loadMaster({commit, state}) {
      commit('setLoading', true)

      // Login to Esla7at API
      axios.post(state.baseUrl + '/login', {
        username : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9#eyJpYXQiOjE1NzIxNzE0ODQsIm5iZiI6M",
        password : "NmUxMGYzIiwiZXhwIjoxNTcyMTcyMzg0LCJpZGVudGl0eSI6NCwiZnJlc2#giOnRydWUsI"})
        .then(res => {
            const accessToken = res.data.access_token;
            const refreshToken = res.data.referesh_token
            console.log(res.data)
            commit('setTokens', {access: accessToken, refresh: refreshToken})
            // Load makes
            axios.get((state.baseUrl + '/manufacturers/all'),
            {headers: {
            Authorization: `Bearer ${state.accessToken}`}})
            .then(res => {
              commit('setMakes', res.data.manufacturers)
              console.log('Models:') 
              console.log(res.data.manufacturers)
            })
            .catch(err => console.log(err))
            
            // Load vehicle combinations
            axios.get((state.baseUrl + '/makes/all'),
            {headers: {
            Authorization: `Bearer ${state.accessToken}`}})
            .then(res => {
              commit('setModels', res.data.makes)
              console.log('Makes:') 
              console.log(res.data.makes)
            })
            .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
        
    },
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
    },
    createAccount({commit,state}, payload) {
      const account = {
        user_id: 4,
        firebase_id: 'zoyJbplIIxODC0un4FDenTZ1a3w1',
        account_name: payload.accountName,
        email: payload.accountEmail,
        mobile_number: payload.accountMobile,
        address: payload.accountAddress
      }
      // Create new customer account into API
      axios.post((state.baseUrl + '/accounts', account),
      {headers: {
      Authorization: `Bearer ${state.accessToken}`}})
      .then(res => {
        commit('setMakes', res.data.manufacturers)
        console.log('Models:') 
        console.log(res.data.manufacturers)
      })
      .catch(err => console.log(err))
    }
  }, // End of actions
  getters: {
    user(state) {
      return state.user
    }
  }
})
