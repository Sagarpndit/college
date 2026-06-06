<script setup>
import config from "@config";
import { computed, ref } from "vue";
import { useAuth } from "@store/auth";
import { useRouter } from "vue-router";
import { eraseCookie } from "@utils/cookie";
import { authTokenName } from "@config/constants";

const router = useRouter();
const authStore = useAuth();
const baseURL = config.default.apiBaseUrl;

const profileMenu = ref(false);
const profileMenuList = ref([
  {
    label: "My Account",
    icon: "pi pi-user",
    command: () => {
      router.push("/user-profile");
    },
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => {
      eraseCookie(authTokenName);
      router.push("/login");
    },
  },
]);

const toggleProfileMenu = (event) => {
  profileMenu.value.toggle(event);
};
</script>
<template>
  <div
    @click="toggleProfileMenu"
    class="flex align-items-center cursor-pointer"
  >
    {{ console.log(authStore.userProfile) }}

    <!-- <Avatar :image="authStore.userProfile.profileImage ? `${baseURL}/${authStore.userProfile.profileImage}` : '/avatar/1.jpg'" shape="circle" /> -->
    <div class="mx-1 hidden sm:block">
      <p
        class="mb-0 white-space-nowrap overflow-hidden text-overflow-ellipsis -mb-1 font-bold text-sm text-900"
        style="width: 75px"
      >
        {{ authStore.userProfile }}
      </p>
      <b class="text-xs text-600">
        {{ "Admin" }}
      </b>
    </div>

    <i class="hidden sm:block pi pi-angle-down" />
  </div>
  <Menu
    ref="profileMenu"
    id="overlay_menu"
    :model="profileMenuList"
    :popup="true"
  />
</template>
