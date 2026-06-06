<script setup>
import { composables } from '@composables/index';

const props = defineProps({
    title: {
        type: String,
        required: true
    },

    visible: {
        type: Boolean,
        required: true
    },

    disabled: {
        type: Boolean,
        required: true
    },

    disabledFiled: {
        type: Boolean,
        default: false
    },

    isUpdate: {
        type: Boolean,
        required: false
    },

    atFetch: {
        type: Function,
        required: true
    },

    atFinish: {
        type: Function,
        required: false
    },

    atReset: {
        type: Function,
        required: true
    },

    submitButtonText: {
        type: String,
        default: ''
    }
});

const { formLoading } = composables();
</script>

<template>
    <Drawer class="form-sidebar" :visible="visible" :dismissable="false" :show-close-icon="false" position="right">
        <!-- Header -->
        <template #header>
            <div class="flex align-items-center justify-content-between p-3">
                <div class="font-semibold text-lg capitalize">
                    {{ title }}
                </div>
                <Button icon="pi pi-times" severity="danger" rounded outlined aria-label="Cancel" @click="atReset" />
            </div>
        </template>

        <jinzForm :atFetch="atFetch" :atFinish="atFinish" :atReset="atReset">
            <!-- Body -->
            <div class="p-3 form-body">
                <div :class="disabled && !disabledFiled ? 'cursor-none' : ''">
                    <slot />
                </div>
            </div>

            <!-- Footer -->
            <div class="flex align-items-center justify-content-end gap-2 p-3">
                <template v-if="disabled">
                    <Button label="Cancel" icon="pi pi-times" severity="danger" outlined @click="atReset" />
                </template>
                <template v-else>
                    <Button label="Cancel" type="reset" icon="pi pi-times" outlined severity="danger" />
                    <Button :label="submitButtonText.length > 0 ? submitButtonText : isUpdate ? 'Update' : 'Create'" type="submit" icon="pi pi-check" severity="primary" :loading="formLoading" />
                </template>
            </div>
        </jinzForm>
    </Drawer>
</template>

<style lang="scss">
.form-sidebar {
    width: 100% !important;
    > .p-drawer-header {
        display: block;
        padding: 0px;
    }

    > .p-drawer-content {
        height: 100%;
        padding: 0px;
        overflow: hidden;

        > form {
            height: 99.9%;

            > .form-body {
                overflow-y: auto;
                height: calc(100% - 63px);
                border-top: 1px solid lightgrey;
                border-bottom: 1px solid lightgrey;
            }
        }
    }

    > .p-drawer-footer {
        display: none;
    }
}

@media (min-width: 650px) {
    .form-sidebar {
        width: 650px !important;
    }
}
</style>
