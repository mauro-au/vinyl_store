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
      path: '*',
      component: () => import(/* webpackChunkName: "about" */ './views/404.vue')
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
      path: '/',
      name: 'home',
      alias: '/home',
      component: Home,
    },
    {
      path: '/create',
      name: 'create',
      meta: {
        requireLogin: true
      },
      component: () => import(/* webpackChunkName: "login" */ './views/Create.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next)=>{
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.requireLogin)
  if (!user && authRequired) {
    next('home')    
  // } else if (user && !authRequired) {
  //   next('home');
  }else{
    next()
  }
})

export default router