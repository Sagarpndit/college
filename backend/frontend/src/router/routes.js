import { defineAsyncComponent, h } from 'vue';
import ErrorComponent from '@pages/error/500.vue';
import LoadingComponent from '@core/components/loading.vue';
import AppLayout from '@layout/appLayout.vue';

const lazyLoadView = (AsyncView) => {
    const AsyncHandler = defineAsyncComponent({
        loader: () => AsyncView,
        loadingComponent: LoadingComponent,
        delay: 400,
        errorComponent: ErrorComponent,
        timeout: 10000
    });

    return Promise.resolve({
        functional: true,
        render() {
            return h(AsyncHandler);
        }
    });
};

const authRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => lazyLoadView(import('@pages/auth/signIn.vue')),
        meta: {
            title: 'Login'
        }
    },

    {
        path: '/signup',
        name: 'signup',
        component: () => lazyLoadView(import('@pages/auth/signUp.vue')),
        meta: {
            title: 'Sign Up'
        }
    },

    {
        path: '/recoverPassword',
        name: 'recoverPassword',
        component: () => lazyLoadView(import('@pages/auth/recoverPassword.vue')),
        meta: {
            title: 'Recovery Password'
        }
    }
];

const errorPagesRoutes = [
    {
        path: '/401',
        name: '401',
        component: () => import('@pages/error/401.vue'),
        meta: {
            title: '401',
            authRequired: true
        }
    },

    {
        path: '/404',
        name: '404',
        component: () => import('@pages/error/404.vue'),
        meta: {
            title: '404'
        }
    },

    {
        path: '/500',
        name: '500',
        component: () => import('@pages/error/500.vue'),
        meta: {
            title: '500'
        }
    },

    {
        path: '/:catchAll(.*)',
        redirect: '404'
    }
];

const basicRoutes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: AppLayout,
        children: [
            /* Dashboard  */
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@pages/dashboard/index.vue'),
                meta: {
                    title: 'Dashboard',
                    authRequired: true
                }
            },
            {
                name: 'user-profile',
                path: '/user-profile',
                meta: { authRequired: true, title: 'User Profile' },
                component: () => lazyLoadView(import('@pages/user-profile/index.vue'))
            }
        ]
    }
];

const corporate = [
    {
        path: '/corporate',
        name: 'corporate',
        redirect: '/corporate/party',
        component: AppLayout,
        children: [
            /* Staff */
            {
                path: 'party',
                name: 'party',
                component: () => import('@pages/corporate/party.vue'),
                meta: {
                    title: 'Party',
                    authRequired: true,
                    module: ['corporate-party']
                }
            },
            {
                path: 'news/:id',
                name: 'content',
                component: () => import('@pages/corporate/content.vue'),
                meta: {
                    title: 'Preview News',
                    authRequired: true,
                    module: ['news']
                }
            },
            {
                path: 'college',
                name: 'college',
                component: () => import('@pages/corporate/college.vue'),
                meta: {
                    title: 'College',
                    authRequired: true,
                    module: ['corporate-party']
                }
            },
            {
                path: 'college/:id',
                name: 'content',
                component: () => import('@pages/corporate/content.vue'),
                meta: {
                    title: 'College Preview',
                    authRequired: true,
                    module: ['corporate-party']
                }
            }
        ]
    }
];

const authProtectedRoutes = [...basicRoutes, ...corporate];

const allRoutes = [...authRoutes, ...errorPagesRoutes, ...authProtectedRoutes];

export { allRoutes };
