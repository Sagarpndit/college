<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <main class="jinz-error">
        <div class="p-4 text-center">
            <img class="px-6 jinz-error__image" src="/error/500.png" />
            <div>
                <h3 class="text-2xl font-bold">Access Denied</h3>
                <p class="text-700 mb-6">
                    You do not have the necessary permisions. Please contact
                    <b>Vyapaar</b>.
                </p>

                <Button @click="router.push('/')" label="Take me back to Home" />
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
.jinz-error {
    &__image {
        max-width: 420px;
        width: 100%;
        height: auto;
    }
}
</style>
