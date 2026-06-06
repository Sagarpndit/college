import { omit } from 'lodash';
import { defineStore } from 'pinia';
import { setCookie, getCookie } from '@utils/cookie';
import { authTokenName, userProfile } from '@config/constants';
import { HTTP, handleError } from '@plugins/axios';

export const useAuth = defineStore('auth', {
    state: () => ({
        formField: {
            userType: '',
            mobile: '',
            email: '',
            password: '',
            confirm_password: '',
            otp: '',
            name: ''
        },
        userProfile: getCookie(userProfile)
            ? JSON.parse(getCookie(userProfile))
            : null,
    }),

    actions: {
        async login() {
            try {
                const result = await HTTP.post('unauth/login', {
                    email: this.formField.email,
                    password: this.formField.password,
                });

                if (result.data.response) {
                    this.userProfile = result.data.data.profile;
                    setCookie(userProfile, JSON.stringify(result.data.data.profile));
                    setCookie(authTokenName, result.data.data.token, 7);
                }
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async recoverPassword() {
            try {
                const result = await HTTP.post('unauth/request-forget-password', {
                    mobile: this.formField.mobile,
                });
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async verifyPassword(key) {
            try {
                const result = await HTTP.post('unauth/verify-forget-password', {
                    mobile: this.formField.mobile,
                    password: this.formField.password,
                    confirmPassword: this.formField.confirm_password,
                    otp: this.formField.otp
                });
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async chnagePassword(filedObj) {
            try {
                const result = await HTTP.post('change-password', filedObj);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async requestChangeMobileNumber() {
            try {
                const result = await HTTP.get('change-mobile');
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async verifyMobileNumber(filedObj) {
            try {
                const result = await HTTP.post('verify-mobile', filedObj);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async updateProfile(filedObj) {
            try {
                const result = await HTTP.post('update-profile', filedObj);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async requestSignup() {
            try {
                const result = await HTTP.post('unauth/request-signup', {
                    mobile: this.formField.mobile
                });
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async verifySignup() {
            try {
                const result = await HTTP.post('unauth/verify-signup', {
                    mobile: this.formField.mobile,
                    password: this.formField.password,
                    confirm_password: this.formField.confirm_password,
                    otp: this.formField.otp
                });

                if (result.data.response) {
                    setCookie(authTokenName, result.data.data.token, 7);
                }
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        formReset() {
            this.formField.userType = '';
            this.formField.mobile = '';
            this.formField.password = '';
            this.formField.confirm_password = '';
            this.formField.otp = '';
            this.formField.fullName = '';
        }
    }
});
