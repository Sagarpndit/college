import { listPerPage, listPerPageOption } from '@config/constants';

export const perPage = listPerPage;
export const perPageOption = listPerPageOption;


export const status = [
    {
        name: 'Active',
        value: 1
    },
    {
        name: 'Inactive',
        value: 0
    }
];

export const adminstaff = [
    // Corporate
    {
        name: 'corporate-staff',
        value: false,
        module: [
            { name: 'create', value: false },
            { name: 'update', value: false },
            { name: 'delete', value: false },
            { name: 'status', value: false },
            { name: 'permission', value: false }
        ]
    }
];
