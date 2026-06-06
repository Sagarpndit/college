<script setup>
import { onBeforeMount, ref } from 'vue';
import { useAuth } from '@store/auth';
import { useRouter } from 'vue-router';
import { composables } from '@composables/index';
import authBanner from '@components/auth/banner.vue';

const router = useRouter();
const authStore = useAuth();
const { formLoading } = composables();

const isValidRequest = ref(false);
const formField = authStore.formField;

const requestOtp = () => {
    return authStore.requestSignup();
};

const requestOtpSuccess = (res) => {
    if (res.data.response) {
        isValidRequest.value = true;
    }
};

const verifySignup = () => {
    return authStore.verifySignup();
};

const verifySignupSuccess = (res) => {
    if (res.data.response) {
        router.push('/dashboard');
        authStore.formReset();
    }
};

const goBackToStep1 = () => {
    isValidRequest.value = false;
};

onBeforeMount(() => {
    authStore.formReset();
    isValidRequest.value = false;
});
</script>

<template>
    <main class="h-screen">
        <div class="grid h-full my-0">
            <auth-banner />

            <div class="col-12 lg:col-6 surface-0">
                <div class="flex align-items-center justify-content-center h-full">
                    <div class="px-3 w-full sm:w-8">
                        <div class="my-4 text-center">
                            <img src="/brand/logo-light.png" height="50" class="mb-3 lg:hidden" />
                            <h1 class="font-bold text-3xl Lg:px-8">Sign Up</h1>
                        </div>

                        <!-- Step 1: Request OTP -->
                        <jinzForm v-if="!isValidRequest" :atFetch="requestOtp" :atFinish="requestOtpSuccess">
                            <jinzFiled
                                :value="formField.mobile"
                                name="mobile"
                                class="mb-4"
                                rules="required|digits:10"
                                size="large"
                                placeholder="Mobile"
                                label="Enter your mobile number"
                                @atInput="(value) => (formField.mobile = value)"
                            />

                            <div class="py-4">
                                <Button class="w-full" size="large" type="submit" label="Send OTP" :loading="formLoading" />
                            </div>
                        </jinzForm>

                        <!-- Step 2: Verify OTP and Create Account -->
                        <jinzForm v-else :atFetch="verifySignup" :atFinish="verifySignupSuccess">
                            <Message severity="success" class="mb-4">
                                OTP has been sent to your registered mobile number.
                            </Message>

                            <jinzFiled
                                :value="formField.otp"
                                name="otp"
                                class="mb-4"
                                rules="required|min:6"
                                size="large"
                                placeholder="OTP"
                                label="Enter OTP"
                                @atInput="(value) => (formField.otp = value)"
                            />

                            <jinzFiled
                                :value="formField.password"
                                name="password"
                                class="mb-4"
                                rules="required|min:6"
                                size="large"
                                filedType="password-feedback"
                                label="Password"
                                placeholder="Enter password"
                                @atInput="(value) => (formField.password = value)"
                            />

                            <jinzFiled
                                :value="formField.confirm_password"
                                name="confirm_password"
                                class="mb-4"
                                rules="confirmed:@password"
                                size="large"
                                filedType="password"
                                label="Confirm Password"
                                placeholder="Confirm password"
                                @atInput="(value) => (formField.confirm_password = value)"
                            />

                            <div class="py-4">
                                <Button class="w-full" size="large" type="submit" label="Create Account" :loading="formLoading" />
                            </div>
                        </jinzForm>

                        <div class="text-center">
                            <router-link v-if="!isValidRequest" to="/login" class="font-bold text-900">
                                Already have an account? Sign In
                            </router-link>
                            <Button
                                v-else
                                type="button"
                                link
                                severity="secondary"
                                label="Back"
                                @click="goBackToStep1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

