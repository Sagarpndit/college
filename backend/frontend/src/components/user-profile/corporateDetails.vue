<script setup>
import config from '@config';
import { useAuth } from '@store/auth';
import { onBeforeMount, ref } from 'vue';
import { composables, singleFileUpload } from '@composables/index';

const { formLoading, apiToast } = composables();

const baseURL = config.default.apiBaseUrl;

const authStore = useAuth();

const file = ref('');
const isEdit = ref(false);

const formField = authStore.corporateProfile;

const gstTypeOptions = [
    { label: 'Regular', value: 'regular' },
    { label: 'Composition', value: 'composition' },
    { label: 'Unregistered', value: 'unregistered' }
];

const isEditFetch = () => {
    isEdit.value = !isEdit.value;
};

const atFormSubmit = async () => {
    if (typeof file.value === 'object') {
        formField.companyLogo = await singleFileUpload(file.value);
    }

    return await authStore.updateCorporateProfile(formField);
};

const atFormSubmited = () => {
    isEdit.value = !isEdit.value;

    apiToast({
        data: {
            response: true,
            message: `Corporate profile updated successfully!`
        }
    });
};

onBeforeMount(async () => {
    await authStore.getCorporateProfile();
});
</script>

<template>
    <div class="surface-0 border-round-lg shadow-1 p-4 mt-4">
        <div class="-mx-4">
            <div class="px-4">
                <h1 class="text-xl mb-0">Corporate / Business Details</h1>
                <p class="text-base text-500">Add your business details including GST, company information, and bank details.</p>
            </div>
            <Divider class="my-4" />
        </div>

        <jinzForm :atFetch="atFormSubmit" :atFinish="atFormSubmited">
            <!-- Company Logo -->
            <div class="mb-4">
                <jinzFiled
                    :defaultProfile="formField.companyLogo ? `${baseURL}/${formField.companyLogo}` : '/avatar/1.jpg'"
                    filedType="profile-upload"
                    name="companyLogo"
                    rules="image|ext:jpeg,jpg,png,webp|size:1000"
                    label="Company Logo"
                    @atInput="($event) => (file = $event)"
                    :disabled="!isEdit"
                    hint="Company logo should be jpeg, jpg, png, webp"
                />
            </div>

            <!-- Company Info Section -->
            <div class="mb-4">
                <h3 class="text-base font-bold text-500 uppercase mb-3" style="letter-spacing: 0.05em">Company Information</h3>
                <div class="grid">
                    <div class="col-12">
                        <jinzFiled :value="formField.companyName" name="companyName" rules="max:255" size="large" placeholder="Your Company Name" label="Company Name" :disabled="!isEdit" @atInput="(value) => (formField.companyName = value)" />
                    </div>

                    <div class="col-12">
                        <jinzFiled :value="formField.gst" name="gst" rules="max:20" size="large" placeholder="GST Number" label="GST Number" :disabled="!isEdit" @atInput="(value) => (formField.gst = value)" />
                    </div>

                    <div class="col-12">
                        <GlobalFormField name="gstType" size="large" label="GST Type" placeholder="Select GST Type" :disabled="!isEdit" @atInput="(value) => (formField.gstType = value)" />
                    </div>

                    <div class="col-12">
                        <jinzFiled
                            filedType="single-select"
                            :value="formField.gstType"
                            name="gstType"
                            :options="gstTypeOptions"
                            optionLabel="label"
                            optionValue="value"
                            :disabled="!isEdit"
                            rules="required"
                            label="GST Type"
                            placeholder="Select GST Type"
                            @atInput="(value) => (formField.gstType = value)"
                        />
                    </div>

                    <div class="col-12">
                        <jinzFiled :value="formField.state" name="state" rules="max:50" size="large" placeholder="State" label="State" :disabled="!isEdit" @atInput="(value) => (formField.state = value)" />
                    </div>

                    <div class="col-12">
                        <jinzFiled :value="formField.country" name="country" rules="max:50" size="large" placeholder="Country" label="Country" :disabled="!isEdit" @atInput="(value) => (formField.country = value)" />
                    </div>
                </div>
            </div>

            <!-- Address Section -->
            <div class="mb-4">
                <h3 class="text-base font-bold text-500 uppercase mb-3" style="letter-spacing: 0.05em">Address Details</h3>
                <div class="grid">
                    <div class="col-12 md:col-6">
                        <jinzFiled
                            :value="formField.billingAddress?.join('\n')"
                            name="billingAddress"
                            rules="max:500"
                            size="large"
                            filedType="text-area"
                            placeholder="Billing Address"
                            label="Billing Address"
                            :disabled="!isEdit"
                            @atInput="(value) => (formField.billingAddress = value.split('\n'))"
                        />
                    </div>

                    <div class="col-12 md:col-6">
                        <jinzFiled
                            :value="formField.shippingAddress?.join('\n')"
                            name="shippingAddress"
                            rules="max:500"
                            size="large"
                            filedType="text-area"
                            placeholder="Shipping Address"
                            label="Shipping Address"
                            :disabled="!isEdit"
                            @atInput="(value) => (formField.shippingAddress = value.split('\n'))"
                        />
                    </div>
                </div>
            </div>

            <!-- Bank & Payment Section -->
            <div class="mb-4">
                <h3 class="text-base font-bold text-500 uppercase mb-3" style="letter-spacing: 0.05em">Bank & Payment Details</h3>
                <div class="grid">
                    <div class="col-12 md:col-6">
                        <jinzFiled :value="formField.bankName" name="bankName" rules="max:100" size="large" placeholder="Bank Name" label="Bank Name" :disabled="!isEdit" @atInput="(value) => (formField.bankName = value)" />
                    </div>

                    <div class="col-12 md:col-6">
                        <jinzFiled
                            :value="formField.accountHolderName"
                            name="accountHolderName"
                            rules="max:100"
                            size="large"
                            placeholder="Account Holder Name"
                            label="Account Holder Name"
                            :disabled="!isEdit"
                            @atInput="(value) => (formField.accountHolderName = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6">
                        <jinzFiled :value="formField.accountNumber" name="accountNumber" rules="max:20" size="large" placeholder="Account Number" label="Account Number" :disabled="!isEdit" @atInput="(value) => (formField.accountNumber = value)" />
                    </div>

                    <div class="col-12 md:col-6">
                        <jinzFiled :value="formField.ifsc" name="ifsc" rules="max:20" size="large" placeholder="IFSC Code" label="IFSC Code" :disabled="!isEdit" @atInput="(value) => (formField.ifsc = value)" />
                    </div>

                    <div class="col-12 md:col-6">
                        <jinzFiled :value="formField.upiId" name="upiId" rules="max:50" size="large" placeholder="UPI ID" label="UPI ID" :disabled="!isEdit" @atInput="(value) => (formField.upiId = value)" />
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <Divider class="mt-2 mb-4" />
            <div class="flex justify-content-end gap-2">
                <Button v-if="!isEdit" size="large" label="Edit Corporate Details" icon="pi pi-file-edit" @click="isEditFetch()" />
                <template v-else>
                    <Button size="large" severity="danger" icon="pi pi-times" label="Cancel" @click="isEditFetch()" />
                    <Button size="large" type="submit" :loading="formLoading" icon="pi pi-save" label="Update Details" />
                </template>
            </div>
        </jinzForm>
    </div>
</template>