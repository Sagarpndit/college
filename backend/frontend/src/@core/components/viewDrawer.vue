<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },

    visible: {
        type: Boolean,
        required: true
    },

    width: {
        type: String,
        default: '650px'
    },

    wrapperClass: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['atClose']);

const atClose = () => {
    emit('atClose');
};
</script>
<template>
    <Drawer class="view-drawer" :visible="visible" :dismissable="false" :show-close-icon="false" position="right" :style="`width: ${width}`">
        <!-- Header -->
        <template #header>
            <div class="flex align-items-center justify-content-between p-3">
                <div class="font-semibold text-lg capitalize">
                    {{ title }}
                </div>
                <Button icon="pi pi-times" severity="danger" rounded outlined aria-label="Cancel" @click="atClose" />
            </div>
        </template>

        <!-- Body -->
        <div :class="`content-wrapper ${wrapperClass}`">
            <slot />
        </div>

        <!-- Footer -->
        <template #footer>
            <div class="flex align-items-center justify-content-end p-3 gap-2">
                <slot name="footer">
                    <Button label="Cancel" icon="pi pi-times" severity="danger" outlined @click="atClose" />
                </slot>
            </div>
        </template>
    </Drawer>
</template>

<style lang="scss">
.view-drawer {
    @media (max-width: 650px) {
        width: 100% !important;
    }

    > .p-drawer-header {
        display: block;
        padding: 0px;
    }

    > .p-drawer-content {
        height: 100%;
        padding: 0px;
        overflow: hidden;

        > .content-wrapper {
            overflow-y: auto;
            height: 100%;
            padding: 1rem;
            border-top: 1px solid lightgrey;
            border-bottom: 1px solid lightgrey;
        }
    }

    > .p-drawer-footer {
        display: block;
        padding: 0px;
    }
}
</style>
