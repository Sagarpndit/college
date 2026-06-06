<script setup>
import { useAuth } from '@store/auth';
import { useRouter } from 'vue-router';
import { composables } from '@composables/index';
import { ref, onBeforeMount } from 'vue';

import authBanner from '@components/auth/banner.vue';

const router = useRouter();
const authStore = useAuth();

const { formLoading } = composables();

const formField = authStore.formField;

const isValidRequest = ref(false);
const dialogOnSuccessReset = ref(false);

const fetchRecoverPassword = () => {
    return authStore.recoverPassword();
};

const fechRecoverPasswordSent = (res) => {
    if (res.data.response) {
        isValidRequest.value = true;
    }
};

const fetchVerifyForgetPassword = () => {
    return authStore.verifyPassword();
};

const fetchChangePasswordSuccess = (res) => {
    if (res.data.response) {
        isValidRequest.value = false;
        dialogOnSuccessReset.value = true;
    }
};

const fetchLoginAgain = () => {
    dialogOnSuccessReset.value = false;
    router.push('/login');
};

onBeforeMount(() => {
    authStore.formReset();
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

                            <h1 class="font-bold text-3xl">Revover password</h1>
                        </div>

                        <jinzForm v-if="isValidRequest" :atFetch="fetchVerifyForgetPassword" :atFinish="fetchChangePasswordSuccess">
                            <Message severity="success" class="mb-4"> Your Mistry Bhejo account password reset <b>OTP</b> has been sent to your registered WhatsApp number. </Message>
                            <p class="p">If you did not receive the OTP, click <b class="cursor-pointer text-blue-600" @click="fetchRecoverPassword"> Resend </b> to get a new one.</p>

                            <Divider />

                            <jinzFiled :value="formField.otp" name="otp" class="mb-4" rules="required|min:6" filedType="otp" label="Reset OTP" @atInput="(value) => (formField.otp = value)" />

                            <jinzFiled
                                :value="formField.password"
                                name="password"
                                class="mb-4"
                                rules="required|min:6"
                                size="large"
                                filedType="password-feedback"
                                placeholder="New Password"
                                label="New Password"
                                @atInput="(value) => (formField.password = value)"
                            />

                            <jinzFiled
                                :value="formField.confirm_password"
                                name="confirm"
                                class="mb-4"
                                rules="confirmed:@password"
                                size="large"
                                filedType="password"
                                placeholder="Confirm New Password"
                                label="Confirm New Password"
                                @atInput="(value) => (formField.confirm_password = value)"
                            />

                            <div class="py-4">
                                <Button class="w-full" size="large" type="submit" :loading="formLoading" label="Update Password" />
                            </div>
                        </jinzForm>

                        <jinzForm v-else :atFetch="fetchRecoverPassword" :atFinish="fechRecoverPasswordSent">
                            <jinzFiled :value="formField.mobile" name="mobile" class="mb-4" rules="required|digits:10" size="large" placeholder="Mobile" label="Enter your mobile number" @atInput="(value) => (formField.mobile = value)" />

                            <div class="py-4">
                                <Button class="w-full" size="large" type="submit" :loading="formLoading" label="Send Reset Password OTP" />
                            </div>
                        </jinzForm>

                        <div class="text-center">
                            <router-link to="/login" class="font-bold text-900"> Return to login? </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Dialog v-model:visible="dialogOnSuccessReset" modal :showHeader="false" :style="{ width: '25rem' }">
            <div class="p-4 text-center">
                <i class="pi pi-face-smile text-6xl text-green-500" />

                <Message severity="success" icon="pi pi-check" class="mt-4"> Your <b> Mistry Bhejo</b> account password has been changed successfully </Message>
            </div>
            <div class="flex justify-content-center gap-2">
                <Button type="button" label="Return to login?" @click="fetchLoginAgain()" />
            </div>
        </Dialog>
    </main>
</template>
