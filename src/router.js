import Vue from 'vue';
import Home from './views/Home.vue'
import VueRouter from 'vue-router'
import store from './store'

const routes = [
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
	},
	{
		path: '/addappointment',
		name: 'addappointment',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "appointmentlist" */ './views/appointment/AddAppointment.vue')
	}
]

Vue.use(VueRouter)

const router = new VueRouter({
	routes
})

router.beforeEach( (to, from, next) => {
	if(store.getters.user || to.path === '/' || to.path === '/about') {
		next()
	} else next('/')
})


export default router