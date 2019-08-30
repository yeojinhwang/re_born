import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import firebaseApp from 'firebase/app'
import Sign from './pages/sign/Sign.vue'

import Menu from './pages/menu/Menu.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/sign',
            name: 'Sign',
            component: Sign
        },
        {
            path: '/menu',
            name: 'Menu',
            component: Menu
        }
    ]
})
