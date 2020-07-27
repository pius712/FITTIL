import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/login',
		},
		{
			path: '/signup',
			component: import('@/pages/SignupPage.vue'),
		},
		{
			path: '/login',
			component: import('@/pages/LoginPage.vue'),
		},
		{
			path: '/main',
			component: import('@/pages/MainPage.vue'),
		},
		{
			path: '*',
			component: import('@/pages/NotFoundPage.vue'),
		},
	],
});

export default router;
