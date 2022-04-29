import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  },
  {
    path: '/',
    name: 'RegisterPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
