export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "nuxt-swiper",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
    "nuxt-yandex-metrika",
  ],
  ssr: false,
  plugins: ["~/plugins/toast.js"],
  target: "static",
  // ssr: false,
  ogImage: { enabled: false },
  // yandexMetrika: {
  //   id: "99219899",
  //   // debug: process.env.NODE_ENV !== "production",
  //   options: {
  //     clickmap: true, // Включить карту кликов
  //     trackLinks: true, // Отслеживать переходы по ссылкам
  //     accurateTrackBounce: true, // Учет отказов
  //     webvisor: true, // Включить Вебвизор
  //     trackHash: true, // Отслеживать изменение хэша
  //   },
  // },

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
  },

  icon: {
    customCollections: [
      {
        prefix: "f",
        dir: "./assets/icons",
      },
    ],
  },
  // @ts-ignore
  axios: {
    proxy: true,
  },
  hooks: {
    "nitro:build:before"() {
      const fs = require("fs");
      const path = require("path");
      const apiPath = path.resolve("./public/api");

      if (fs.existsSync(apiPath)) {
        fs.rmSync(apiPath, { recursive: true, force: true });
        console.log("Folder public/api removed before build");
      }
    },
  },
  nitro: {
    routeRules: {
      "/api/crm": { proxy: "http://crm.renault-s.ru/expo/api/deal/add" },
    },
    // preset: "static",
  },
  app: {
    baseURL: "/",
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Купить новый Автомобиль в Москве | Автокредит",
      // meta: [
      //   {
      //     name: "description",
      //     content: "Продажа автомобилей в автосалонах Москвы по выгодной цене.",
      //   },
      //   { name: "robots", content: "index, follow" },
      //   {
      //     name: "keywords",
      //     content:
      //       "автокар, автосалон, новые автомобили, купить авто, Москва, авто в кредит",
      //   },
      //   { name: "robots", content: "index, follow" },
      //   { name: "author", content: "Автокар" },
      //   {
      //     property: "og:title",
      //     content: "Автокар - Автосалон новых автомобилей в Москве",
      //   },
      //   {
      //     property: "og:description",
      //     content:
      //       "Купить новый автомобиль в автосалоне Автокар в Москве. Большой выбор моделей, выгодные условия и профессиональное обслуживание.",
      //   },
      //   // {
      //   //   property: "og:image",
      //   //   content: "https://autocarmsk.ru/assets/img/geely.jpg",
      //   // },
      //   // { property: "og:url", content: "https://autocarmsk.ru/" },
      //   // { property: "og:type", content: "website" },
      //   // { name: "twitter:card", content: "summary_large_image" },
      //   // {
      //   //   name: "twitter:title",
      //   //   content: "Автокар - Автосалон новых автомобилей в Москве",
      //   // },
      //   // {
      //   //   name: "twitter:description",
      //   //   content:
      //   //     "Купить новый автомобиль в автосалоне Автокар в Москве. Большой выбор моделей, выгодные условия и профессиональное обслуживание.",
      //   // },
      //   // {
      //   //   name: "twitter:image",
      //   //   content: "https://autocarmsk.ru/assets/img/geely.jpg",
      //   // },
      // ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://autocarmsk.ru/" },
      ],
      // script: [
      //   {
      //     type: "application/ld+json",
      //     innerHTML: JSON.stringify({
      //       "@context": "https://schema.org",
      //       "@type": "AutoDealer",
      //       name: "Автокар",
      //       url: "https://autocarmsk.ru/",
      //       logo: "https://autocarmsk.ru/assets/img/logo.png",
      //       address: {
      //         "@type": "PostalAddress",
      //         streetAddress:
      //           "г. Москва, ул. Краснобогатырская, д. 2, стр. 21-22",
      //         addressLocality: "Москва",
      //         postalCode: "101000",
      //         addressCountry: "RU",
      //       },
      //       contactPoint: {
      //         "@type": "ContactPoint",
      //         telephone: "+7-495-123-4567",
      //         contactType: "customer service",
      //         areaServed: "RU",
      //       },
      //       sameAs: [
      //         "https://facebook.com/autocarmsk",
      //         "https://instagram.com/autocarmsk",
      //       ],
      //     }),
      //   },
      // ],
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
