// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "nuxt-swiper", "@pinia/nuxt"],
  plugins: ["~/plugins/toast.js"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_mixins.scss" as *;
            @use "~/assets/scss/variables.scss" as *;
            `,
          api: "modern",
        },
      },
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
  },
  icon: {
    customCollections: [
      {
        prefix: "f",
        dir: "./assets/icons",
      },
    ],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    // head: {
    //   link: [
    //     {
    //       rel: "stylesheet",
    //       href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    //     },
    //   ],
    // },
  },
  build: {
    transpile: ["vue-toastification"],
  },
});
