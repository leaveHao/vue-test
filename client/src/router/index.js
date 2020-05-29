import Vue from 'vue'
import VueRouter from 'vue-router'

const AdminLogin = () => import('views/adminLogin/AdminLogin')
const AdminHome = () => import('views/adminHome/AdminHome')
const UserList = () => import('views/adminHome/children/UserList')
//404页面
const NotFound = () => import('views/notfound/NotFound')

Vue.use(VueRouter)

const routes = [{
	path: '/',
	redirect: '/adminlogin'
}, {
	path: '/adminlogin',
	component: AdminLogin
}, {
	path: '/adminhome',
	component: AdminHome,
	redirect: '/adminhome/users',
	children:[{
			path: 'users',
			component: UserList
		}]
},{
		path: '/notfound',
		component: NotFound
	}]

const router = new VueRouter({
	mode: 'history',
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.length === 0) {
		//路由不存在则跳转到自定义404页面
		next('/notfound');
	} else {
		next();
	}
})

export default router
