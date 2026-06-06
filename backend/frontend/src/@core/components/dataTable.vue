<script setup>
import DataTable from 'primevue/datatable';
import { isEqual } from 'lodash';
import { onBeforeMount, useAttrs } from 'vue';
import { perPageOption } from '@utils/constant';
import { composables } from '@composables/index';

const attrs = useAttrs();

const props = defineProps({
    store: {
        type: Object,
        required: true
    }
});

const useStore = props.store;
const { setTableLoading, tableLoading } = composables();

const fetchList = async () => {
    setTableLoading(true);
    await useStore.fetchList();
    setTableLoading(false);
};

const paginatorHandel = (event) => {
    if (!isEqual(useStore.currentPage, event.page)) {
        useStore.currentPage = event.page;
        setTableLoading(true);
        useStore.selectedRow = null;
        fetchList();
    }

    if (!isEqual(useStore.perPage, event.rows)) {
        useStore.perPage = event.rows;
        setTableLoading(true);
        useStore.selectedRow = null;
        fetchList();
    }
};

onBeforeMount(() => {
    fetchList();
});
</script>
<template>
    <DataTable
        :value="useStore.list.data"
        :loading="tableLoading"
        lazy
        paginator
        dataKey="id"
        class="mt-5 -mx-4"
        :first="store.currentPage * store.perPage"
        :rows="store.perPage"
        :totalRecords="store.list.totalRecord"
        :rowsPerPageOptions="perPageOption"
        @page="paginatorHandel"
        v-bind="{
            ...attrs
        }"
    >
        <template #empty> No data found. </template>
        <template #loading> Loading data. Please wait. </template>
        <slot />

        <template #expansion="slotProps">
            <slot name="expansion" :propsName="slotProps" />
        </template>
    </DataTable>
</template>
