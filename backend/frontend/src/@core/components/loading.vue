<script setup>
const props = defineProps({
  height: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :style="`height: ${height}`" class="px-4 md:px-8 jinz-layout">
    <ProgressSpinner />
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.jinz-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
