<script setup>
import profile from '@/components/user-profile/profile.vue';
import changePassword from '@/components/user-profile/changePassword.vue';
import changeMobileNumber from '@/components/user-profile/changeMobileNumber.vue';
import corporateDetails from '@/components/user-profile/corporateDetails.vue';
</script>
<template>
    <div class="pages-wrapper">
        <profile />
        <corporateDetails />
        <changeMobileNumber />
        <changePassword />
    </div>
</template>
