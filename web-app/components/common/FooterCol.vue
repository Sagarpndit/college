<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  links: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div>
    <h2 class="text-sm font-semibold text-secondary-foreground">
      {{ title }}
    </h2>

    <ul class="mt-4 space-y-2 text-sm">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

