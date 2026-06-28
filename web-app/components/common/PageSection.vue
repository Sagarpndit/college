<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    }
});
</script>

<template>
    <section class="hero">
        <div class="hero_opacity" />
        <div class="container py-6">
            <div class="z-2 relative text-center text-white">
                <p class="text-4xl lg:text-6xl mb-0 line-height-2 text-white font-bold">{{ title }}</p>
                <p class="text-xl text-white">{{ subtitle }}</p>
                <div>
                    <NuxtLink to="/" class="no-underline text-white text-lg"> Home > </NuxtLink>
                    <span class="ml-2 text-lg">{{ title }} ></span>
                </div>
            </div>
        </div>
    </section>
</template>
