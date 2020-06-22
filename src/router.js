import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      alias: ['/home', '/inicio'],
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/create',
      name: 'create',
      meta: {
        requireLogin: true
      },
      component: () => import(/* webpackChunkName: "create" */ './views/Create.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        login: true
      },
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "not found" */ './views/NotFound.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.requireLogin);
  let authLogin = to.matched.some(route => route.meta.login);
  if (!user && authRequired || user && authLogin) {
    next('/')
  } else {
    next()
  }
})

export default router