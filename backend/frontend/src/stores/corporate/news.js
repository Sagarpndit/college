import { defineStore } from 'pinia';
import { isEmpty, isNull } from 'lodash';
import { perPage } from '@utils/constant';
import { HTTP, handleError } from '@plugins/axios';

export const useNews = defineStore('news', {
    state: () => ({
        newsId: null,
        list: [],
        singleItem: {},
        selectedRow: null,
        dropdown: [],
        perPage: perPage,
        currentPage: 0,
        formDialogVisibility: false,
        formDialogType: null,
        file: '',
        file1: '',
        file2: '',
        formField: {
            cityId: [],
            listType: 'row',
            stateId: null,
            tagId: null,
            categoryId: [],
            authorId: null,
            customAuthor: '',
            tag: '',
            titleSlug: '',
            title: '',
            slugColor: 'cc1212',
            thumbnail: '',
            video: '',
            podcast: '',
            podcastHighlight: false,
            relatedNews: [],
            location: '',
            isCustomLocation: false,
            isCustomTag: false,
            isCustomAuthor: false
        },

        filterField: {
            id: '',
            title: '',
            slug: '',
            status: null,
            stateId: null,
            cityId: null,
            categoryId: null,
            tagId: null,
            authorId: null,
            customLocation: '',
            customTag: '',
            customAuthor: '',
            createdAt: null,
            publishedAt: null
        }
    }),

    actions: {
        async fetchList() {
            const idFilter = !isEmpty(this.filterField.id) ? `&id=${encodeURIComponent(this.filterField.id)}` : '';
            const titleFilter = !isEmpty(this.filterField.title) ? `&title=${encodeURIComponent(this.filterField.title)}` : '';
            const slugFilter = !isEmpty(this.filterField.slug) ? `&slug=${encodeURIComponent(this.filterField.slug)}` : '';
            const statusFilter = !isNull(this.filterField.status) ? `&status=${this.filterField.status.value}` : '';
            const stateFilter = !isNull(this.filterField.stateId) ? `&stateId=${this.filterField.stateId.value}` : '';
            const cityFilter = !isNull(this.filterField.cityId) ? `&cityId=${this.filterField.cityId.value}` : '';
            const categoryFilter = !isNull(this.filterField.categoryId) ? `&categoryId=${this.filterField.categoryId.value}` : '';
            const tagFilter = !isNull(this.filterField.tagId) ? `&tagId=${this.filterField.tagId.value}` : '';
            const authorFilter = !isNull(this.filterField.authorId) ? `&authorId=${this.filterField.authorId.value}` : '';
            const customLocationFilter = !isEmpty(this.filterField.customLocation) ? `&customLocation=${encodeURIComponent(this.filterField.customLocation)}` : '';
            const customTagFilter = !isEmpty(this.filterField.customTag) ? `&customTag=${encodeURIComponent(this.filterField.customTag)}` : '';
            const customAuthorFilter = !isEmpty(this.filterField.customAuthor) ? `&customAuthor=${encodeURIComponent(this.filterField.customAuthor)}` : '';
            const createdAtFilter = !isNull(this.filterField.createdAt) ? `&createdAt=${this.filterField.createdAt.toLocaleDateString('en-CA')}` : '';
            const publishedAtFilter = !isNull(this.filterField.publishedAt) ? `&publishedAt=${this.filterField.publishedAt.toLocaleDateString('en-CA')}` : '';

            const listUrl = `news?page=${this.currentPage}&per_page=${this.perPage}${idFilter}${titleFilter}${slugFilter}${statusFilter}${stateFilter}${cityFilter}${categoryFilter}${tagFilter}${authorFilter}${customLocationFilter}${customTagFilter}${customAuthorFilter}${createdAtFilter}${publishedAtFilter}`;
            try {
                const result = await HTTP.get(listUrl);
                if (result.data.response) {
                    const listData = result.data;
                    this.list = listData.data;
                }
            } catch (error) {
                return handleError(error);
            }
        },

        async fetchById() {
            const listUrl = `news/${this.selectedRow.id}`;
            try {
                const response = await HTTP.get(listUrl);
                if (response.data.response) {
                    const data = response.data.data;
                    this.singleItem = data;
                    this.formField.cityId = data.cityId;
                    this.formField.listType = data.listType;
                    this.formField.stateId = data.stateId;
                    this.formField.tagId = data.tagId;
                    this.formField.categoryId = data.categoryId;
                    this.formField.authorId = data.authorId;
                    this.formField.customAuthor = data.customAuthor;
                    this.formField.tag = data.tag;
                    this.formField.titleSlug = data.titleSlug;
                    this.formField.title = data.title;
                    this.formField.slugColor = data.slugColor;
                    this.formField.thumbnail = data.thumbnail;
                    this.formField.video = data.video;
                    this.formField.podcast = data.podcast;
                    this.formField.podcastHighlight = data.podcastHighlight;
                    this.formField.relatedNews = data.relatedNews || [];
                    this.formField.location = data.location;
                    this.formField.isCustomLocation = data.location.length ? true : false;
                    this.formField.isCustomTag = data.tag.length ? true : false;
                    this.formField.isCustomAuthor = this.formField.customAuthor && this.formField.customAuthor.length ? true : false;
                } else {
                    return response;
                }
            } catch (error) {
                return handleError(error);
            }
        },

        async fetchPreview() {
            const listUrl = `news/${this.newsId}`;
            try {
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

        async fetchCreate() {
            try {
                const result = await HTTP.post(`news`, {
                    cityId: this.formField.cityId,
                    listType: this.formField.listType,
                    tagId: this.formField.tagId,
                    stateId: this.formField.stateId,
                    categoryId: this.formField.categoryId,
                    authorId: this.formField.authorId,
                    customAuthor: this.formField.customAuthor,
                    tag: this.formField.tag,
                    titleSlug: this.formField.titleSlug,
                    title: this.formField.title,
                    slugColor: this.formField.slugColor,
                    thumbnail: this.formField.thumbnail,
                    video: this.formField.video,
                    podcast: this.formField.podcast,
                    podcastHighlight: this.formField.podcastHighlight ? 1 : 0,
                    relatedNews: this.formField.relatedNews,
                    location: this.formField.location
                });
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async fetchUpdate() {
            try {
                const result = await HTTP.patch(`news/${this.selectedRow.id}`, {
                    cityId: this.formField.cityId,
                    listType: this.formField.listType,
                    tagId: this.formField.tagId,
                    stateId: this.formField.stateId,
                    categoryId: this.formField.categoryId,
                    authorId: this.formField.authorId,
                    customAuthor: this.formField.customAuthor,
                    tag: this.formField.tag,
                    titleSlug: this.formField.titleSlug,
                    title: this.formField.title,
                    slugColor: this.formField.slugColor,
                    thumbnail: this.formField.thumbnail,
                    video: this.formField.video,
                    podcast: this.formField.podcast,
                    podcastHighlight: this.formField.podcastHighlight ? 1 : 0,
                    relatedNews: this.formField.relatedNews,
                    location: this.formField.location
                });

                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async fetchStatus(status, scheduledAt = null) {
            const scheduledAtFilter = scheduledAt ? `?scheduledAt=${encodeURIComponent(scheduledAt.toISOString())}` : '';
            const listUrl = `news-status/${this.selectedRow.id}/${status}${scheduledAtFilter}`;
            try {
                const result = await HTTP.get(listUrl);
                return result;
            } catch (error) {
                return handleError(error);
            }
        },

        async fetchDelete() {
            const listUrl = `news/${this.selectedRow.id}`;
            try {
                const response = await HTTP.delete(listUrl);
                return response;
            } catch (error) {
                return handleError(error);
            }
        },

        async fetchDropdown() {
            const listUrl = `news-notification-dropdown`;
            try {
                const response = await HTTP.get(listUrl);
                this.dropdown = response.data.data;
            } catch (error) {
                return handleError(error);
            }
        },

        filterReset() {
            this.filterField.id = '';
            this.filterField.title = '';
            this.filterField.slug = '';
            this.filterField.status = null;
            this.filterField.stateId = null;
            this.filterField.cityId = null;
            this.filterField.categoryId = null;
            this.filterField.tagId = null;
            this.filterField.authorId = null;
            this.filterField.customLocation = '';
            this.filterField.customTag = '';
            this.filterField.customAuthor = '';
            this.filterField.createdAt = null;
            this.filterField.publishedAt = null;
        },

        formReset() {
            this.formField.cityId = [];
            this.formField.stateId = null;
            this.formField.tagId = null;
            this.formField.categoryId = [];
            this.formField.authorId = null;
            this.formField.customAuthor = '';
            this.formField.tag = '';
            this.formField.titleSlug = '';
            this.formField.title = '';
            this.formField.slugColor = 'cc1212';
            this.formField.thumbnail = '';
            this.formField.video = '';
            this.formField.podcast = '';
            this.formField.podcastHighlight = '';
            this.formField.relatedNews = [];
            this.formField.location = '';
            this.formField.isCustomLocation = false;
            this.formField.isCustomTag = false;
            this.formField.isCustomAuthor = false;
            this.file = '';
            this.file1 = '';
            this.file2 = '';
        }
    }
});
