export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "nuxt-swiper",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
  ],
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
    head: {
      title: "Купить новый Автомобиль в Москве | Автокредит",
      meta: [
        {
          name: "description",
          content: "Продажа автомобилей в автосалонах Москвы по выгодной цене.",
        },
        {
          name: "keywords",
          content:
            "автокар, автосалон, новые автомобили, купить авто, Москва, авто в кредит",
        },
        { name: "robots", content: "index, follow" },
        { name: "author", content: "Автокар" },
        {
          property: "og:title",
          content: "Автокар - Автосалон новых автомобилей в Москве",
        },
        {
          property: "og:description",
          content:
            "Купить новый автомобиль в автосалоне Автокар в Москве. Большой выбор моделей, выгодные условия и профессиональное обслуживание.",
        },
        {
          property: "og:image",
          content: "https://autocarmsk.ru/assets/img/geely.jpg",
        },
        { property: "og:url", content: "https://autocarmsk.ru/" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Автокар - Автосалон новых автомобилей в Москве",
        },
        {
          name: "twitter:description",
          content:
            "Купить новый автомобиль в автосалоне Автокар в Москве. Большой выбор моделей, выгодные условия и профессиональное обслуживание.",
        },
        {
          name: "twitter:image",
          content: "https://autocarmsk.ru/assets/img/geely.jpg",
        },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://autocarmsk.ru/" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: "Автокар",
            url: "https://autocarmsk.ru/",
            logo: "https://autocarmsk.ru/assets/img/logo.png",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "г. Москва, ул. Краснобогатырская, д. 2, стр. 21-22",
              addressLocality: "Москва",
              postalCode: "101000",
              addressCountry: "RU",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+7-495-123-4567",
              contactType: "customer service",
              areaServed: "RU",
            },
            sameAs: [
              "https://facebook.com/autocarmsk",
              "https://instagram.com/autocarmsk",
            ],
          }),
        },
      ],
    },
  },
  build: {
    transpile: ["vue-toastification"],
  },
  site: {
    url: "https://autocarmsk.ru/",
    name: "Автокар - Автосалон новых автомобилей",
    description:
      "Купить новый автомобиль в автосалоне Автокар в Москве. Большой выбор моделей, выгодные условия и профессиональное обслуживание.",
  },
});
