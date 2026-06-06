<script setup>
import { onBeforeMount } from "vue";
import { useAuth } from "@store/auth";
import { useRouter, useRoute } from "vue-router";
import { composables } from "@composables/index";
import authBanner from "@components/auth/banner.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuth();
const { formLoading } = composables();

const formField = authStore.formField;

const fetchLogin = () => {
  return authStore.login();
};

const fechLoginSuccess = () => {
  router.push("/dashboard");
  authStore.formReset();
};

onBeforeMount(() => {
  authStore.formReset();
});
</script>

<template>
  <main class="h-screen">
    <div class="grid h-full my-0">
      <auth-banner />

      <div class="col-12 lg:col-6 surface-0">
        <div class="flex align-items-center justify-content-center h-full">
          <div class="px-3 w-full sm:w-8">
            <div class="my-4 text-center">
              <img
                src="/brand/logo-light.png"
                height="50"
                class="mb-3 lg:hidden"
              />
              <h1 class="font-bold text-3xl Lg:px-8">Sign In</h1>
            </div>

            <jinzForm :atFetch="fetchLogin" :atFinish="fechLoginSuccess">
              <jinzFiled
                :value="formField.email"
                name="mobile"
                class="mb-4"
                rules="required"
                size="large"
                placeholder="Email"
                label="Enter your Email"
                @atInput="(value) => (formField.email = value)"
              />

              <jinzFiled
                :value="formField.password"
                name="password"
                class="mb-4"
                rules="required|min:6"
                size="large"
                filedType="password"
                label="Password"
                placeholder="Enter your password"
                @atInput="(value) => (formField.password = value)"
              />

              <div class="py-4">
                <Button
                  class="w-full"
                  size="large"
                  type="submit"
                  label="Sign In"
                  :loading="formLoading"
                />
              </div>
            </jinzForm>

            <div class="text-center">
              <router-link to="/recoverPassword" class="font-bold text-900">
                Forgot password?
              </router-link>
            </div>

            <div class="text-center mt-3">
              <span class="text-gray-600">Don't have an account? </span>
              <router-link to="/signup" class="font-bold text-900">
                Sign Up
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
