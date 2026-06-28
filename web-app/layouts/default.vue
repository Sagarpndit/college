<script setup>
const APP_URL = useRuntimeConfig().public.APP_URL;
const route = useRoute();
const currentYear = new Date().getFullYear();

useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: `${APP_URL}${route.fullPath}`,
    },
  ],
}));

useSeoMeta({
  ogImage: `${APP_URL}/image/brand/logo.png`,
  twitterCard: "summary_large_image",
  ogUrl: `${APP_URL}${route.fullPath}`,
});
const searchOpen = ref(false);
const open = ref(false);

const navMenu = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Colleges",
    to: "/colleges",
  },
  {
    name: "Exams",
    to: "/exams",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Contact",
    to: "/contact",
  },
];

const importantLink = [
  {
    name: "Terms & Condition",
    to: "/terms-of-service",
  },
  {
    name: "Refund Policy",
    to: "/refund-policy",
  },
  {
    name: "Contact Us",
    to: "/contact-us",
  },

  {
    name: "Blogs",
    to: "/blog?perPage=10&currentPage=0",
  },

  {
    name: "Donate Us",
    to: "/donate-us",
  },
];

const isActive = (path) => {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
};
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur"
  >
    <div class="container-page flex h-16 items-center justify-between">
      <!-- LEFT -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 font-display font-bold text-lg text-secondary"
      >
        <span
          class="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground"
        >
          <i class="pi pi-graduation-cap"></i>
        </span>
        Admission Hub
      </NuxtLink>

      <!-- CENTER -->
      <nav class="hidden md:flex items-center gap-1" aria-label="Main">
        <NuxtLink
          v-for="l in navMenu"
          :key="l.to"
          :to="l.to"
          class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          :class="
            isActive(l.to) ? 'text-primary bg-primary-soft font-semibold' : ''
          "
        >
          {{ l.name }}
        </NuxtLink>
      </nav>

      <!-- RIGHT -->
      <div class="flex items-center gap-2">
        <InputText placeholder="Search..." class="w-40 md:w-52" />

        <Button
          icon="pi pi-bars"
          class="md:hidden p-button-outlined"
          @click="mobileMenuOpen = !mobileMenuOpen"
        />
      </div>
    </div>
  </header>
  <div>
    <slot />
  </div>
  <footer
    class="mt-24 border-t border-border bg-secondary text-secondary-foreground"
  >
    <div class="container-page py-14 grid gap-10 md:grid-cols-4">
      <div>
        <div class="flex items-center gap-2 font-display font-bold text-lg">
          <span
            class="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground"
          >
            <i class="pi pi-graduation-cap text-sm" />
          </span>

          Admission Hub
        </div>

        <p class="mt-4 text-sm text-secondary-foreground/70 max-w-xs">
          Trusted guidance for India's colleges, entrance exams, and admissions.
        </p>
      </div>

      <FooterCol
        title="Explore"
        :links="[
          { label: 'All Colleges', to: '/colleges' },
          { label: 'All Exams', to: '/exams' },
          { label: 'Latest Articles', to: '/blog' },
        ]"
      />

      <FooterCol
        title="Popular Exams"
        :links="[
          { label: 'JEE Main 2027', to: '/exams/jee-main-2027' },
          { label: 'NEET UG 2027', to: '/exams/neet-ug-2027' },
          { label: 'CAT 2026', to: '/exams/cat-2026' },
          { label: 'CLAT 2027', to: '/exams/clat-2027' },
        ]"
      />

      <FooterCol
        title="Company"
        :links="[
          { label: 'About Us', to: '/about' },
          { label: 'Contact', to: '/contact' },
          { label: 'Sitemap', to: '/sitemap.xml' },
        ]"
      />
    </div>

    <div class="border-t border-white/10">
      <div
        class="container-page py-5 text-xs text-secondary-foreground/60 flex flex-wrap items-center justify-between gap-2"
      >
        <p>© {{ currentYear }} Admission Hub. All rights reserved.</p>
        <p>Built for students, by students.</p>
      </div>
    </div>
  </footer>
</template>