import axios from 'axios';

let url = null;
url = 'https://panel.ownteacher.com/api/';
const API_URL = url || 'http://localhost:3003/api/';

export default defineNuxtPlugin((nuxtApp) => {
    const instance = axios.create({
        baseURL: API_URL,
        responseType: 'json',
        timeout: 60000
    });

    instance.interceptors.request.use((config) => {
        const token = useCookie('token')?.value;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return {
        provide: {
            axios: instance
        }
    };
});
