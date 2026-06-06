import { isNull } from 'lodash';
import { useAuth } from '@store/auth';
import { getCookie } from '@utils/cookie';
import { authTokenName, appName } from '@config/constants';
import { createRouter, createWebHistory } from 'vue-router';
import { allRoutes } from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes: allRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

router.beforeResolve(async (to, from, next) => {
    const authStore = useAuth();
    document.title = `${appName} | ${to.meta.title}` || `${appName} | Welcome`;
    const isAuthenticated = getCookie(authTokenName);

    if (to.meta.authRequired) {
        if (isNull(isAuthenticated)) {
            return next({ path: '/login' });
        }
    } else {
        if (!isNull(isAuthenticated) && !['404', '500', 'terms-of-use', 'privacy-policy', 'faq'].includes(to.name)) return next({ path: '/dashboard' });
    }
    next();
});

export default router;
