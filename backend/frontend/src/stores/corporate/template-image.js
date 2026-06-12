import { defineStore } from 'pinia';
import { HTTP, handleError } from '@plugins/axios';
export const useTemplateImageContent = defineStore('templateImageContent', {
    state: () => ({
        collegeId: null,
        templateImageContent: [],
        selectedRow: null,
        formDialogVisibility: false,
        formDialogType: null,
        formField: {
            image: '',
            hash: '',
        },
        file: '',
    }),

    actions: {
        async fetchCreate() {
            try {
                const url = `template-image/${this.collegeId}`;
                const result = await HTTP.patch(url, {
                    hash: this.formField.hash,
                    image: this.formField.image,
                });
                return result;
            } catch (error) {
                handleError(error);
            }
        },

        async fetchDelete() {
            try {
                const url = `template-image/${this.collegeId}/content/${this.selectedRow.hash}`;
                const result = await HTTP.delete(url);
                return result;
            } catch (error) {
                handleError(error);
            }
        },

        formReset() {
            this.formField.hash = '';
            this.formField.image = '';
            this.file = '';

        }
    }
});
