<script setup>
defineProps({
  exam: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    :to="`/exams/${exam.slug}`"
    class="group block rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
  >
    <div class="flex items-center justify-between gap-2">
      <span
        class="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-foreground"
      >
        {{ exam.category }}
      </span>

      <span class="text-xs text-muted-foreground">
        {{ exam.mode }}
      </span>
    </div>

    <h3
      class="mt-3 font-display font-semibold text-lg text-secondary group-hover:text-primary transition-colors"
    >
      {{ exam.name }}
    </h3>

    <p class="mt-1 text-sm text-muted-foreground line-clamp-2">
      {{ exam.excerpt }}
    </p>

    <div
      class="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground"
    >
      <span class="inline-flex items-center gap-1">
        <i class="pi pi-calendar"></i>
        {{ exam.frequency }}
      </span>

      <span
        class="inline-flex items-center gap-1 text-primary font-medium group-hover:gap-1.5 transition-all"
      >
        Read more
        <i class="pi pi-arrow-right"></i>
      </span>
    </div>
  </NuxtLink>
</template>