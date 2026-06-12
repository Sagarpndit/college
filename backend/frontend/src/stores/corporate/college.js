import { defineStore } from 'pinia';
import { isEmpty, isNull } from 'lodash';
import { perPage } from '@utils/constant';
import { HTTP, handleError } from '@plugins/axios';

export const useCollege = defineStore('college', {
    state: () => ({
        collegeId: null,
        list: [],
        singleItem: {},
        selectedRow: null,

        perPage: perPage,
        currentPage: 0,

        formDialogVisibility: false,
        formDialogType: null,

        formField: {
            name: '',
            slug: '',
            shortName: '',
            collegeType: null,
            establishedYear: '',
            city: null,
            district: '',
            stateId: null,
            logo: null,
            bannerImage: '',
            nirfRank: '',
            content: [],
            image: [],
            website: '',
            shortDescription: '',
            seoTitle: '',
            seoDescription: '',
            seoKeywords: '',
            status: 0,
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

            const url = `college?page=${this.currentPage}&per_page=${this.perPage}${nameFilter}${brandFilter}${hsnFilter}${taxFilter}${stockFilter}${statusFilter}`;

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
            const url = `college/${this.selectedRow._id}`;
            console.log(url)
            try {
                const response = await HTTP.get(url);
                if (response.data.response) {
                    const data = response.data.data;
                    this.singleItem = data;

                    this.formField.name = data.name;
                    this.formField.slug = data.slug;
                    this.formField.shortName = data.shortName;
                    this.formField.collegeType = data.collegeType;
                    this.formField.establishedYear = data.establishedYear;
                    this.formField.city = data.city;
                    this.formField.district = data.district;
                    this.formField.stateId = data.stateId;
                    this.formField.logo = data.logo;
                    this.formField.bannerImage = data.bannerImage;
                    this.formField.nirfRank = data.nirfRank;
                    this.formField.content = data.content;
                    this.formField.website = data.website;
                    this.formField.shortDescription = data.shortDescription;
                    this.formField.seoTitle = data.seoTitle;
                    this.formField.seoDescription = data.seoDescription;
                    this.formField.seoKeywords = data.seoKeywords;
                    this.formField.status = data.status;
                }

            } catch (error) {
                return handleError(error);
            }
        },

        async fetchPreview() {
            const listUrl = `college/${this.collegeId}`;
            try {
                console.log(listUrl);
                const response = await HTTP.get(listUrl);
                if (response.data.response) {
                    const data = response.data.data;
                    this.singleItem = data;
                } else {
                    return response;
                }
            } catch (error) {
                return handleError(error);
            }
        },

        // ===== CREATE =====
        async fetchCreate() {
            try {
                const result = await HTTP.post(`college`, this.formField);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // ===== UPDATE =====
        async fetchUpdate() {
            try {
                const result = await HTTP.patch(
                    `college/${this.selectedRow._id}`,
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
                const result = await HTTP.get(`college-status/${this.selectedRow._id}`);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // ===== DELETE =====
        async fetchDelete() {
            try {
                const result = await HTTP.delete(`college/${this.selectedRow._id}`);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        // ===== RESET FILTER =====
        filterReset() {
            this.filterField = {
                name: '',
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

                name: '',
                slug: '',
                shortName: '',
                collegeType: null,
                establishedYear: '',
                city: null,
                district: '',
                state: '',
                logo: 0,
                bannerImage: '',
                nirfRank: 0,
                content: [],
                image: [],
                website: 0,
                shortDescription: 0,
                seoTitle: 0,
                seoDescription: 5,
                seoKeywords: 100,
                status: '',

            };
        }
    }
});