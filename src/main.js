import Vue from 'vue';
import App from './App.vue';
import router from './router';
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
	render: (h) => h(App)
}).$mount('#app');
