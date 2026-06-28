<script setup>
defineProps({
  icon: String,
  label: String,
  value: String,
});
</script>

<template>
  <div class="rounded-xl border border-border bg-card p-4">
    <i :class="icon" class="text-primary text-lg"></i>

    <p class="mt-2 text-xs text-muted-foreground">
      {{ label }}
    </p>

    <p class="font-display font-semibold text-secondary">
      {{ value }}
    </p>
  </div>
</template>