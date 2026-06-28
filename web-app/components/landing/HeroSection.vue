<script setup>
const q = ref("");

const categories = [
  {
    label: "Engineering",
    count: "600+ Colleges",
    icon: "pi pi-building",
  },
  {
    label: "Medical",
    count: "300+ Colleges",
    icon: "pi pi-heart",
  },
  {
    label: "Exams",
    count: "120+ Exams",
    icon: "pi pi-file",
  },
  {
    label: "Resources",
    count: "500+ Articles",
    icon: "pi pi-book",
  },
];
</script>
<template>
  <section
    class="relative overflow-hidden bg-gradient-to-br from-primary-soft via-background to-accent/10"
  >
    <div
      class="container-page py-16 md:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center"
    >
      <!-- Left Content -->
      <div>
        <span
          class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-xs font-medium text-primary"
        >
          <i class="pi pi-star-fill text-xs"></i>
          Updated for 2026–27 admissions
        </span>

        <h1
          class="mt-5 font-display text-4xl md:text-6xl font-bold tracking-tight text-secondary"
        >
          Find your <span class="text-primary">college</span>.<br />
          Crack your <span class="text-primary">exam</span>.
        </h1>

        <p class="mt-5 text-lg text-muted-foreground max-w-xl">
          The clearest, most current guide to colleges, entrance exams, and
          admissions across India — trusted by lakhs of students.
        </p>

        <!-- Search -->
        <form
          @submit.prevent
          class="mt-7 flex flex-col sm:flex-row gap-2 max-w-xl"
          role="search"
        >
          <IconField class="flex-1 relative">
            <InputIcon class="pi pi-search" />
            <InputText
              v-model="q"
              placeholder="Search colleges, exams, or articles…"
              class="w-full rounded-xl border border-border bg-card pl-12 pr-4 py-3.5 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label="Search"
            />
          </IconField>

          <NuxtLink
            to="/colleges"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-sm"
          >
            Explore
            <i class="pi pi-arrow-right"></i>
          </NuxtLink>
        </form>

        <!-- Stats -->
        <div
          class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground w-full"
        >
          <div>
            <span class="font-display text-2xl font-bold text-secondary"
              >1,500+</span
            >{{ " " }}
            <span class="text-muted-foreground">Colleges</span>
          </div>

          <div>
            <span class="font-display text-2xl font-bold text-secondary"
              >120+</span
            >{{ " " }}
            <span class="text-muted-foreground">Entrance Exams</span>
          </div>

          <div>
            <span class="font-display text-2xl font-bold text-secondary"
              >2M+</span
            >{{ " " }}
            <span class="text-muted-foreground">Students helped</span>
          </div>
        </div>
      </div>

      <!-- Right Cards -->
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="category in categories"
          :key="category.label"
          class="rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <div
            class="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"
          >
            <i :class="category.icon" />
          </div>

          <p class="mt-4 font-display font-semibold text-secondary">
            {{ category.label }}
          </p>

          <p class="text-sm text-muted-foreground">
            {{ category.count }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

