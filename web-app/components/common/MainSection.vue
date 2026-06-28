<script setup>
const props = defineProps({
    heading: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    to: {
        type: String,
        default: ''
    },
    white: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <section :class="white ? 'surface-0' : 'surface-ground'">
        <div class="container py-6">
            <div class="text-center mb-6">
                <p class="font-bold text-secondary lg:text-xl">{{ label }}</p>
                <p class="text-2xl lg:text-4xl mt-0 line-height-2 font-bold">{{ heading }}</p>
                <NuxtLink v-if="to" :to="to">
                    <Button :label="`Explore all`" />
                </NuxtLink>
            </div>
            <slot />
        </div>
    </section>
</template>
