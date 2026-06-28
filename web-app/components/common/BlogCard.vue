<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <NuxtLink :to="item.url" class="no-underline text-800">
        <div class="h-full surface-100 p-2 border-round-xl">
            <div class="text-right -mb-5 mr-1 relative z-2">
                <span class="bg-purple-600 px-2 py-1 border-round-lg my-2 text-xs text-white">
                    Post At <b class="text-xs">{{ item.createdAt }}</b> by
                    <b class="text-xs">Admin</b>
                </span>
            </div>
            <img :alt="item.title" class="w-full border-round-xl h-12rem lg:h-14rem" :src="item.image" />

            <div>
                <div class="flex">
                    <div class="bg-primary px-2 my-2 border-round-lg text-sm white-space-nowrap overflow-hidden text-overflow-ellipsis">
                        {{ item.category.toUpperCase() }}
                    </div>
                </div>

                <p class="m-0 p-0 font-bold">{{ item.title }}</p>
                <p class="m-0 p-0 text-sm">
                    {{ item.subtitle }}
                </p>
            </div>

            <Button class="p-button-secondary p-button-sm mt-5" label="Explore" />
        </div>
    </NuxtLink>
</template>
