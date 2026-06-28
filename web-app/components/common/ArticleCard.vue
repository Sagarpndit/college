<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    :to="`/blog/${article.slug}`"
    class="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg transition-all"
  >
    <div class="aspect-[16/9] overflow-hidden bg-muted">
      <img
        :src="article.featuredImage"
        :alt="article.title"
        loading="lazy"
        class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div class="p-5">
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <span
          class="rounded-full bg-primary-soft px-2 py-0.5 text-primary font-medium capitalize"
        >
          {{ article.category }}
        </span>

        <span class="inline-flex items-center gap-1">
          <i class="pi pi-book text-xs"></i>
          {{ article.readingMinutes }} min read
        </span>
      </div>

      <h3
        class="mt-3 font-display font-semibold text-base text-secondary line-clamp-2 group-hover:text-primary transition-colors"
      >
        {{ article.title }}
      </h3>

      <p class="mt-1.5 text-sm text-muted-foreground line-clamp-2">
        {{ article.excerpt }}
      </p>
    </div>
  </NuxtLink>
</template>