import { isEmpty, isNull } from 'lodash';
import { HTTP, handleError } from '@plugins/axios';
import { defineStore } from 'pinia';

export const useDropdown = defineStore('dropdown', {
    state: () => ({
        // serviceList: []
        partyList: []
    }),

    actions: {
        async fetchPartyList() {
            const listUrl = `/party-dropdown`
            try {
                const result = await HTTP.get(listUrl);
                const listData = result.data.data;
                this.partyList = listData;
                console.log(this.partyList);
            } catch (error) {
                return handleError(error);
            }
        }

    }
});
