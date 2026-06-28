<script setup>
import { Form } from 'vee-validate';
import { useToast } from 'primevue/usetoast';
import { country } from '~/utility/countryList';
import { gender, grade } from '~/utility/index';
const axios = useNuxtApp().$axios;
const toast = useToast();

const form = ref('');
const formFiled = reactive({
    name: '',
    email: '',
    mobile: '',
    gender: null,
    country: null,
    grade: null,
    requirement: ''
});
const step1 = ref(true);
const isLoading = ref(false);
const successRegisterModal = ref(false);

const setFieldValue = (filed, value) => {
    formFiled[filed] = value;
};

const resetForm = () => {
    step1.value = true;
    form.value.resetForm();
    formFiled.name = '';
    formFiled.email = '';
    formFiled.mobile = '';
    formFiled.gender = null;
    formFiled.country = null;
    formFiled.grade = null;
    formFiled.requirement = '';
};

const onSubmit = async () => {
    step1.value = false;
    if (formFiled.requirement.length) {
        isLoading.value = true;
        const fieldset = {
            name: formFiled.name,
            email: formFiled.email,
            gender: formFiled.gender.value,
            country: formFiled.country.name,
            mobile: `${formFiled.country.code}${formFiled.mobile}`,
            grade: formFiled.grade.value,
            requirement: formFiled.requirement
        };

        try {
            const response = await axios.post('unauth/requested-student', fieldset);
            if (response.data.response) {
                isLoading.value = false;
                resetForm();
                successRegisterModal.value = true;
            }
        } catch ({ response }) {
            if (!response.data.response) {
                isLoading.value = false;
                if (response.status === 422) {
                    form.value.setErrors(response.data.message || {});

                    if (typeof response.data.message === String) {
                        toast.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: response.data.message,
                            life: 3500
                        });
                    }

                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Something went wrong.',
                        life: 3150
                    });
                }
            }
        }
    }
};
</script>
<template>
    <p class="text-xl m-0 font-bold">Fill form for student query.</p>
    <Form ref="form" @submit="onSubmit">
        <template v-if="step1">
            <FormFIled :value="formFiled.name" name="name" rules="required|alpha_spaces|max:250" label="Full Name" @atInput="(value) => setFieldValue('name', value)" />
            <FormFIled :value="formFiled.email" name="email" rules="required|email" label="Email Address" @atInput="(value) => setFieldValue('email', value)" />
            <FormFIled :value="formFiled.country" label="Country" name="country" rules="required" filedType="dropdown" :dropdownOption="country" dropdownFilter @atInput="(value) => setFieldValue('country', value)" />
            <FormFIled
                :value="formFiled.mobile"
                name="mobile"
                rules="required|min:6|max:12"
                label="WhatsApp Number"
                placeholder="WhatsApp Number"
                @atInput="(value) => setFieldValue('mobile', value)"
                hint="Enter your WhatsApp number without country code."
            />
            <div class="text-right mt-3">
                <Button label="Next" class="p-button-lg p-button-secondary text-right" type="submit" />
            </div>
        </template>
        <template v-else>
            <FormFIled :value="formFiled.gender" name="gender" rules="required" label="Gender" filedType="dropdown" :dropdownOption="gender" @atInput="(value) => setFieldValue('gender', value)" />

            <FormFIled :value="formFiled.grade" name="grade" rules="required" label="Grade / Class" filedType="dropdown" :dropdownOption="grade" @atInput="(value) => setFieldValue('grade', value)" />
            <FormFIled :value="formFiled.requirement" filedType="text-area" name="about" rules="required|min:3|max:2000" label="Your Requirement" @atInput="(value) => setFieldValue('requirement', value)" />
            <div class="py-3">
                <Button label="Back" class="p-button-lg p-button-secondary text-right mr-3" @click="step1 = true" :disabled="isLoading" />
                <Button label="Finish" class="p-button-lg" type="submit" :disabled="isLoading" />
            </div>
        </template>
    </Form>

    <Dialog
        v-model:visible="successRegisterModal"
        modal
        :pt="{
            root: 'border-none',
            mask: {
                style: 'backdrop-filter: blur(2px)'
            }
        }"
    >
        <template #container="{}">
            <div class="flex flex-column p-5 gap-3 align-items-center justify-content-center" style="border-radius: 12px; background-image: radial-gradient(circle at left top, var(--primary-400), var(--primary-700))">
                <div>
                    <img src="/image/auth/auth-login-check.png" alt="Registration completed" width="100" height="100" />
                </div>
                <p class="text-2xl font-bold text-white m-0">Registration completed successfully</p>
                <div class="text-center">
                    <p class="text-lg font-medium text-white m-0 mb-2">Please check your registered email, for your auto generated password.</p>

                    <p class="text-yellow-500 font-bold m-0">Please check the spam folder if you don't find the E-mail in the inbox.</p>
                </div>

                <Button label="OK" class="p-button-secondary" @click="successRegisterModal = false"></Button>
            </div>
        </template>
    </Dialog>
</template>
