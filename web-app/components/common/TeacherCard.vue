<script setup>
const router = useRouter();

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const fetchSingleTeacher = (item) => {
    let name = item.fullName.toLowerCase();
    name = name.replaceAll(/\s/g, '-');
    router.push(`/teacher/${name}?id=${item.id}`);
};
</script>

<template>
    <div class="p-3 border-round-lg h-full surface-0 border-secondary">
        <div>
            <p class="text-xl font-bold mb-0 capitalize">{{ item.fullName }}</p>
            <div class="surface-overlay white-space-nowrap overflow-hidden text-overflow-ellipsis font-bold text-primary">
                <i class="pi pi-bookmark-fill text-sm text-500" />
                {{ item.subject.name }}
            </div>

            <p class="mb-0">
                Student’s Rating <span class="text-orange-600 font-bold">{{ item.rating }}</span
                >/5
            </p>
        </div>

        <div class="p-3 bg-primary-100 -mx-3 my-3 flex align-items-center gap-2">
            <img :src="item.profilePicture" class="-ml-3 pr-2 -my-3" :alt="item.fullName" width="100" height="104" />
            <div class="w-full">
                <ProgressBar class="text-red-500 progress-bar" :value="item.knowledge"> Knowledge {{ item.knowledge }}% </ProgressBar>
                <ProgressBar class="progress-bar" :value="item.accuracy"> Accuracy {{ item.accuracy }}% </ProgressBar>
                <ProgressBar class="progress-bar mb-0" :value="item.speed"> Speed {{ item.speed }} </ProgressBar>
            </div>
        </div>
        <div>
            <p class="text-sm max-4-line">
                {{ item.aboutUs }}
            </p>

            <div class="flex align-items-center gap-2 flex-wrap justify-content-between">
                <NuxtLink to="/" class="font-bold" @click="fetchSingleTeacher(item)"> View Profile </NuxtLink>
                <a
                    :href="`https://api.whatsapp.com/send/?phone=%2B917258082001&text=Hi. I saw the tutor profiles and I want to have a chat with your tutor '${item.fullName}'.`"
                    target="_blank"
                    aria-label="Whatsapp"
                    class="text-green-500 flex align-items-center font-bold gap-2"
                >
                    <i class="pi pi-whatsapp" />
                    Get Started
                </a>
            </div>
        </div>
    </div>
</template>
