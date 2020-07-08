import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Login from '../views/pages/Login.vue'
import Register from '../views/pages/Register.vue'
import Home from '../views/pages/Home.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/signin'
        },
        {
            path: '/signin',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'register',
            component: Register
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                requiresAuth: true
            },
            component: Home
        }

    ]
})

router.beforeEach((to, from, next) => {
    // console.log(to.meta.requiresAuth)
    if(to.meta.requiresAuth) {
        // console.log(store.state.isLoggedIn)
        if (store.state.token != 'TRUE') {
            // console.log('not log in')
            next('/signin') 
        }
        next() 
    } else {
        // console.log('welcome to login page')
            next() 
        }
    })
export default router