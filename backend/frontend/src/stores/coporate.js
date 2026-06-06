import { defineStore } from 'pinia';
import { isEmpty, isNull } from 'lodash';
import { perPage } from '@utils/constant';
import { HTTP, handleError } from '@plugins/axios';

export const useCategory = defineStore('corporate', {
    state: () => ({
        singleItem: {},
        selectedRow: null,
        perPage: perPage,
        currentPage: 0,
        formDialogVisibility: false,
        formDialogType: null,
        file: '',

        formField: {
            name: '',
            icon: '',
            quantityType: '',
            formFields: []
        },

        filterField: {
            name: '',
            quantityType: '',
            status: null,
            createdAt: null
        }
    }),

    actions: {

        async fetchById() {
            const listUrl = `category/${this.selectedRow.id}`;
            try {
                const response = await HTTP.get(listUrl);
                if (response.data.response) {
                    const data = response.data.data;
                    this.singleItem = data;
                    this.formField.name = data.name;
                    this.formField.icon = data.icon;
                    this.formField.quantityType = data.quantityType;
                    this.formField.formFields = JSON.parse(data.formFields) || [];
                } else {
                    return response;
                }
            } catch (error) {
                return handleError(error);
            }
        },

        async fetchStatus() {
            const url = `category-status/${this.selectedRow.id}`;
            try {
                const result = await HTTP.get(url);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async fetchCreate() {
            try {
                const result = await HTTP.post('category', {
                    name: this.formField.name,
                    icon: this.formField.icon,
                    quantityType: this.formField.quantityType,
                    formFields: JSON.stringify(this.formField.formFields)
                });
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async fetchUpdate() {
            try {
                const result = await HTTP.patch(`category/${this.selectedRow.id}`, {
                    name: this.formField.name,
                    icon: this.formField.icon,
                    quantityType: this.formField.quantityType,
                    formFields: JSON.stringify(this.formField.formFields)
                });
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async fetchDelete() {
            const listUrl = `category/${this.selectedRow.id}`;
            try {
                const response = await HTTP.delete(listUrl);
                return response;
            } catch (error) {
                return handleError(error);
            }
        },

        filterReset() {
            this.filterField.name = '';
            this.filterField.quantityType = '';
            this.filterField.status = null;
            this.filterField.createdAt = null;
        },

        formReset() {
            this.formField.name = '';
            this.formField.icon = '';
            this.formField.quantityType = '';
            this.formField.formFields = [];
            this.file = '';
        }
    }
});
