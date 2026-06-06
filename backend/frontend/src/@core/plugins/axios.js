import axios from 'axios';
import config from '@config';
import axiosCancel from 'axios-cancel';
import { authTokenName } from '@config/constants';
import { getCookie, eraseCookie } from '@utils/cookie';

/**
 * Global axios configuration for API Calls with bearer token.
 */

export const HTTP = axios.create({
    baseURL: config.default.apiEndPoint,
    responseType: 'json',
    timeout: 60000,
    params: {},
    validateStatus: function (status) {
        if (status === 401) {
            eraseCookie(authTokenName);
            window.location.href = '/login';
        } else {
            return status >= 200 && status < 501;
        }
    }
});

axiosCancel(HTTP, {
    debug: false
});

/**
 * similar to handleError function, but specific to handle the axios cancel.
 * Probably, the error handling should be reviews and either this or the
 * handleError function should be used.
 */

export const catchCancel = function (resp = null) {
    return axios.isCancel(resp) ? Promise.reject(resp) : resp;
};

export const cancelAllRequests = function () {
    HTTP.cancelAll();
};

export const cancelRequest = function (id) {
    HTTP.cancel(id);
};

export const cancelRequests = function (arrayOfIds) {
    arrayOfIds.forEach((i) => HTTP.cancel(i));
};

/**
 * Global axios error handling.
 * Error being added to Vuex store for displaying in the Application.
 * Request gets canceled.
 */

export const handleError = function (error) {
    if (!axios.isCancel(error)) {
        error.message || 'A connection error occurred';
    }
    throw error;
};

/**
 * HTTP response interceptor
 * check if token expired, create a new one if possible or cancels API request
 */
HTTP.interceptors.response.use(
    function (response) {
        // If the request succeeds, we don't have to do anything and just return the response
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

/**
 * HTTP request interceptor
 * add Authorization bearer token to the request headers
 */
export const requestInterceptor = HTTP.interceptors.request.use(
    async (config) => {
        // config.params.version = (store && store.getters.apiVersion) || config.apiVersion
        // config.headers['Accept-Language'] = i18next.language || 'en-US'
        // eslint-disable-next-line no-unused-expressions
        config.headers.Accept = 'application/json';
        config.headers.Authorization = getToken();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export function getToken() {
    if (getCookie(authTokenName)) {
        return getCookie(authTokenName);
    }
}
