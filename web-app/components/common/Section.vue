<script setup >
defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actionTo: {
    type: String,
    required: true,
  },
  actionLabel: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section class="container-page py-16">
    <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <Eyebrow :eyebrow="eyebrow" />

        <h2
          class="mt-2 font-display text-3xl md:text-4xl font-bold text-secondary"
        >
          {{ title }}
        </h2>

        <p class="mt-2 text-muted-foreground max-w-2xl">
          {{ description }}
        </p>
      </div>

      <NuxtLink
        :to="actionTo"
        class="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-1.5 transition-all"
      >
        {{ actionLabel }}
        <i class="pi pi-arrow-right text-xs"></i>
      </NuxtLink>
    </div>

    <slot />
  </section>
</template>