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

export const collegeType = [
    {
        name: 'Government',
        value: 'government'
    },
    {
        name: 'Private',
        value: 'private'
    },
    {
        name: 'Deemed to be',
        value: 'deemedtobe'
    }
]

export const States = [
    { name: 'Andhra Pradesh', value: 'AP' },
    { name: 'Arunachal Pradesh', value: 'AR' },
    { name: 'Assam', value: 'AS' },
    { name: 'Bihar', value: 'BR' },
    { name: 'Chhattisgarh', value: 'CG' },
    { name: 'Goa', value: 'GA' },
    { name: 'Gujarat', value: 'GJ' },
    { name: 'Haryana', value: 'HR' },
    { name: 'Himachal Pradesh', value: 'HP' },
    { name: 'Jharkhand', value: 'JH' },
    { name: 'Karnataka', value: 'KA' },
    { name: 'Kerala', value: 'KL' },
    { name: 'Madhya Pradesh', value: 'MP' },
    { name: 'Maharashtra', value: 'MH' },
    { name: 'Manipur', value: 'MN' },
    { name: 'Meghalaya', value: 'ML' },
    { name: 'Mizoram', value: 'MZ' },
    { name: 'Nagaland', value: 'NL' },
    { name: 'Odisha', value: 'OD' },
    { name: 'Punjab', value: 'PB' },
    { name: 'Rajasthan', value: 'RJ' },
    { name: 'Sikkim', value: 'SK' },
    { name: 'Tamil Nadu', value: 'TN' },
    { name: 'Telangana', value: 'TS' },
    { name: 'Tripura', value: 'TR' },
    { name: 'Uttar Pradesh', value: 'UP' },
    { name: 'Uttarakhand', value: 'UK' },
    { name: 'West Bengal', value: 'WB' },

    // Union Territories
    { name: 'Andaman and Nicobar Islands', value: 'AN' },
    { name: 'Chandigarh', value: 'CH' },
    { name: 'Dadra and Nagar Haveli and Daman and Diu', value: 'DN' },
    { name: 'Delhi', value: 'DL' },
    { name: 'Jammu and Kashmir', value: 'JK' },
    { name: 'Ladakh', value: 'LA' },
    { name: 'Lakshadweep', value: 'LD' },
    { name: 'Puducherry', value: 'PY' }
];

export const templateTypes = [
    {
        name: 'Text',
        value: 'text'
    },
    {
        name: 'Image',
        value: 'image'
    },
    {
        name: 'Embed',
        value: 'embed'
    },
    {
        name: 'Link',
        value: 'link'
    },
    {
        name: 'Video',
        value: 'video'
    }
];