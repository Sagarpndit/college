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

const fetchSingleSubject = (item) => {
    let name = item.name.toLowerCase();
    name = name.replaceAll(/\s/g, '-');
    router.push(`/subject/${name}?id=${item.id}`);
};
</script>
<template>
    <div :class="`h-full ${white ? 'surface-0' : 'surface-ground'} p-3 border-round-xl shadow-2 subject-card`" @click="fetchSingleSubject(item)">
        <img :alt="item.name" :src="item.image" width="60" height="60" class="border-round-lg" />
        <p class="font-bold text-lg mt-3">{{ item.name }}</p>
    </div>
</template>

<style scoped>
.subject-card {
    border: 2px solid;
    border-color: transparent;
}

.subject-card:hover {
    border-color: #1a194d;
    cursor: pointer;
}
</style>
