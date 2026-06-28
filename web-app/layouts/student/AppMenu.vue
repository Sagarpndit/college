<script setup>
import AppMenuItem from './AppMenuItem.vue';
const model = ref([
    {
        label: 'Test Practice',
        items: [
            { label: 'Home', icon: 'pi pi-fw pi-home', to: '/student/home' },
            { label: 'Question Practice', icon: 'pi pi-fw pi-list', to: '/student/question-practice' }
        ]
    },

    {
        label: 'Own Teacher',
        items: [
            { label: 'Get Tutored', icon: 'pi pi-fw pi-book', url: '/teacher' },
            { label: 'Download', icon: 'pi pi-fw pi-download', url: 'https://drive.google.com/drive/folders/1uvX3t6sb-vVv9TPtvq0WykiKE95FcP8H', target: '_blank' },
            { label: 'Donate Us', icon: 'pi pi-fw pi-dollar', url: '/donate-us', target: '_blank' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
    <div class="gradient-bg p-5 border-round-lg text-center text-white mt-3">
        <h4 class="text-white font-bold text-xl">Need Help? Just WhatsApp</h4>

        <a href="https://api.whatsapp.com/send/?phone=%2B917258082001&text=Hi.%20I%20am%20not%20sure%20how%20to%20proceed%20on%20your%20website%20OT.%20Need%20help.%20Please%20assist." target="_blank" aria-label="Whatsapp">
            <div class="bg-green-500 border-round-sm p-2 px-3 flex align-items-center justify-content-center text-white gap-2">
                <i class="pi pi-whatsapp" />
                <p class="font-medium">Whatsapp Us</p>
            </div>
        </a>
    </div>
</template>
