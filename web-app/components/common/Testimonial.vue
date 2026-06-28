<script setup>
import { Autoplay, EffectCards } from 'swiper/modules';
import { testimonial } from '~/utility/testimonialList';
import { shuffleArray } from '~/utility/index';
const newList = shuffleArray(testimonial);
</script>

<template>
    <Swiper :effect="'cards'" :grabCursor="true" class="mySwiper" :modules="[Autoplay, EffectCards]" :loop="true">
        <template v-for="(item, idx) in newList" :key="idx">
            <swiper-slide>
                <div class="p-5">
                    <p class="text-xl lg:text-2xl text-white font-bold">
                        <span class="text-2xl lg:text-4xl text-400"> “ </span> {{ item.text }}
                        <span class="text-2xl lg:text-4xl text-400"> ”</span>
                    </p>
                    <p class="text-2xl lg:text-4xl text-white font-bold">{{ item.name }}</p>
                </div>
            </swiper-slide>
        </template>
    </Swiper>
</template>

<style scoped>
.swiper {
    width: 100%;
    height: auto;
}

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    background: var(--primary-gradient);
}
</style>
