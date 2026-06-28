<script setup>
import { useAuthStore } from '~/store/auth';

import { useLayout } from './composables/layout';
const { layoutConfig, onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };

        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};

const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;
    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

// Setting
const profile = useCookie('profile');
const menu = ref();
const items = ref([
    {
        separator: true
    },

    {
        label: 'Profile Settings',
        icon: 'pi pi-user',
        command: () => {
            router.push('/student/profile');
        }
    },
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
            authStore.logUserOut();
            router.push('/aurth/login');
        }
    }
]);

const onSettingsClick = (event) => {
    topbarMenuActive.value = false;
    menu.value.toggle(event);
};
</script>

<template>
    <div class="layout-topbar">
        <NuxtLink to="/student/home" class="layout-topbar-logo">
            <img src="/image/brand/logo-dark.png" class="border-round" alt="logo" />
        </NuxtLink>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <button @click="onSettingsClick" class="p-link layout-topbar-button">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </button>

            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="w-full md:w-15rem">
                <template #start>
                    <div v-ripple class="relative overflow-hidden w-full flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
                        <Avatar :image="profile.profileImage ? profile.profileImage : '/image/avatar/profile.png'" class="mr-2" shape="circle" />
                        <span class="inline-flex flex-column">
                            <span class="font-bold">{{ profile.name }}</span>
                            <span class="text-sm capitalize">{{ profile.userType }}</span>
                        </span>
                    </div>
                </template>
            </Menu>
        </div>
    </div>
</template>
