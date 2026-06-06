<script setup>
import config from '@config';
import { useAuth } from '@store/auth';
import { computed, reactive, ref } from 'vue';
import { composables, singleFileUpload } from '@composables/index';

const { formLoading, apiToast } = composables();

const baseURL = config.default.apiBaseUrl;

const authStore = useAuth();
const userProfile = computed(() => authStore.userProfile);

const file = ref('');
const isEdit = ref(false);

const formField = reactive({
    name: '',
    email: '',
    businessEmail: '',
    profileImage: ''
});

const isEditFetch = () => {
    isEdit.value = !isEdit.value;
    formField.name = userProfile.value.name;
    if (userProfile.role === 'vendor') {
        formField.businessEmail = userProfile.value.businessEmail;
    } else {
        formField.email = userProfile.value.email;
    }
    formField.profileImage = userProfile.value.profileImage;
};

const atFromReset = () => {
    formField.name = '';
    formField.email = '';
    formField.businessEmail = '';
    formField.profileImage = '';
    isEdit.value = false;
};

const atFormSubmit = async () => {
    if (typeof file.value === 'object') {
        formField.profileImage = await singleFileUpload(file.value);
    }

    return authStore.updateProfile(formField);
};

const atFormSubmited = () => {
    apiToast({
        data: {
            response: true,
            message: `Profile updated successfully!`
        }
    });
    atFromReset();
};
</script>

<template>
    <div class="surface-0 border-round-lg shadow-1 p-4">
        <div class="-mx-4">
            <div class="px-4">
                <h1 class="text-xl mb-0">Profile Information</h1>
                <p class="text-base">Manage your personal details to keep your vyapaar account up to date and personalized.</p>
            </div>

            <Divider class="my-4" />
        </div>

        <jinzForm :atFetch="atFormSubmit" :atFinish="atFormSubmited">
            <div class="grid">
                <div class="col-12">
                    <jinzFiled
                        :defaultProfile="userProfile.profileImage ? `${baseURL}/${userProfile.profileImage}` : '/avatar/1.jpg'"
                        filedType="profile-upload"
                        name="profileImage"
                        :rules="userProfile.profileImage ? 'image|ext:jpeg,jpg,png,webp|size:1000' : 'required|image|ext:jpeg,jpg,png,webp|size:1000'"
                        label="Profile Image"
                        @atInput="($event) => (file = $event)"
                        :disabled="!isEdit"
                        hint="Profile image should be jpeg,jpg,png,webp"
                    />
                </div>

                <div class="col-12 lg:col-6">
                    <jinzFiled :value="userProfile.name" name="name" rules="required|max:255" size="large" placeholder="Your Full Name" label="Full Name" :disabled="!isEdit" @atInput="(value) => (formField.name = value)" />
                </div>

                <div class="col-12 lg:col-6">
                    <jinzFiled
                        v-if="userProfile.role === 'vendor'"
                        :value="userProfile.businessEmail"
                        name="businessEmail"
                        rules="required|email"
                        size="large"
                        placeholder="Your business email"
                        business
                        email
                        label="Your business email"
                        :disabled="!isEdit"
                        @atInput="(value) => (formField.businessEmail = value)"
                    />

                    <jinzFiled v-else :value="userProfile.email" name="email" rules="required|email" size="large" placeholder="Your email address" label="Your email address" :disabled="!isEdit" @atInput="(value) => (formField.email = value)" />
                </div>

                <div class="col-12 lg:col-6">
                    <jinzFiled :value="userProfile.createdAt" disabled name="createdAt" size="large" placeholder="Profile Created At" label="Profile Created At" :disabled="true" />
                </div>
            </div>

            <div class="text-right pt-4">
                <Button v-if="!isEdit" size="large" label="Edit Profile" icon="pi pi-file-edit" @click="isEditFetch()" />
                <template v-else>
                    <Button size="large" type="submit" :loading="formLoading" icon="pi pi-save" label="Update Profile" class="mr-2" />
                    <Button size="large" severity="danger" icon="pi pi-times" label="Cancel" @click="isEditFetch()" />
                </template>
            </div>
        </jinzForm>
    </div>
</template>
