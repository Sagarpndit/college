<script setup lang="js">
defineProps({
    eyebrow: {
        type: String,
        required: true
    }
});
</script>
<template>
  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
    {{ eyebrow }}
  </p>
</template>