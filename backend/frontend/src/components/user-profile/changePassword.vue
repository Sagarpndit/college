<script setup>
import { useAuth } from '@store/auth';
import { reactive, computed } from 'vue';
import { composables } from '@composables/index';

const authStore = useAuth();
const { apiToast, formLoading } = composables();

const userProfile = computed(() => authStore.userProfile);

const formField = reactive({
    oldPassword: '',
    password: '',
    confirmPassword: ''
});

const atFromReset = () => {
    formField.oldPassword = '';
    formField.password = '';
    formField.confirmPassword = '';
};

const atFormSubmit = () => {
    return authStore.chnagePassword({
        oldPassword: formField.oldPassword,
        password: formField.password,
        confirmPassword: formField.confirmPassword
    });
};

const atFormSubmited = () => {
    apiToast({
        data: {
            response: true,
            message: `New password updated successfully!`
        }
    });
    atFromReset();
};
</script>
<template>
    <div class="surface-0 border-round-lg shadow-1 p-4">
        <div class="-mx-4">
            <div class="px-4">
                <h1 class="text-xl mb-0">Change Your Password</h1>
                <p class="text-base">Keep your account secure by updating your password regularly.</p>
            </div>

            <Divider class="my-4" />
        </div>
        <jinzForm :atFetch="atFormSubmit" :atFinish="atFormSubmited">
            <div class="grid">
                <div class="col-12">
                    <jinzFiled :value="formField.oldPassword" name="oldPassword" rules="required|min:6" filedType="password" placeholder="Current Password" label="Current Password" @atInput="(value) => (formField.oldPassword = value)" />
                </div>

                <div class="col-12">
                    <jinzFiled :value="formField.password" name="password" rules="required|min:6" filedType="password-feedback" placeholder="New Password" label="New Password" @atInput="(value) => (formField.password = value)" />
                </div>

                <div class="col-12">
                    <jinzFiled
                        :value="formField.confirmPassword"
                        name="confirmPassword"
                        rules="confirmed:@password"
                        filedType="password"
                        placeholder="Confirm New Password"
                        label="Confirm New Password"
                        @atInput="(value) => (formField.confirmPassword = value)"
                    />
                </div>
            </div>

            <div class="text-right pt-4">
                <Button size="large" type="submit" :loading="formLoading" label="Update Password" icon="pi pi-save" />
            </div>
        </jinzForm>
    </div>
</template>
