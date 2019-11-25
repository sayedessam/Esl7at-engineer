import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from 'firebase'
import axios from 'axios'
import Swal from 'sweetalert2'
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
    accessToken: null,
    refreshToken: null,
    account: [],
    makes: null,
    /* makes
    {
      id: "2"
      make: "BMW"
      url: "https://firebasestorage.googleapis.com/v0/b/esla7at-v01.appsp...."
    }
    */
    models: null,
    vehicles: null,
    loading: false,
    error: null,
    successMsg: null

  },
  mutations: {
    logUser(state, payload) {
      state.user = payload
    },
    logUserOut(state) {
      state.user = null
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
    },
    setMsg(state, payload) {
      state.successMsg = payload
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
            
            commit('setTokens', {access: accessToken, refresh: refreshToken})
            // Load makes
            axios.get((state.baseUrl + '/manufacturers/all'),
            {headers: {
            Authorization: `Bearer ${state.accessToken}`}})
            .then(res => {
              commit('setMakes', res.data.manufacturers)
              console.log('Mokes:') 
              console.log(res.data.manufacturers)
            })
            .catch(err => Swal.fire(err))
            
            // Load vehicle combinations
            axios.get((state.baseUrl + '/makes/all'),
            {headers: {
            Authorization: `Bearer ${state.accessToken}`}})
            .then(res => {
              commit('setModels', res.data.makes)
              commit('setLoading', false)
              console.log('Models:') 
              console.log(res.data.makes)
              Swal.fire('Signin to start using Service Engineer module..','Call administrator if you don\'t have user')
            })
            .catch(err => Swal.fire('Error',err.message))
        })
        .catch(err => Swal.fire('Error', err.message))
        
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
        .catch(err => Swal.fire(err))
        })
      .catch(function(error) {
      // Handle Errors here.
        const errCode = error.code;
        const errMsg = error.message;
        Swal.fire(`Firebase auth Error ${errCode}: ${errMsg}`)
    })
    },
    logUserOut({commit}) {
      fb.auth().signOut()
      .then( () => {
        commit('logUserOut')
      })
      .catch( (error) => {
        const errCode = error.code;
        const errMsg = error.message;
        Swal.fire(`Firebase auth Error ${errCode}: ${errMsg}`)
      })
    },
    createAccount({commit, state}, payload) {
      commit('setLoading', true)
      const account = {
        user_id: 4,
        uid: 2,
        firebase_uid: 'zoyJbplIIxODC0un4FDenTZ1a3w1',
        account_name: payload.account_name,
        email: payload.email,
        mobile_number: payload.mobile_number,
        address: payload.address
      }
      
      // Create new customer account into API
      axios.post(state.baseUrl + '/accounts', account,
      {headers: {
      Authorization: `Bearer ${state.accessToken}`}})
      .then( (res) => {
        Swal.fire(`Account "${account.account_name}" created successfully`)
        commit('setLoading', false)
        commit('setMsg', `Account "${account.account_name}" created successfully, ${JSON.stringify(res, undefined,2)}`)
      })
      .catch(err => Swal.fire('Error',err.message))
    }, // createAccount()
    getAccounts({commit, state}, payload) {
      commit('setLoading', true)
      // Get customer accounta from API
      axios.get(state.baseUrl + '/accounts' + payload,
      {headers: {
      Authorization: `Bearer ${state.accessToken}`}})
      .then( (res) => {
        commit('setAccount', res.data.accounts)
        console.log(res.data.accounts)
        commit('setLoading', false)
        commit('setMsg', `Accounts loaded, ${JSON.stringify(res, undefined,2)}`)
      })
      .catch(err => Swal.fire('Error',err.message))
    }
  }, // End of actions
  getters: {
    user(state) {
      return state.user
    },
    makes(state) {
      return state.makes
    },
    successMsg(state) {
      return state.successMsg
    },
    loading(state) {
      return state.loading
    },
    account(state) {
      return state.account
    },
  }
})
