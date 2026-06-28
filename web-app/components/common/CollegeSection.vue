<script setup>
defineProps({
  id: String,
  title: String,
});
</script>

<template>
  <section :id="id" class="scroll-mt-24">
    <h2 class="font-display text-2xl md:text-3xl font-bold text-secondary mb-4">
      {{ title }}
    </h2>

    <slot />
  </section>
</template>