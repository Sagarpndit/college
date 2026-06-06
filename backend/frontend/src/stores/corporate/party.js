import { defineStore } from 'pinia';
import { isEmpty, isNull } from 'lodash';
import { perPage } from '@utils/constant';
import { HTTP, handleError } from '@plugins/axios';

export const useParty = defineStore('party', {
    state: () => ({
        list: [],
        singleItem: {},
        selectedRow: null,

        perPage: perPage,
        currentPage: 0,

        formDialogVisibility: false,
        formDialogType: null,

        formField: {

            // Basic Info
            name: '',
            type: '',

            // Contact
            mobile: '',
            email: '',
            contactPerson: '',

            // Address
            address: '',
            city: '',
            state: '',
            stateCode: '',
            pincode: '',

            // GST
            gst: '',
            gstType: '',

            // Bank
            bankName: '',
            accountHolderName: '',
            accountNumber: '',
            ifsc: '',
            upiId: '',

            // Credit
            creditLimit: 0,
            creditDays: 0,
            openingBalance: 0,
            receivableBalance: 0,
            payableBalance: 0,

            // Others
            notes: '',
            isActive: true
        },

        filterField: {
            name: '',
            mobile: '',
            email: '',
            city: '',
            state: '',
            gst: '',
            isActive: null
        }
    }),

    actions: {

        // LIST
        async fetchList() {
            const nameFilter = !isEmpty(this.filterField.name) ? `&name=${this.filterField.name}` : '';
            const mobileFilter = !isEmpty(this.filterField.mobile) ? `&mobile=${this.filterField.mobile}` : '';
            const emailFilter = !isEmpty(this.filterField.email) ? `&email=${this.filterField.email}` : '';
            const cityFilter = !isEmpty(this.filterField.city) ? `&city=${this.filterField.city}` : '';
            const stateFilter = !isEmpty(this.filterField.state) ? `&state=${this.filterField.state}` : '';
            const gstFilter = !isEmpty(this.filterField.gst) ? `&gst=${this.filterField.gst}` : '';
            const statusFilter = !isNull(this.filterField.isActive) ? `&isActive=${this.filterField.isActive}` : '';

            const url = `party?page=${this.currentPage}&per_page=${this.perPage}${nameFilter}${mobileFilter}${emailFilter}${cityFilter}${stateFilter}${gstFilter}${statusFilter}`;

            try {
                const result = await HTTP.get(url);
                if (result.data.response) {
                    this.list = result.data.data;
                }
            } catch (error) {
                return handleError(error);
            }
        },

        // GET BY ID
        async fetchById() {
            const url = `party/${this.selectedRow.id}`;

            try {
                const response = await HTTP.get(url);

                if (response.data.response) {
                    const data = response.data.data;
                    this.singleItem = data;

                    this.formField = {
                        ...this.formField,
                        ...data
                    };
                }

            } catch (error) {
                return handleError(error);
            }
        },

        // CREATE
        async fetchCreate() {
            try {
                const result = await HTTP.post(`party`, this.formField);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // UPDATE
        async fetchUpdate() {
            try {
                const result = await HTTP.patch(
                    `party/${this.selectedRow.id}`,
                    this.formField
                );
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // STATUS TOGGLE
        async fetchStatus() {
            try {
                const result = await HTTP.get(`party-status/${this.selectedRow.id}`);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // DELETE
        async fetchDelete() {
            try {
                const result = await HTTP.delete(`party/${this.selectedRow.id}`);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // RESET FILTER
        filterReset() {
            this.filterField = {
                name: '',
                mobile: '',
                email: '',
                city: '',
                state: '',
                gst: '',
                isActive: null
            };
        },

        // RESET FORM
        formReset() {
            this.formField = {
                name: '',
                type: '',
                mobile: '',
                email: '',
                contactPerson: '',
                address: '',
                city: '',
                state: '',
                stateCode: '',
                pincode: '',
                gst: '',
                gstType: '',
                bankName: '',
                accountHolderName: '',
                accountNumber: '',
                ifsc: '',
                upiId: '',
                creditLimit: 0,
                creditDays: 0,
                openingBalance: 0,
                receivableBalance: 0,
                payableBalance: 0,
                notes: '',
                isActive: true
            };
        }
    }
});