<script setup>
defineProps({
  college: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    :to="`/colleges/${college.slug}`"
    class="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
  >
    <div class="aspect-[16/10] overflow-hidden bg-muted">
      <img
        :src="college.image"
        :alt="college.name"
        loading="lazy"
        class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div class="p-5">
      <div class="flex items-center justify-between gap-2 text-xs">
        <span
          class="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 font-medium text-primary"
        >
          #{{ college.ranking }} Rank
        </span>

        <span class="inline-flex items-center gap-1 text-muted-foreground">
          <i class="pi pi-star-fill text-yellow-500"></i>
          {{ college.rating }}
        </span>
      </div>

      <h3
        class="mt-3 font-display font-semibold text-base text-secondary line-clamp-2 group-hover:text-primary transition-colors"
      >
        {{ college.name }}
      </h3>

      <p
        class="mt-1.5 inline-flex items-center gap-1 text-sm text-muted-foreground"
      >
        <i class="pi pi-map-marker"></i>
        {{ college.city }}, {{ college.state }}
      </p>

      <div class="mt-3 flex items-center justify-between text-xs">
        <span class="text-muted-foreground">
          {{ college.ownership }}
        </span>

        <span class="font-semibold text-foreground">
          ₹{{ (college.feesMin / 100000).toFixed(1) }}L+
        </span>
      </div>
    </div>
  </NuxtLink>
</template>