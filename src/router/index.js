import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import RunReport from '@/views/RunReport'
import DeadCodeReport from '@/views/DeadCodeReport'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/run-report',
    name: 'RunReport',
    component: RunReport,
  },
  {
    path: '/dead-code-report',
    name: 'DeadCodeReport',
    component: DeadCodeReport,
  },
]

const router = new VueRouter({
  routes
})

export default router