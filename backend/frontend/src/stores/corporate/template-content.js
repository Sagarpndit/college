import { defineStore } from 'pinia';
import { HTTP, handleError } from '@plugins/axios';
export const useTemplateContent = defineStore('templateContent', {
    state: () => ({
        collegeId: null,
        templateContent: [],
        selectedRow: null,
        formDialogVisibility: false,
        formDialogType: null,
        formField: {
            content: '',
            name: '',
        },
        file: '',
    }),

    actions: {
        async fetchCreate() {
            try {
                const url = `template/${this.collegeId}`;
                const result = await HTTP.patch(url, {
                    name: this.formField.name,
                    content: this.formField.content,
                });
                return result;
            } catch (error) {
                handleError(error);
            }
        },

        async fetchUpdate() {
            try {
                const url = `template/${this.collegeId}/content/${this.selectedRow.hash}`;

                const result = await HTTP.patch(url, {
                    name: this.formField.name,
                    content: this.formField.content,

                });
                return result;
            } catch (error) {
                handleError(error);
            }
        },

        async fetchDelete() {
            try {
                const url = `template/${this.collegeId}/content/${this.selectedRow.hash}`;
                const result = await HTTP.delete(url);
                return result;
            } catch (error) {
                handleError(error);
            }
        },

        async fetchReOrder() {
            try {
                const url = `template/${this.collegeId}/reorder`;

                const result = await HTTP.patch(url, {
                    content: this.templateContent
                });
                return result;
            } catch (error) {
                handleError(error);
            }
        },

        formReset() {
            this.formField.name = '';
            this.formField.content = '';
            this.file = '';

        }
    }
});
