<script setup>
import { useAuth } from '@store/auth';
import { onBeforeMount, onBeforeUnmount, watch } from 'vue';
import { status } from '@utils/constant';
import { useItem } from '@store/corporate/items';
import { useParty } from '@store/corporate/party';
import { useDropdown } from '@store/dropdown';
// import { useCategory } from '@store/corporate/category';
import { resetForm, composables } from '@composables/index';
import { isEqual, isNull } from 'lodash';

const authStore = useAuth();
const item = useItem();
const dropdown = useDropdown();
const party = useParty();
// const category = useCategory();

const title = 'Item';
const { setTableLoading, apiToast, confirmDialog } = composables();

const formField = item.formField;
const filterField = item.filterField;

// OPTIONS
const taxOptions = [0, 5, 12, 18, 28].map((v) => ({ label: `${v}%`, value: v }));
const taxTypeOptions = [
    { label: 'With Tax', value: 'with_tax' },
    { label: 'Without Tax', value: 'without_tax' }
];

// AUTO TAX CALC
watch(
    () => [formField.salePrice, formField.taxRate, formField.saleTaxType],
    () => {
        if (!formField.salePrice) return;

        if (formField.saleTaxType === 'with_tax') {
            formField.salePriceWithTax = formField.salePrice;
            formField.salePriceWithoutTax = formField.salePrice / (1 + formField.taxRate / 100);
        } else {
            formField.salePriceWithoutTax = formField.salePrice;
            formField.salePriceWithTax = formField.salePrice * (1 + formField.taxRate / 100);
        }
    }
);

// LIST
const fetchList = async () => {
    setTableLoading(true);
    await item.fetchList();
    setTableLoading(false);
};

// ACTIONS
const createAction = () => {
    item.formDialogType = 'create';
    item.formDialogVisibility = true;
};

const updateAction = async (data) => {
    item.selectedRow = data;
    await item.fetchById();
    item.formDialogType = 'update';
    item.formDialogVisibility = true;
};

const viewAction = async (data) => {
    item.selectedRow = data;
    await item.fetchById();
    item.formDialogType = 'view';
    item.formDialogVisibility = true;
};

const deleteDialog = (data) => {
    item.selectedRow = data;
    confirmDialog({
        header: 'Confirm',
        message: 'Delete item?',
        accept: fetchDelete
    });
};

const fetchDelete = async () => {
    await item.fetchDelete();
    fetchList();
};

// FORM
const atFormSubmit = async () => {
    if (isEqual(item.formDialogType, 'create')) return item.fetchCreate();
    if (isEqual(item.formDialogType, 'update')) return item.fetchUpdate();
};

const atFormSubmited = () => {
    apiToast({
        data: {
            response: true,
            message: `${title} saved successfully`
        }
    });
    resetForm(item);
    fetchList();
};

onBeforeMount(async () => {
    await dropdown.fetchPartyList();
});

onBeforeUnmount(() => {
    item.$reset();
});
</script>

<template>
    <div class="pages-wrapper">
        <div class="surface-0 border-round-lg shadow-1 px-4 pt-4">
            <!-- HEADER -->
            <div class="pb-4 flex justify-content-between">
                <p class="font-bold text-lg">{{ title }}</p>
                <Button icon="pi pi-plus" label="Create Item" size="small" @click="createAction()" />
            </div>
            <!-- FILTER -->
            <jinz-filter :store="item">
                <div class="col-12 sm:col-6 lg:col-2">
                    <InputText v-model="filterField.name" placeholder="Name" />
                </div>
                <div class="col-12 sm:col-6 lg:col-2">
                    <InputText v-model="filterField.hsnCode" placeholder="HSN Code" />
                </div>
                <!-- <div class="col-12 sm:col-6 lg:col-2">
                    <Select v-model="filterField.categoryId" :options="category.list" optionLabel="name" optionValue="_id" placeholder="Category" />
                </div> -->
                <div class="col-12 sm:col-6 lg:col-2">
                    <Select v-model="filterField.isActive" :options="status" optionLabel="name" placeholder="Status" />
                </div>
            </jinz-filter>

            <!-- TABLE -->
            <jinzTable :store="item">
                <Column field="name" header="Name" />
                <Column field="hsnCode" header="HSN Code" />
                <Column field="salePrice" header="Price" />

                <Column header="Stock">
                    <template #body="{ data }">
                        <Tag :severity="data.currentStock < data.minStockLevel ? 'danger' : 'success'">
                            {{ data.currentStock }}
                        </Tag>
                    </template>
                </Column>

                <Column field="taxRate" header="Tax %" />

                <Column header="Action">
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

            <!-- FORM -->
            <jinzFormDialog
                :title="`${item.formDialogType} ${title}`"
                :visible="item.formDialogVisibility"
                :disabled="isEqual(item.formDialogType, 'view')"
                :isUpdate="isEqual(item.formDialogType, 'update')"
                :atReset="() => resetForm(item)"
                :atFetch="atFormSubmit"
                :atFinish="atFormSubmited"
            >
                <div class="grid">
                    {{ formField }}
                    <!-- BASIC -->
                    <div class="col-12 pb-0">
                        <jinzFiled :value="formField.name" name="name" rules="required|max:255" size="large" placeholder="Item Name" label="Item Name" :disabled="isEqual(party.formDialogType, 'view')" @atInput="(value) => (formField.name = value)" />
                    </div>

                    <div class="col-12 pb-0">
                        <jinzFiled :value="formField.hsnCode" name="hsnCode" rules="max:255" size="large" placeholder="HSN Code" label="HSN Code" :disabled="isEqual(party.formDialogType, 'view')" @atInput="(value) => (formField.hsnCode = value)" />
                    </div>

                    <!-- <div class="col-12 md:col-6">
                        <jinzFiled filedType="single-select" label="Category" :options="category.list" optionLabel="name" optionValue="_id" :value="formField.categoryId" @atInput="(v) => (formField.categoryId = v)" />
                    </div> -->

                    <div class="col-12 pb-0">
                        <jinzFiled
                            filedType="single-select"
                            :value="formField.taxRate"
                            :options="dropdown.partyList"
                            optionLabel="label"
                            optionValue="value"
                            name="partyId"
                            rules="required"
                            placeholder="Supplier"
                            label="Party Type"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.partyId = value)"
                        />
                    </div>

                    <!-- TAX -->

                    <div class="col-12 pb-0">
                        <jinzFiled
                            filedType="single-select"
                            :value="formField.taxRate"
                            :options="taxOptions"
                            optionLabel="label"
                            optionValue="value"
                            name="taxRate"
                            rules="required"
                            placeholder="Tax Rate"
                            label="Tax Rate"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.taxRate = value)"
                        />
                    </div>

                    <div class="col-12 pb-0">
                        <jinzFiled
                            filedType="single-select"
                            :value="formField.saleTaxType"
                            :options="taxTypeOptions"
                            optionLabel="label"
                            optionValue="value"
                            name="saleTaxType"
                            rules="required"
                            size="large"
                            placeholder="Sale Tax Type"
                            label="Sale Tax Type"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.saleTaxType = value)"
                        />
                    </div>

                    <!-- PRICE -->
                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            filedType="number"
                            :value="formField.salePrice"
                            name="salePrice"
                            size="large"
                            placeholder="Item Code"
                            label="Sale Price"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.salePrice = value)"
                        />
                    </div>

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            filedType="number"
                            :value="formField.costPrice"
                            name="costPrice"
                            size="large"
                            placeholder="Item Code"
                            label="Cost Price"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.costPrice = value)"
                        />
                    </div>

                    <!-- STOCK -->

                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            filedType="number"
                            :value="formField.currentStock"
                            name="currentStock"
                            size="large"
                            placeholder="Current Stock"
                            label="Current Stock"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.currentStock = value)"
                        />
                    </div>
                    <div class="col-12 md:col-6 pb-0">
                        <jinzFiled
                            filedType="number"
                            :value="formField.minStockLevel"
                            name="minStockLevel"
                            size="large"
                            placeholder="Minimum Stock"
                            label="Minimum Stock"
                            :disabled="isEqual(party.formDialogType, 'view')"
                            @atInput="(value) => (formField.minStockLevel = value)"
                        />
                    </div>

                    <!-- <div class="col-12 md:col-6">
                        <jinzFiled filedType="date" label="Expiry Date" :value="formField.expiryDate" @atInput="(v) => (formField.expiryDate = v)" />
                    </div> -->
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

                    <!-- STATUS -->
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