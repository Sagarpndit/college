<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    },

    priceType: {
        type: String,
        required: true
    }
});
</script>
<template>
    <div class="col-12 sm:col-6 lg:col-3">
        <div class="p-3 flex flex-column border-primary h-full" style="border: 2px solid; border-radius: 10px">
            <h3 class="text-900 text-center text-lg mb-2 font-bold">{{ item.name }}</h3>
            <h3 class="text-900 text-center mt-0 text-lg gradient-bg text-white -mx-3 p-2 font-bold capitalize">
                {{ item.serviceType.replaceAll('-', ' ') }}
            </h3>
            <div class="text-center">
                <span class="text-5xl font-bold mr-2 text-900">{{ priceType === 'USD' ? `$ ${item.price}` : ` ₹ ${item.priceINR}` }}</span>
                <span v-if="item.type == 'plan'" class="text-600">per hours</span>
            </div>

            <a href="https://api.whatsapp.com/send/?phone=%2B917258082001&text=Hi.%20I%20am%20not%20sure%20how%20to%20proceed%20on%20your%20website%20OT.%20Need%20help.%20Please%20assist." target="_blank" aria-label="Whatsapp">
                <div class="bg-green-500 border-round-xl p-3 my-3 flex align-items-center justify-content-center text-white gap-2">
                    <i class="pi pi-whatsapp text-lg" />
                    <p class="font-bold">WhatsApp Now!</p>
                </div>
            </a>

            <div v-html="item.description" />
        </div>
    </div>
</template>
