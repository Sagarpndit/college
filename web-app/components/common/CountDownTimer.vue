<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';

const inputMinutes = ref(0);
const inputSeconds = ref(0);
const time = ref(0);
const running = ref(false);
const interval = ref(null);
const openDialog = ref(false);
const inputDialog = ref(false);

const formattedTime = computed(() => {
    const totalSeconds = Math.floor(time.value);
    const s = totalSeconds % 60;
    const m = Math.floor(totalSeconds / 60) % 60;
    const h = Math.floor(totalSeconds / 3600);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
});

function start() {
    if (time.value <= 0) {
        time.value = inputMinutes.value * 60 + inputSeconds.value;
    }

    if (time.value > 0) {
        running.value = true;
        interval.value = setInterval(() => {
            if (time.value > 0) {
                time.value--;
            } else {
                clearInterval(interval.value);
                running.value = false;
                alert('Time is up!');
            }
        }, 1000);
    }
}

function pause() {
    running.value = false;
    clearInterval(interval.value);
}

function reset() {
    pause();
    time.value = 0;
    inputMinutes.value = 0;
    inputSeconds.value = 0;
}

onBeforeUnmount(() => {
    clearInterval(interval.value);
});
</script>

<template>
    <div>
        <Button v-if="!inputDialog && !openDialog" icon="pi pi-hourglass" label="Count Down" @click="inputDialog = true" />
        <Dialog v-model:visible="inputDialog" header="Set Timer (MM:SS)" pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm">
            <div class="timer">
                <div class="inputs" v-if="!running && time === 0">
                    <input type="number" v-model.number="inputMinutes" min="0" placeholder="Minutes" />
                    <input type="number" v-model.number="inputSeconds" min="0" placeholder="Seconds" />
                </div>
                <Button
                    icon="pi pi-check"
                    v-if="!running && time === 0"
                    @click="
                        () => {
                            start();
                            openDialog = true;
                            inputDialog = false;
                        }
                    "
                    class="p-button-rounded p-button-success"
                />
            </div>
        </Dialog>
        <Dialog v-model:visible="openDialog" header="TIMER" position="topright" :style="{ width: '25rem' }" @hide="reset">
            <div class="display">
                <span>{{ formattedTime }}</span>

                <Button icon="pi pi-play" v-if="!running" @click="start" class="p-button-rounded p-button-success" />

                <Button icon="pi pi-pause" v-else-if="running" @click="pause" class="p-button-rounded p-button-warning" />

                <Button icon="pi pi-refresh" v-if="!running && time > 0" @click="reset" class="p-button-rounded p-button-danger" />
            </div>
        </Dialog>
    </div>
</template>

<style scoped>
.timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.inputs input {
    width: 80px;
    padding: 0.5rem;
    margin: 0 0.5rem;
    font-size: 1rem;
    text-align: center;
}

.display {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
}

.buttons {
    display: flex;
    gap: 1rem;
}
</style>
