import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    id: 'auth',

    state: () => ({
        authenticated: false,
        loading: false
    }),

    actions: {
        async authenticateUser(tmepObject) {
            try {
                const result = await useNuxtApp().$axios.post('unauth/login', tmepObject);
                if (result.data.response) {
                    const token = useCookie('token');
                    token.value = result.data.data.token;
                    this.authenticated = true;
                }

                return result;
            } catch (result) {
                return result.response;
            }
        },

        async fetchProfile() {
            try {
                const result = await useNuxtApp().$axios.get('user-profile');
                if (result.data.response) {
                    const profile = useCookie('profile');
                    profile.value = result.data.data;
                }

                return result;
            } catch (result) {
                return result.response;
            }
        },

        logUserOut() {
            const token = useCookie('token');
            const profile = useCookie('profile');
            this.authenticated = false;
            token.value = null;
            profile.value = null;
        }
    }
});
