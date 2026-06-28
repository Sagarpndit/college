<script setup>
const router = useRouter();

const props = defineProps({
    item: {
        type: Object,
        required: true
    },

    white: {
        type: Boolean,
        default: true
    }
});

const fetchSingleTrendingClass = (item) => {
    let name = item.name.toLowerCase();
    name = name.replaceAll(/\s/g, '-');
    router.push(`/services/trending-classes/${name}?id=${item.id}`);
};
</script>

<template>
    <div :class="`h-full ${white ? 'surface-0' : 'surface-ground'} p-2 border-round-xl border-secondary cursor-pointer`" @click="fetchSingleTrendingClass(item)">
        <img :alt="item.name" :src="item.icon" class="w-full border-round-xl" height="auto" />
        <div class="p-1">
            <p class="text-lg font-bold mb-1">
                {{ item.name }}
            </p>
            <p class="mt-0 text-sm max-4-line mb-1">
                {{ item.description }}
            </p>
            <hr />
            <div>
                <p class="text-sm font-medium mb-0">Old batch end date</p>
                <p class="text-red-600 font-bold">{{ item.oldBatchEndDate }}</p>
            </div>

            <div>
                <p class="text-sm font-medium mb-0">New batch start date</p>
                <p class="text-green-600 font-bold">{{ item.newBatchDate }}</p>
            </div>

            <hr />

            <p class="font-medium">
                Price at
                <span class="font-bold bg-primary border-round px-1"> ${{ item.price }} </span>
                only.
            </p>

            <a href="https://api.whatsapp.com/send/?phone=%2B917258082001&text=Hi.%20I%20am%20not%20sure%20how%20to%20proceed%20on%20your%20website%20OT.%20Need%20help.%20Please%20assist." target="_blank" aria-label="Whatsapp">
                <div class="bg-green-500 border-round-sm p-2 px-3 flex align-items-center justify-content-center text-white gap-2">
                    <i class="pi pi-whatsapp" />
                    <p class="font-medium">Whatsapp Now</p>
                </div>
            </a>
        </div>
    </div>
</template>
