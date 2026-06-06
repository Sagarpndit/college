<script setup></script>
<template>
    <router-view />
    <Toast />
    <ConfirmDialog group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                    <i class="pi pi-exclamation-circle text-5xl"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-4"> {{ message.header }}</span>
                <p class="mb-0">{{ message.message }}</p>
                <div class="flex align-items-center gap-2 mt-4">
                    <Button label="Yes" @click="acceptCallback" />
                    <Button label="No" severity="warning" outlined @click="rejectCallback" />
                </div>
            </div>
        </template>
    </ConfirmDialog>
</template>
