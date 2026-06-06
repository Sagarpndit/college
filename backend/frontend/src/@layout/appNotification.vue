<script setup>
import moment from 'moment';
import { ref, onMounted } from 'vue';
import { useAuth } from '@store/auth';

const authStore = useAuth();

const notification = ref();
const notificationList = ref([]);
const notificationCount = ref(0);

const showNotification = (event) => {
    notification.value.toggle(event);
};

const fetchData = async () => {
    notificationList.value = [];
    notificationCount.value = 0;
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <OverlayBadge :value="notificationCount" size="small" severity="danger" class="-mb-3 mr-3 cursor-pointer" @click="showNotification">
        <i class="pi pi-bell text-2xl" />
    </OverlayBadge>

    <Popover ref="notification">
        <div class="p-0 m-0 max-w-22rem">
            <h4 class="text-lg p-3 mb-0">Notification</h4>
            <Divider class="my-0" />
            <div class="h-full overflow-y-auto max-h-20rem overflow-x-hidden">
                <template v-for="item in notificationList" :key="item._id">
                    <div class="flex gap-3 align-items-center p-3">
                        <Avatar icon="pi pi-send" shape="circle" :class="`bg-${item.success ? 'green' : 'red'}-500 text-white`" style="min-height: 40px; min-width: 40px" />
                        <div>
                            <p class="text-600 font-medium text-sm mb-0 max-w-17rem white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                {{ item.description }}
                            </p>
                            <p class="text-xs">{{ moment(item.createdAt).fromNow() }}</p>
                        </div>
                    </div>
                    <Divider class="my-0" />
                </template>
            </div>
        </div>
    </Popover>
</template>
