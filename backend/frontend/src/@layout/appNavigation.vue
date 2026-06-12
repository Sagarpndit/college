<script setup>
import config from "@config";
import { computed, ref } from "vue";
import { useAuth } from "@store/auth";
import { useRouter } from "vue-router";
import { isEqual } from "lodash";

const router = useRouter();
const authStore = useAuth();
const baseURL = config.default.apiBaseUrl;

const visible = ref(false);

const fetchPage = (pageLink) => {
  router.push(pageLink);
  visible.value = false;
};
</script>

<template>
  <Button type="button" text rounded icon="pi pi-cog" @click="visible = true">
    <i class="pi pi-bars text-2xl -mb-1" />
  </Button>

  <Drawer v-model:visible="visible">
    <template #container="{ closeCallback }">
      <div class="flex justify-content-between align-items-center p-3">
        <img src="/brand/logo-light.png" width="120" height="40" />

        <Button
          type="button"
          @click="closeCallback"
          icon="pi pi-times"
          rounded
          outlined
        ></Button>
      </div>
      <Divider class="m-0" />
      <div class="overflow-y-auto">
        <ul class="list-none m-0 pt-3">
          <li class="cursor-pointer">
            <div
              @click="fetchPage('/dashboard')"
              v-ripple
              class="py-3 px-4 flex items-center text-700 hover:bg-primary-50 duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-home mr-2"></i>
              Dashboard
            </div>
          </li>
        </ul>
        <Divider class="my-0" />
        <ul class="list-none m-0 pt-3">
          <li class="py-2 font-bold px-3">Bussiness</li>

          <li class="cursor-pointer">
            <div
              @click="fetchPage('/corporate/college')"
              v-ripple
              class="py-3 px-4 flex items-center text-700 hover:bg-primary-50 duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-users mr-2"></i>
              College
            </div>
          </li>

          <li class="cursor-pointer">
            <div
              @click="fetchPage('/corporate/items')"
              v-ripple
              class="py-3 px-4 flex items-center text-700 hover:bg-primary-50 duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-users mr-2"></i>
              Exams
            </div>
          </li>
        </ul>
        <Divider class="my-0" />
      </div>
      <div class="mt-auto">
        <Divider class="m-0" />

        <router-link
          to="/user-profile"
          v-ripple
          class="flex align-items-center cursor-pointer p-3 gap-2 text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
        >
          <Avatar :image="'/avatar/1.jpg'" shape="circle" />
          <div>
            <p class="mb-0 -mb-1 font-bold text-sm text-900">
              {{ authStore.userProfile?.name }}
            </p>
            <b class="text-xs text-600">
              {{ "Admin" }}
            </b>
          </div>
        </router-link>
      </div>
    </template>
  </Drawer>
</template>
