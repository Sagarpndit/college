<script setup>
import config from "@config";
import { computed } from "vue";
import { useAuth } from "@store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuth();

const baseURL = config.default.apiBaseUrl;

const userProfile = computed(() => authStore.userProfile);
</script>
<template>
  <div class="user-pofile-card" />
  <div class="user-pofile-card-wrapper">
    <div
      class="flex flex-column lg:flex-row lg:align-items-end justify-content-between p-4 gap-4"
    >
      <div class="flex flex-column sm:flex-row sm:align-items-center gap-4">
        <!-- avatar -->
        <div class="user-pofile-card-img">
          <img
            :src="
              userProfile?.profileImage
                ? `${baseURL}/${userProfile.profileImage}`
                : '/avatar/1.jpg'
            "
            alt="Image"
            crossorigin="anonymous"
          />
          <a href="#!" class="user-pofile-card-img-checked">
            <img src="/profile/checked-mark.svg" alt="Image" />
          </a>
        </div>
        <!-- text -->
        <div class="lh-1">
          <h2 class="mb-0">
            {{ userProfile?.fullName }}
          </h2>

          <Tag severity="success">
            {{ "Admin" }}
          </Tag>
        </div>
      </div>
      <div class="flex flex-column sm:flex-row gap-2">
        <Button
          size="large"
          label="My Account"
          outlined
          icon="pi pi-user"
          @click="router.push('/user-profile')"
        />
      </div>
    </div>
  </div>
</template>

<style>
.user-pofile-card {
  padding-top: 8rem !important;
  background: url("/profile/profile-cover.jpg") no-repeat;
  background-size: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.user-pofile-card-wrapper {
  box-shadow: 0 2px 4px rgba(0, 0, 20, 0.08), 0 1px 2px rgba(0, 0, 20, 0.08) !important;
  background: #fff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.user-pofile-card-img {
  height: 7.5rem;
  width: 7.5rem;
  border-radius: 100% !important;
  margin-top: -3.5rem !important;
  position: relative;
}

.user-pofile-card-img-checked {
  position: absolute;
  top: 0;
  right: 0;
}

.user-pofile-card-img > img {
  height: 7.5rem;
  width: 7.5rem;
  border-radius: 100% !important;
  border: 2px solid #fff;
}
</style>
