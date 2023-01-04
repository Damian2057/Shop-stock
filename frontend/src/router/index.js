import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home/HomePage.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/cart',
            name: 'cart',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/cart/ShoppingCart.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('../views/auth/LoginPanel.vue')
        },
        {
            path: '/browse',
            name: 'browse',
            component: () =>
                import ('../views/browse/BrowseProducts.vue')
        },
        {
            path: '/products',
            name: 'products',
            component: () =>
                import ('../views/products/ProductTableComponent.vue')
        },
        // {
        //     path: '/products/:id',
        //     name: 'editProduct',
        //     component: () =>
        //         import ('../views/products/ProductTableComponent.vue')
        // },

        {
            path: '/orders',
            name: 'orders',
            component: () =>
                import ('../views/orders/OrderTableComponent.vue')
        },
    ]
})

export default router