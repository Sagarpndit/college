<script setup>
import { ref } from 'vue';
import { composables } from '@composables/index';

const props = defineProps({
    store: {
        type: Object,
        required: true
    }
});

const resetLoading = ref(false);
const useStore = props.store;
const { setTableLoading } = composables();

const fetchList = async () => {
    resetLoading.value = true;
    useStore.currentPage = 0;
    setTableLoading(true);
    await useStore.fetchList();
    useStore.selectedRow = null;
    setTableLoading(false);
    resetLoading.value = false;
};

const resetFilter = () => {
    useStore.filterReset();
    fetchList();
};
</script>

<template>
    <div class="surface-100 border-round-lg mb-4 px-2">
        <div class="grid">
            <slot />

            <div class="col-12 sm:col-6 lg:col-2">
                <Button label="Clear Filter" icon="pi pi-filter-slash" severity="danger" size="small" @click="resetFilter" :loading="resetLoading" />
            </div>
        </div>
    </div>
</template>
