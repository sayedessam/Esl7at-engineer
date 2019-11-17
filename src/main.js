import Vue from 'vue';
import App from './App.vue';
import router from './router';
import * as fb from 'firebase'
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';

import Signin from './components/user/Signin';

Vue.config.productionTip = false;

Vue.component('Signin', Signin);
new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
	created() {
		fb.initializeApp({
			apiKey: 'AIzaSyAUzWZrPxH_MjU1KsirqG3Ijq1_Yf512ik',
			authDomain: 'esla7at-v01.firebaseapp.com',
			databaseURL: 'https://esla7at-v01.firebaseio.com',
			projectId: 'esla7at-v01',
			storageBucket: 'esla7at-v01.appspot.com',
			messagingSenderId: '761550144668',
			appId: '1:761550144668:web:9f953f32cf5b02d0349959',
			measurementId: 'G-VHKLVZ5SP7'
		})
		this.$store.dispatch('loadMaster')
		
	}
}).$mount('#app');
