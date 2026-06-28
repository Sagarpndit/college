// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

const appConfig = {
  lang: "en",
  appName: "Expert Online Tutoring & Homework Help | Own Teacher",
  appDescription: "",
  themeColor: "#290342",
  appUrl: "http://localhost:3000",
  // appUrl: "https://www.ownteacher.com",
  apiUrl: "http://localhost:3003/api/",
  // apiUrl: "https://panel.ownteacher.com/api/",
};

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["primeicons/primeicons.css", "~/assets/css/main.css"],

  app: {
    head: {
      title: appConfig.appName,
      htmlAttrs: {
        lang: appConfig.lang,
      },
    },
  },

  modules: [
    "@primevue/nuxt-module",
    "@funken-studio/sitemap-nuxt-3",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    "nuxt-swiper",
  ],

  components: {
    dirs: [
      {
        extensions: ["vue"],
        global: true,
        path: "~/components",
        pathPrefix: false,
      },
    ],
  },

  pwa: {
    /* PWA options */
    manifest: {
      name: appConfig.appName,
      short_name: appConfig.appName,
      description: appConfig.appDescription,
      theme_color: appConfig.themeColor,
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: [
        "**/*.{js,css,html,png,jpg,jpeg,webp,svg,woff2,woff,ttf,eot,webmanifest}",
      ],
    },
    client: {
      installPrompt: true,
    },
    registerWebManifestInRouteRules: true,
    devOptions: {
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/],
    },
    registerType: "autoUpdate",
  },
});
