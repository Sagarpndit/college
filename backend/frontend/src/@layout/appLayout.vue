<script setup>
import appHeader from './appHeader.vue';
import appFooter from './appFooter.vue';
</script>
<template>
    <div>
        <app-header />
        <main class="px-4 md:px-8 mistry-bhejo-layout">
            <router-view></router-view>
        </main>
        <app-footer />
    </div>
</template>
<style>
.mistry-bhejo-layout {
    margin: 60px 0px;
}
</style>
