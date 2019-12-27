import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../App.vue')
  },
  {
    path: '/heroes',
    name: 'heroes',
    component: () => import('../views/Heroes.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: () => import('../views/SignUp.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
