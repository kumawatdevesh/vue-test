const routes = [
    {
        name: 'login',
        path: '/login',
        component: () => import('./components/Login.vue'),
        children: [
            { path: '/', component: () => import('./components/EmailLogin.vue') },
            { path: '/phone', component: () => import('./components/PhoneLogin.vue') }
        ],
        beforeEnter: (to, from, next) => {
            if (JSON.parse(localStorage.getItem('apollo-token'))) {
                return next('/')
            } else {
                next()
            }
        }
    },
    {
        name: 'signup',
        path: '/signup',
        component: () => import('./components/SignUp.vue'),
        beforeEnter: (to, from, next) => {
            if (JSON.parse(localStorage.getItem('apollo-token'))) {
                return next({
                    path: '/'
                })
            } else {
                next()
            }
        }
    },
    {
        name: 'home',
        path: '/',
        component: () => import('./components/Home.vue'),
        beforeEnter: (to, from, next) => {
            if (!JSON.parse(localStorage.getItem('apollo-token'))) {
                next('/login')
            } else {
                next()
            }
        }
    },
    {
        name: 'verify',
        path: '/verify',
        component: () => import('./components/Verification.vue'),
        beforeEnter: (to, from, next) => {
            if (JSON.parse(localStorage.getItem('apollo-token'))) {
                next('/')
            } else {
                next()
            }
        }
    },
    {
        name: 'profile',
        component: () => import('./components/Profile.vue'),
        path: '/profile',
        beforeEnter: (to, from, next) => {
            if (!JSON.parse(localStorage.getItem('apollo-token'))) {
                next('/login')
            } else {
                next()
            }
        }
    },
]

export default routes