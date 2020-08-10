import Vue from 'vue'
import VueRouter from 'vue-router'
import securityRouter from './securityRouter'

import Home from '@/views/Home.vue'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(VueRouter)

const mainRouter = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Dashboard', name: 'Dashboard', component: Dashboard },
  // otherwise redirect to home
  { path: '*', redirect: '/' }
]

let allRoutes = []
allRoutes = allRoutes.concat(mainRouter, securityRouter)
const routes = allRoutes

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
