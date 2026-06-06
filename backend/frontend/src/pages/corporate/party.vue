<script setup>
import { useAuth } from '@store/auth';
import { onBeforeUnmount } from 'vue';
import { status } from '@utils/constant';
import { useParty } from '@store/corporate/party';
import { resetForm, composables } from '@composables/index';
import { isEqual } from 'lodash';

const authStore = useAuth();
const party = useParty();

const title = 'Party';
const { setTableLoading, apiToast, confirmDialog } = composables();

const formField = party.formField;
const filterField = party.filterField;

const gstTypeOptions = [
    { label: 'Regular', value: 'regular' },
    { label: 'Composition', value: 'composition' },
    { label: 'Unregistered', value: 'unregistered' }
];

const partyTypeOptions = [
    { label: 'Customer', value: 'customer' },
    { label: 'Supplier', value: 'supplier' },
    { label: 'Both', value: 'both' }
];

const listingFilter = () => fetchList();

const fetchList = async () => {
    setTableLoading(true);
    await party.fetchList();
    setTableLoading(false);
};

const createAction = () => {
    party.formDialogType = 'create';
    party.formDialogVisibility = true;
};

const updateAction = async (data) => {
    party.selectedRow = data;
    await party.fetchById();
    party.formDialogType = 'update';
    party.formDialogVisibility = true;
};

const viewAction = async (data) => {
    party.selectedRow = data;
    await party.fetchById();
    party.formDialogType = 'view';
    party.formDialogVisibility = true;
};

const updateStatusDialog = async (data) => {
    party.selectedRow = data;
    confirmDialog({
        header: 'Confirm',
        message: 'Are you sure you want to change status the selected record?',
        accept: updateStatus
    });
};

const updateStatus = async () => {
    await party.fetchStatus();
    fetchList();
};

const deleteDialog = async (data) => {
    party.selectedRow = data;
    confirmDialog({
        header: 'Confirm',
        message: 'Are you sure you want to delete the selected record?',
        accept: fetchDelete
    });
};

const fetchDelete = async () => {
    await party.fetchDelete();
    fetchList();
};

const atFormSubmit = async () => {
    if (isEqual(party.formDialogType, 'create')) {
        party.currentPage = 0;
        return party.fetchCreate();
    }
    if (isEqual(party.formDialogType, 'update')) {
        return party.fetchUpdate();
    }
};

const atFormSubmited = () => {
    apiToast({
        data: {
            response: true,
            message: `${title} successfully ${party.formDialogType === 'create' ? 'created' : 'updated'}!`
        }
    });
    atFromReset();
    fetchList();
};

const atFromReset = () => {
    resetForm(party);
};

onBeforeUnmount(() => {
    party.$reset();
});
</script>

<template>
    <div class="pages-wrapper">
        <div class="surface-0 border-round-lg shadow-1 px-4 pt-4">
            <!-- Header -->
            <div class="pb-4 flex flex-wrap gap-3 align-items-center justify-content-between">
                <div class="flex gap-2 align-items-center">
                    <i class="pi pi-users text-xl" />
                    <p class="font-bold text-lg">{{ title }}</p>
                </div>
                <Button icon="pi pi-plus" label="Create Record" size="small" @click="createAction()" />
            </div>

            <!-- Filters -->
            <jinz-filter :store="party">
                <div class="col-12 sm:col-6 lg:col-2">
                    <InputText v-model="filterField.name" type="text" size="small" class="w-full" placeholder="Search by name" v-debounce:500ms="listingFilter" />
                </div>
                <div class="col-12 sm:col-6 lg:col-2">
                    <InputText v-model="filterField.mobile" type="text" size="small" class="w-full" placeholder="Search by mobile" v-debounce:500ms="listingFilter" />
                </div>
                <div class="col-12 sm:col-6 lg:col-2">
                    <InputText v-model="filterField.email" type="text" size="small" class="w-full" placeholder="Search by email" v-debounce:500ms="listingFilter" />
                </div>
                <div class="col-12 sm:col-6 lg:col-2">
                    <Select v-model="filterField.type" :options="partyTypeOptions" optionLabel="label" optionValue="value" class="w-full" inputClass="p-2 text-sm" style="height: 29.4px" placeholder="Select type" @change="listingFilter" />
                </div>
                <div class="col-12 sm:col-6 lg:col-2">
                    <Select v-model="filterField.status" :options="status" optionLabel="name" filter class="w-full" inputClass="p-2 text-sm" style="height: 29.4px" placeholder="Select status" @change="listingFilter" />
                </div>
                <div class="col-12 sm:col-6 lg:col-2">
                    <DatePicker v-model="filterField.createdAt" class="w-full" showIcon inputClass="p-2 text-sm" placeholder="Search by created date" @date-select="listingFilter" />
                </div>
            </jinz-filter>

            <!-- Table -->
            <jinzTable :store="party">
                <Column field="name" header="Name" />
                <Column field="type" header="Type" class="capitalize" />
                <Column field="mobile" header="Mobile" />
                <Column field="email" header="Email" />
                <Column field="gst" header="GST No." />
                <Column field="status" header="Status">
                    <template #body="{ data }">
                        <Tag :severity="data.status ? 'success' : 'danger'">
                            {{ data.status ? 'Active' : 'Inactive' }}
                        </Tag>
                    </template>
                </Column>
                <Column field="createdAt" header="Created Date" />
                <Column field="action" header="Action">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <Button icon="pi pi-file-edit" size="small" label="Edit" @click="updateAction(data)" />
                            <Button :icon="`pi pi-${data.status ? 'times-circle' : 'check-circle'}`" size="small" :label="data.status ? 'Deactivate' : 'Activate'" @click="updateStatusDialog(data)" />
                            <Button icon="pi pi-trash" size="small" label="Delete" @click="deleteDialog(data)" />
                            <Button icon="pi pi-eye" size="small" label="View" @click="viewAction(data)" />
                        </div>
                    </template>
                </Column>
            </jinzTable>

            <!-- Create / Update / View Form -->
            <jinzFormDialog
                :title="`${party.formDialogType} ${title}`"
                :visible="party.formDialogVisibility"
                :disabled="isEqual(party.formDialogType, 'view')"
                :isUpdate="isEqual(party.formDialogType, 'update')"
                :atReset="atFromReset"
                :atFetch="atFormSubmit"
                :atFinish="atFormSubmited"
            >
                <div class="grid">
                    <!-- Basic Info -->
                    <div class="col-12">
                        <p class="text-base font-bold text-500 uppercase mb-0" style="letter-spacing: 0.05em">Basic Info</p>
                        <Divider class="mt-2 mb-3" />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.name"
                            name="name"
                            rules="required|max:255"
                            size="large"
                            placeholder="Party Name"
                            label="Party Name"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.name = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            filedType="single-select"
                            :value="formField.type"
                            :options="partyTypeOptions"
                            optionLabel="label"
                            optionValue="value"
                            name="type"
                            rules="required"
                            size="large"
                            placeholder="Select Party Type"
                            label="Party Type"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.type = value)"
                        />
                    </div>

                    <!-- Contact -->
                    <div class="col-12">
                        <p class="text-base font-bold text-500 uppercase mb-0" style="letter-spacing: 0.05em">Contact</p>
                        <Divider class="mt-2 mb-3" />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.mobile"
                            name="mobile"
                            rules="required|digits:10"
                            size="large"
                            placeholder="Mobile Number"
                            label="Mobile Number"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.mobile = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled :value="formField.email" name="email" rules="email" size="large" placeholder="Email" label="Email" :disabled="isEqual(party.formDialogType, 'view')" @atInput="(value) => (formField.email = value)" />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.contactPerson"
                            name="contactPerson"
                            rules="max:100"
                            size="large"
                            placeholder="Contact Person"
                            label="Contact Person"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.contactPerson = value)"
                        />
                    </div>

                    <!-- Address -->
                    <div class="col-12">
                        <p class="text-base font-bold text-500 uppercase mb-0" style="letter-spacing: 0.05em">Address</p>
                        <Divider class="mt-2 mb-3" />
                    </div>

                    <div class="col-12 pb-0">
                        <jinzFiled
                            :value="formField.address"
                            name="address"
                            rules="max:500"
                            size="large"
                            filedType="text-area"
                            placeholder="Address"
                            label="Address"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.address = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled :value="formField.city" name="city" rules="max:50" size="large" placeholder="City" label="City" :disabled="isEqual(party.formDialogType, 'view')" @atInput="(value) => (formField.city = value)" />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled :value="formField.state" name="state" rules="max:50" size="large" placeholder="State" label="State" :disabled="isEqual(party.formDialogType, 'view')" @atInput="(value) => (formField.state = value)" />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.stateCode"
                            name="stateCode"
                            rules="max:10"
                            size="large"
                            placeholder="State Code"
                            label="State Code"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.stateCode = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled :value="formField.pincode" name="pincode" rules="digits:6" size="large" placeholder="Pincode" label="Pincode" :disabled="isEqual(party.formDialogType, 'view')" @atInput="(value) => (formField.pincode = value)" />
                    </div>

                    <!-- GST -->
                    <div class="col-12">
                        <p class="text-base font-bold text-500 uppercase mb-0" style="letter-spacing: 0.05em">GST Details</p>
                        <Divider class="mt-2 mb-3" />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled :value="formField.gst" name="gst" rules="max:20" size="large" placeholder="GST Number" label="GST Number" :disabled="isEqual(party.formDialogType, 'view')" @atInput="(value) => (formField.gst = value)" />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            filedType="single-select"
                            :value="formField.gstType"
                            :options="gstTypeOptions"
                            optionLabel="label"
                            optionValue="value"
                            name="gstType"
                            size="large"
                            placeholder="Select GST Type"
                            label="GST Type"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.gstType = value)"
                        />
                    </div>

                    <!-- Bank -->
                    <div class="col-12">
                        <p class="text-base font-bold text-500 uppercase mb-0" style="letter-spacing: 0.05em">Bank & Payment</p>
                        <Divider class="mt-2 mb-3" />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.bankName"
                            name="bankName"
                            rules="max:100"
                            size="large"
                            placeholder="Bank Name"
                            label="Bank Name"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.bankName = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.accountHolderName"
                            name="accountHolderName"
                            rules="max:100"
                            size="large"
                            placeholder="Account Holder Name"
                            label="Account Holder Name"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.accountHolderName = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.accountNumber"
                            name="accountNumber"
                            rules="max:20"
                            size="large"
                            placeholder="Account Number"
                            label="Account Number"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.accountNumber = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled :value="formField.ifsc" name="ifsc" rules="max:20" size="large" placeholder="IFSC Code" label="IFSC Code" :disabled="isEqual(party.formDialogType, 'view')" @atInput="(value) => (formField.ifsc = value)" />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled :value="formField.upiId" name="upiId" rules="max:50" size="large" placeholder="UPI ID" label="UPI ID" :disabled="isEqual(party.formDialogType, 'view')" @atInput="(value) => (formField.upiId = value)" />
                    </div>

                    <!-- Credit -->
                    <div class="col-12">
                        <p class="text-base font-bold text-500 uppercase mb-0" style="letter-spacing: 0.05em">Credit & Balance</p>
                        <Divider class="mt-2 mb-3" />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.creditLimit"
                            name="creditLimit"
                            filedType="number"
                            size="large"
                            placeholder="Credit Limit"
                            label="Credit Limit"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.creditLimit = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.creditDays"
                            name="creditDays"
                            filedType="number"
                            size="large"
                            placeholder="Credit Days"
                            label="Credit Days"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.creditDays = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.openingBalance"
                            name="openingBalance"
                            filedType="number"
                            size="large"
                            placeholder="Opening Balance"
                            label="Opening Balance"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.openingBalance = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.receivableBalance"
                            name="receivableBalance"
                            filedType="number"
                            size="large"
                            placeholder="Receivable Balance"
                            label="Receivable Balance"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.receivableBalance = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            :value="formField.payableBalance"
                            name="payableBalance"
                            filedType="number"
                            size="large"
                            placeholder="Payable Balance"
                            label="Payable Balance"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.payableBalance = value)"
                        />
                    </div>

                    <!-- Others -->
                    <div class="col-12">
                        <p class="text-base font-bold text-500 uppercase mb-0" style="letter-spacing: 0.05em">Others</p>
                        <Divider class="mt-2 mb-3" />
                    </div>

                    <div class="col-12 pb-0">
                        <jinzFiled
                            :value="formField.notes"
                            name="notes"
                            rules="max:1000"
                            size="large"
                            filedType="text-area"
                            placeholder="Notes"
                            label="Notes"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.notes = value)"
                        />
                    </div>

                    <div class="col-12 pb-0">
                        <div class="flex align-items-center gap-2">
                            <ToggleSwitch v-model="formField.isActive" :disabled="isEqual(party.formDialogType, 'view')" inputId="isActive" />
                            <label for="isActive" class="font-bold">Active</label>
                        </div>
                    </div>
                </div>
            </jinzFormDialog>
        </div>
    </div>
</template>