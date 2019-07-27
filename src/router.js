import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: '/customerlist',
			name: 'customerlist',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "customerlist" */ './views/customer/CustomerList.vue')
		},
		{
			path: '/vehiclelist',
			name: 'vehiclelist',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "vehiclelist" */ './views/vehicles/VehicleList.vue')
		},
		{
			path: '/workshoplist',
			name: 'workshoplist',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "workshoplist" */ './views/workshop/WorkshopList.vue')
		},
		{
			path: '/inspectionlist',
			name: 'inspectionlist',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "inspectionlist" */ './views/inspection/InspectionList.vue')
		},
		{
			path: '/setup',
			name: 'setup',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "setup" */ './views/inspection/Setup.vue')
		},
		{
			path: '/appointmentlist',
			name: 'appointmentlist',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "appointmentlist" */ './views/appointment/AppointmentList.vue')
		}
	]
});
