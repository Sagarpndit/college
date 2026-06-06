import { defineStore } from 'pinia';
import { isEmpty, isNull } from 'lodash';
import { perPage } from '@utils/constant';
import { HTTP, handleError } from '@plugins/axios';

export const useItem = defineStore('items', {
    state: () => ({
        list: [],
        singleItem: {},
        selectedRow: null,

        perPage: perPage,
        currentPage: 0,

        formDialogVisibility: false,
        formDialogType: null,

        formField: {

            // ===== BASIC =====
            corporateId: '',
            name: '',
            // categoryId: '',
            brand: '',
            description: '',
            size: '',
            color: '',

            // ===== TAX =====
            hsnCode: '',
            sacCode: '',
            taxRate: 0,

            // ===== PRICING =====
            saleTaxType: 'with_tax',
            salePrice: 0,

            purchaseTaxType: 'without_tax',
            costPrice: 0,

            discount: 0,

            // ===== STOCK =====
            currentStock: 0,
            minStockLevel: 5,
            maxStockLevel: 100,
            location: '',

            // ===== OPENING =====
            openingStock: 0,
            openingStockPrice: 0,
            openingStockDate: null,

            // ===== SUPPLIER / BATCH =====
            partyId: '',
            partyName: '',
            purchaseOrderId: '',

            batchNumber: '',
            supplierBatchNumber: '',
            supplierCode: '',

            dateReceived: null,
            expiryDate: null,

            qualityNotes: '',

            supplierUnitPrice: 0,
            supplierTotalCost: 0,

            // ===== STATUS =====
            isActive: true,
            imagePath: ''
        },

        filterField: {
            name: '',
            // categoryId: '',
            brand: '',
            hsnCode: '',
            taxRate: '',
            currentStock: '',
            isActive: null
        }
    }),

    actions: {

        // ===== LIST =====
        async fetchList() {
            const nameFilter = !isEmpty(this.filterField.name) ? `&name=${this.filterField.name}` : '';
            const brandFilter = !isEmpty(this.filterField.brand) ? `&brand=${this.filterField.brand}` : '';
            const hsnFilter = !isEmpty(this.filterField.hsnCode) ? `&hsnCode=${this.filterField.hsnCode}` : '';
            const taxFilter = !isEmpty(this.filterField.taxRate) ? `&taxRate=${this.filterField.taxRate}` : '';
            const stockFilter = !isEmpty(this.filterField.currentStock) ? `&currentStock=${this.filterField.currentStock}` : '';
            const statusFilter = !isNull(this.filterField.isActive) ? `&isActive=${this.filterField.isActive}` : '';

            const url = `items?page=${this.currentPage}&per_page=${this.perPage}${nameFilter}${brandFilter}${hsnFilter}${taxFilter}${stockFilter}${statusFilter}`;

            try {
                const result = await HTTP.get(url);
                if (result.data.response) {
                    this.list = result.data.data;
                }
            } catch (error) {
                return handleError(error);
            }
        },

        // ===== GET BY ID =====
        async fetchById() {
            const url = `items/${this.selectedRow.id}`;

            try {
                const response = await HTTP.get(url);
                if (response.data.response) {
                    const data = response.data.data;
                    this.singleItem = data;

                    this.formField = {
                        ...this.formField,
                        ...data
                    };
                    console.log(this.formField)
                }

            } catch (error) {
                return handleError(error);
            }
        },

        // ===== CREATE =====
        async fetchCreate() {
            try {
                const result = await HTTP.post(`items`, this.formField);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // ===== UPDATE =====
        async fetchUpdate() {
            try {
                const result = await HTTP.patch(
                    `items/${this.selectedRow.id}`,
                    this.formField
                );
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // ===== STATUS =====
        async fetchStatus() {
            try {
                const result = await HTTP.get(`items-status/${this.selectedRow.id}`);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // ===== DELETE =====
        async fetchDelete() {
            try {
                const result = await HTTP.delete(`items/${this.selectedRow.id}`);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // ===== RESET FILTER =====
        filterReset() {
            this.filterField = {
                name: '',
                // categoryId: '',
                brand: '',
                hsnCode: '',
                taxRate: '',
                currentStock: '',
                isActive: null
            };
        },

        // ===== RESET FORM =====
        formReset() {
            this.formField = {

                corporateId: '',
                name: '',
                // categoryId: '',
                brand: '',
                description: '',
                size: '',
                color: '',

                hsnCode: '',
                sacCode: '',
                taxRate: 0,

                saleTaxType: 'with_tax',
                salePrice: 0,

                purchaseTaxType: 'without_tax',
                costPrice: 0,

                discount: 0,

                currentStock: 0,
                minStockLevel: 5,
                maxStockLevel: 100,
                location: '',

                openingStock: 0,
                openingStockPrice: 0,
                openingStockDate: null,

                partyId: '',
                partyName: '',
                purchaseOrderId: '',

                batchNumber: '',
                supplierBatchNumber: '',
                supplierCode: '',

                dateReceived: null,
                expiryDate: null,

                qualityNotes: '',

                supplierUnitPrice: 0,
                supplierTotalCost: 0,

                isActive: true,
                imagePath: ''
            };
        }
    }
});