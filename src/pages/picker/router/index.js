import Vue from 'vue'
import VueRouter from 'vue-router'
import  routesList from './routes'
import cloneDeep from 'lodash/cloneDeep'
Vue.use(VueRouter)

var routes=cloneDeep(routesList)
routes.push({
    path: '/',
    name: 'noMatch',
    redirect: '/RouterList',
})
const router = new VueRouter({
    mode: 'history',
    base: 'picker/',      //多页面的时候, base 是必要的
    routes
})

export default router
