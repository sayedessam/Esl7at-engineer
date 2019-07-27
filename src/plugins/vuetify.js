import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdi'
	},
	theme: {
		themes: {
			light: {
				primary: '#1976d2',
				secondary: '#ffa000',
				anchor: '#63a4ff'
			},
			dark: {
				primary: '#1976d2',
				secondary: '#ffa000',
				anchor: '#63a4ff'
			}
		}
	}
});
