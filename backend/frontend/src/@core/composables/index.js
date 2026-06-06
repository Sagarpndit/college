import { ref } from 'vue';
import { isString } from 'lodash';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { HTTP, handleError } from '@plugins/axios';

const formLoading = ref(false);
const tableLoading = ref(true);
const actionLoading = ref(false);

export const resetForm = (storeName) => {
    storeName.formDialogVisibility = false;
    storeName.formDialogType = null;
    storeName.formReset();
};

export const fileBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

export const composables = () => {
    const toast = useToast();
    const confirm = useConfirm();

    const apiToast = (response) => {
        toast.add({
            severity: response.data.response ? 'success' : 'error',
            summary: response.data.response ? 'Awesome' : 'Error',
            detail: response.data.response ? (isString(response.data.message) ? response.data.message : 'Action completed.') : isString(response.data.message) ? response.data.message : 'Something went wrong.',
            life: response.data.life ? response.data.life : 3000
        });
    };

    const confirmDialog = (item) => {
        confirm.require({
            group: 'headless',
            header: item.header,
            message: item.message,
            accept: () => {
                item.accept();
            },
            reject: () => {
                toast.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                    life: 3000
                });
            }
        });
    };

    const setFormLoading = (value) => {
        formLoading.value = value;
    };

    const setTableLoading = (value) => {
        tableLoading.value = value;
    };

    const setActionLoading = (value) => {
        actionLoading.value = value;
    };

    return {
        formLoading,
        tableLoading,
        actionLoading,
        apiToast,
        confirmDialog,
        setFormLoading,
        setTableLoading,
        setActionLoading
    };
};

export const singleFileUpload = async (file) => {
    const tempFile = file;
    try {
        const formData = new FormData();
        if (typeof tempFile === 'object') {
            formData.append('file', tempFile);
        }
        const result = await HTTP.post(`upload-single`, formData);
        return result.data.file;
    } catch (error) {
        return handleError(error);
    }
};

export const multipleFileUpload = async (files) => {
    const tempFile = files;
    try {
        const formData = new FormData();
        if (tempFile.length) {
            tempFile.forEach((file) => {
                formData.append('files', file);
            });
        }
        const result = await HTTP.post(`upload-multiple`, formData);
        return result.data.files;
    } catch (error) {
        return handleError(error);
    }
};
