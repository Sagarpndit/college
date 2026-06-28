<script setup>
import { testimonial } from '~/utility/testimonialList';
import { shuffleArray } from '~/utility/index';

const newList = shuffleArray(testimonial);

const props = defineProps({
    reviewFor: {
        type: String,
        required: true
    }
});
</script>

<template>
    <section class="container py-6">
        <div class="text-center">
            <p class="text-2xl lg:text-4xl line-height-2 font-bold">Student’s Reviews : {{ reviewFor }}</p>
        </div>

        <div class="grid mt-5">
            <template v-for="(item, idx) in newList" :key="idx">
                <div v-if="idx < 3" class="col-12 md:col-6 lg:col-4">
                    <div class="border-round-lg shadow-2 surface-0 p-4 h-full">
                        <p class="text-lg font-bold mb-2">
                            {{ item.name }}
                        </p>

                        <p class="mb-0 mb-2">
                            {{ item.text }}
                        </p>
                        <img :src="item.image" :alt="item.name" width="80" height="80" />
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>
