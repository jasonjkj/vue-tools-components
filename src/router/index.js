import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

  import demoRouter from '../pages/demo/router/'
  import indexRouter from '../pages/index/router/'
  const routes = [
      ...indexRouter,
      ...demoRouter,
    {
      path: '/*',
      meta: {
        title: '404',
      },
      component: () => import('@/views/404.vue'),
      hidden: true
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
