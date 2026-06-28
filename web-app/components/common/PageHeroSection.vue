<script setup>
const props = defineProps({
    label: {
        type: String,
        required: false
    },

    highlight: {
        type: String,
        required: false
    },

    title: {
        type: String,
        required: true
    },

    subtitle: {
        type: String,
        required: true
    },

    getStarted: {
        type: Boolean,
        default: true
    }
});
</script>
<template>
    <section class="PageHeroSection">
        <div class="hero_opacity" />
        <div class="container">
            <div class="py-8 z-2 relative">
                <div class="col-12 lg:col-7">
                    <p v-if="label" class="text-2xl text-yellow-500 line-height-3 font-bold">{{ label }}</p>
                    <p v-if="highlight" class="text-4xl lg:text-6xl font-bold text-white py-2">{{ highlight }}</p>
                    <p class="text-yellow-500 font-bold text-2xl lg:text-4xl pb-2">{{ title }}</p>
                    <p class="text-white text-xl font-bold pb-3">{{ subtitle }}</p>

                    <a
                        v-if="getStarted"
                        href="https://api.whatsapp.com/send/?phone=%2B917258082001&text=Hi.%20I%20am%20not%20sure%20how%20to%20proceed%20on%20your%20website%20OT.%20Need%20help.%20Please%20assist."
                        target="_blank"
                        aria-label="Whatsapp"
                        class="flex"
                    >
                        <div class="bg-green-500 border-round-xl p-3 px-4 flex align-items-center justify-content-center text-white gap-2">
                            <i class="pi pi-whatsapp text-2xl" />
                            <p class="font-bold text-xl">WhatsApp to get started</p>
                        </div>
                    </a>
                    <div v-else>
                        <NuxtLink to="/aurth/login">
                            <Button label="Sign in" class="p-button-rounded outlined p-button-success p-button-lg font-bold mr-2" />
                        </NuxtLink>

                        <NuxtLink to="/aurth/signup">
                            <Button label="Sign up for free" class="p-button-rounded p-button-outlined p-button-success p-button-lg font-bold" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.PageHeroSection {
    height: 100%;
    background: url('/image/background/2.png');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}
</style>
