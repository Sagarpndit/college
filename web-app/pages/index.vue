<script setup>
import { colleges, states } from "~/constant/colleges.js";
import { exams } from "~/constant/exams.js";
import { articles, FAQS } from "~/constant/articles.js";

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "OWN Teacher",
        url: "https://www.ownteacher.com",
        logo: "https://www.ownteacher.com/image/brand/logo-dark.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91 7258082001",
          contactType: "Customer Service",
          areaServed: "US",
          availableLanguage: "English",
        },
        sameAs: [
          "https://www.facebook.com/ownteacher",
          "https://www.twitter.com/ownteacher",
        ],
      }),
    },
  ],
});

const API_URL = useRuntimeConfig().public.API_URL;

const pageDetails = {
  title: `Expert Online Tutoring & Homework Help | Own Teacher`,
  description:
    "Ownteacher provides the best online tutoring help, and Assignment help to students worldwide.",
  keywords:
    "Online Physics tutoring, Online physics classes for NEET, Online physics classes for JEE, Online physics classes for AP physics, Online physics classes for IB physics",
};

useSeoMeta({
  title: pageDetails.title,
  description: pageDetails.description,
  ogTitle: pageDetails.title,
  ogDescription: pageDetails.description,
  keywords: pageDetails.keywords,
});

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
// const [{ data: teacher }, { data: subject }, { data: trandingClass }] =
//   await Promise.all([
//     useFetch(`${API_URL}unauth/teacher?per_page=9`),
//     useFetch(`${API_URL}unauth/subject`),
//     useFetch(`${API_URL}unauth/trending-classes?per_page=4`),
//   ]);
</script>

<template>
  <HeroSection />

  <!-- FEATURED COLLEGES  -->
  <Section
    eyebrow="Top picks"
    title="Featured Colleges"
    description="Curated by ranking, placements, and student outcomes."
    actionLabel="See all colleges"
    actionTo="/colleges"
  >
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <CollegeCard
        v-for="college in colleges.slice(0, 4)"
        :key="college.slug"
        :college="college"
      />
    </div>
  </Section>

  <!-- TRENDING EXAMS  -->
  <Section
    eyebrow="What's hot"
    title="Trending Entrance Exams"
    description="Dates, syllabus, and preparation strategies."
    actionLabel="All exams"
    actionTo="/exams"
  >
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ExamCard
        v-for="exam in exams.slice(0, 6)"
        :key="exam.slug"
        :exam="exam"
      />
    </div>
  </Section>

  <!-- CATEGORIES -->
  <section class="container-page py-16">
    <Eyebrow eyebrow="Browse by category" />

    <h2 class="mt-2 font-display text-3xl md:text-4xl font-bold text-secondary">
      Pick your path
    </h2>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink
        v-for="category in categories"
        :key="category.label"
        to="/colleges"
        class="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
      >
        <div
          class="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground"
        >
          <i :class="category.icon" class="text-xl"></i>
        </div>

        <p
          class="mt-4 font-display text-lg font-semibold text-secondary group-hover:text-primary transition-colors"
        >
          {{ category.label }}
        </p>

        <p class="mt-1 text-sm text-muted-foreground">
          {{ category.count }}
        </p>

        <p
          class="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium"
        >
          Explore
          <i class="pi pi-arrow-right"></i>
        </p>
      </NuxtLink>
    </div>
  </section>

  <!-- STATE EXPLORER  -->
  <section class="bg-surface border-y border-border py-16">
    <div class="container-page">
      <Eyebrow eyebrow="State-wise explorer" />

      <h2
        class="mt-2 font-display text-3xl md:text-4xl font-bold text-secondary"
      >
        Colleges across India
      </h2>

      <p class="mt-2 text-muted-foreground max-w-2xl">
        Browse top colleges in your state — from metro hubs to emerging tech
        corridors.
      </p>

      <div class="mt-8 flex flex-wrap gap-2">
        <NuxtLink
          v-for="state in states"
          :key="state"
          to="/colleges"
          class="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <i class="pi pi-map-marker text-xs"></i>
          {{ state }}
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Article Card -->
  <Section
    eyebrow="Latest from the blog"
    title="Articles & Guides"
    description="In-depth playbooks, exam strategy, and admission insights."
    action-label="All articles"
    action-to="/blog"
  >
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard
        v-for="article in articles.slice(0, 3)"
        :key="article.slug"
        :article="article"
      />
    </div>
  </Section>

  <!-- FAQ -->
  <section class="container-page py-16 grid lg:grid-cols-[1fr_2fr] gap-10">
    <div>
      <Eyebrow eyebrow="FAQ" />

      <h2
        class="mt-2 font-display text-3xl md:text-4xl font-bold text-secondary"
      >
        Questions students ask us
      </h2>

      <p class="mt-3 text-muted-foreground">
        Can't find what you're looking for?
        <NuxtLink
          to="/contact"
          class="text-primary font-medium hover:underline"
        >
          Get in touch
        </NuxtLink>
        .
      </p>
    </div>

    <Accordion :value="0">
      <AccordionPanel v-for="(faq, index) in FAQS" :key="index" :value="index">
        <AccordionHeader>
          {{ faq.question }}
        </AccordionHeader>

        <AccordionContent>
          <p class="text-muted-foreground">
            {{ faq.answer }}
          </p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </section>
</template>

