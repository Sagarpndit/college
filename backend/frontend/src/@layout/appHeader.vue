<script setup>
import appNavigation from './appNavigation.vue';
import profileSetting from './profileSetting.vue';
import appNotification from './appNotification.vue';
</script>
<template>
    <div class="mistry-bhejo-header surface-0 px-4 md:px-8">
        <!-- Left -->
        <div class="flex align-items-center gap-2 sm:gap-3">
            <appNavigation />
            <router-link to="/">
                <img class="hidden lg:block" src="/brand/logo-light.png" width="100" height="38" />
                <img class="lg:hidden" src="/brand/light.png" width="38" height="38" />
            </router-link>
        </div>

        <!-- Right -->
        <div class="flex align-items-center gap-3">
            <appNotification />
            <profileSetting />
        </div>
    </div>
</template>
<style lang="scss">
.mistry-bhejo-header {
    height: 60px;
    position: fixed;
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid var(--jinz-surface-300);
    justify-content: space-between;
    z-index: 999;

    &__menu {
        > li {
            padding: 0 20px;
            height: 60px;
            margin: 0 4px;
            display: flex;
            align-items: center;
            border-bottom: 3px solid transparent;
            cursor: pointer;
            text-align: center;

            &:hover {
                border-color: var(--jinz-surface-900);

                > a {
                    color: var(--jinz-surface-900);
                    font-weight: bold;
                }
            }

            &.active {
                border-color: var(--jinz-surface-900);

                > a {
                    color: var(--jinz-surface-900);
                    font-weight: bold;
                }
            }

            > a {
                font-size: 1rem;
                font-weight: 500;
                color: var(--jinz-surface-700);
            }
        }
    }
}
</style>
