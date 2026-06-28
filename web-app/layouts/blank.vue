<script setup>
const APP_URL = useRuntimeConfig().public.APP_URL;
const route = useRoute();

useHead(() => ({
    link: [
        {
            rel: 'canonical',
            href: `${APP_URL}${route.fullPath}`
        }
    ]
}));

useSeoMeta({
    ogImage: `${APP_URL}/image/brand/logo.png`,
    twitterCard: 'summary_large_image',
    ogUrl: `${APP_URL}${route.fullPath}`
});
</script>
<template>
    <div class="blank-main h-screen">
        <slot />
    </div>
</template>
<style scoped>
.blank-main {
    padding: 12px;
    overflow-x: hidden;
}
</style>
