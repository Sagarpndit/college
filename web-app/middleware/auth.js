import { useAuthStore } from '~/store/auth';
const unAuthRoute = ['aurth-login', 'aurth-signup', 'aurth-reset-password'];

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const token = useCookie('token');

    if (token.value) {
        authStore.authenticated = true;
    }

    if (token.value && unAuthRoute.includes(to?.name)) {
        return navigateTo('/student/home');
    }

    if (!token.value && to?.name.includes('student')) {
        return navigateTo('/aurth/login');
    }
});
