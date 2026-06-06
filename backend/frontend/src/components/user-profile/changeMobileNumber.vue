<script setup>
import { useAuth } from '@store/auth';
import { reactive, computed, ref } from 'vue';
import { composables } from '@composables/index';

const authStore = useAuth();
const { apiToast, formLoading } = composables();

const userProfile = computed(() => authStore.userProfile);

const verifyMobileNumber = ref(false);
const formField = reactive({
    mobile: '',
    otp: ''
});

const atFromReset = () => {
    formField.mobile = '';
    formField.otp = '';
    verifyMobileNumber.value = false;
};

const atFormSubmit = () => {
    if (verifyMobileNumber.value) {
        return authStore.verifyMobileNumber({
            mobile: formField.mobile,
            otp: formField.otp
        });
    } else {
        return authStore.requestChangeMobileNumber();
    }
};

const atFormSubmited = () => {
    if (verifyMobileNumber.value) {
        apiToast({
            data: {
                response: true,
                message: `Mobile number change successfully!`
            }
        });
        atFromReset();
    } else {
        verifyMobileNumber.value = true;
        apiToast({
            data: {
                response: true,
                message: `Your vyapaar account mobile number change, OTP has been sent to your registered WhatsApp number!`
            }
        });
    }
};
</script>
<template>
    <div class="surface-0 border-round-lg shadow-1 p-4 my-6">
        <div class="-mx-4">
            <div class="px-4">
                <h1 class="text-xl mb-0">Change Mobile Number</h1>
                <p class="text-base">Update your registered mobile number to keep your vyapaar account information accurate and secure.</p>
            </div>

            <Divider class="my-4" />
        </div>
        <p class="text-lg">
            Your current mobile number is <b>{{ userProfile.mobile }}</b>
        </p>

        <jinzForm :atFetch="atFormSubmit" :atFinish="atFormSubmited">
            <div class="grid">
                <div class="col-12">
                    <jinzFiled :value="formField.mobile" name="mobile" rules="required|min:10|max:10" placeholder="New Mobile Number" label="New Mobile Number" @atInput="(value) => (formField.mobile = value)" />
                </div>

                <div v-if="verifyMobileNumber" class="col-12">
                    <jinzFiled :value="formField.otp" name="otp" rules="required|min:6" filedType="otp" label="OTP" @atInput="(value) => (formField.otp = value)" />
                </div>
            </div>

            <div class="text-right pt-4">
                <Button size="large" type="submit" :loading="formLoading" :label="verifyMobileNumber ? 'Update Mobile Number' : 'Request to Update'" icon="pi pi-save" />
            </div>
        </jinzForm>
    </div>
</template>
