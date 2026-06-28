<script setup>
import { ref } from 'vue';

const time = ref(0);
const interval = ref(null);
const running = ref(false);
const openDialog = ref(false);

const formattedTime = computed(() => {
    const totalSeconds = Math.floor(time.value / 1000);
    const s = totalSeconds % 60;
    const m = Math.floor(totalSeconds / 60);
    const h = Math.floor(totalSeconds / 3600);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
});

const buttonLabel = computed(() => {
    if (!running.value && time.value === 0) return 'Start';
    if (running.value) return 'Pause';
    if (!running.value && time.value > 0) return 'Reset';
    return 'Start';
});

function handleButton() {
    if (!running.value && time.value === 0) {
        start();
    } else if (running.value) {
        pause();
    } else if (!running.value && time.value > 0) {
        reset();
    }
}

function start() {
    running.value = true;
    interval.value = setInterval(() => {
        time.value += 1000;
    }, 1000);
}

function pause() {
    running.value = false;
    clearInterval(interval.value);
}

function reset() {
    time.value = 0;
}

onBeforeUnmount(() => {
    clearInterval(interval.value);
});
</script>

<style scoped>
.stopwatch {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
}
</style>
<template>
    <div>
        <Button v-if="!openDialog" icon="pi pi-stopwatch" label="Stop Watch" @click="openDialog = true" />
        <Dialog v-model:visible="openDialog" header="Stop Watch" position="topright" :style="{ width: '25rem' }">
            <div class="stopwatch">
                <span>{{ formattedTime }}</span>

                <Button icon="pi pi-play" v-if="!running" @click="start" class="p-button-rounded p-button-success" />

                <Button icon="pi pi-pause" v-else-if="running" @click="pause" class="p-button-rounded p-button-warning" />

                <Button icon="pi pi-refresh" v-if="!running && time > 0" @click="reset" class="p-button-rounded p-button-danger" />
            </div>
        </Dialog>
    </div>
</template>
