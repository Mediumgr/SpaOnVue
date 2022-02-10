import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [{
  path: '',
  name: 'home',
  component: () => import("../components/Home.vue")
},
{
  path: '/ad/:id',
  props: true,
  name: 'ad',
  component: () => import("../components/Ads/Ad.vue")
},
{
  path: '/list',
  name: 'list',
  component: () => import("../components/Ads/AdList.vue"),
  beforeEnter: AuthGuard
},
{
  path: '/new',
  name: 'new',
  component: () => import("../components/Ads/NewAd.vue"),
  beforeEnter: AuthGuard
},
{
  path: '/login',
  name: 'login',
  component: () => import("../components/Auth/Login.vue"),
},
{
  path: '/registration',
  name: 'reg',
  component: () => import("../components/Auth/Registration.vue"),
},
{
  path: '/orders',
  name: 'orders',
  component: () => import("../components/User/Orders.vue"),
  beforeEnter: AuthGuard
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
