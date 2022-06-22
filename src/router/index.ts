import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Login from '@/views/user/Login.vue'
import notFound from '@/views/other/not-found.vue';
import HomeLayout from '@/layout/HomeLayout.vue';
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'HomeLayout',
        component: HomeLayout,
        redirect: '/welcome',
        children: [{
            path: '/welcome',
            name: 'welcome',
            component: () => import('../views/other/welcome.vue')
        }, {
                path: '/product',
                name: 'product',
                component: () => import('../views/goods/product.vue')
        },{
    path: '/addProduct',
        name: 'addProduct',
        component: () => import('../views/goods/addProduct.vue')
},
            {
                path: '/not-found',
                name: 'notFound',
                component: notFound
       },]
    },


    {
        path: '/:catchAll(.*)',
        name: '404',
        redirect: '/not-found'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login' && store.getters.getToken) {
        return next('/')
    }
    if (to.path !== '/login' && !store.getters.getToken) {
        return next('/login')
    }
    next()

})
export default router
