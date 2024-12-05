/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],

  // purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B4DC2",
        secondary: "#FFF9DF",
        txt: "#0E0E13",
        txtGray: "#303035",
        black: "#202020",
        border: "#C8C8C9",
        light: "#B4B4B4",
        red: "#F24942",
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        minlg: "1.125rem", // 20px
        lg: "1.25rem", // 20px
        xl: "1.5rem", // 24px
        xxl: "1.875rem", // 30px
        "2xl": "2.25rem", // 36px
        "3xl": "2.5rem", // 36px
        "4xl": "2.625rem", // 42px
      },
      fontFamily: {
        sans: ["Gilroy", "sans-serif"], // Указываем шрифт Gilroy
        inter: ["Inter", "sans-serif"],
      },
      container: {
        center: true, // Центрирование контейнера по умолчанию
        padding: "1rem", // Внутренние отступы контейнера
        screens: {
          sm: "100%", // 100% на маленьких экранах
          md: "720px", // 720px на средних экранах
          lg: "960px", // 960px на больших экранах
          xl: "1140px", // 1140px на экранах XL
          "2xl": "1320px", // 1320px на экранах 2XL
          "3xl": "1420px", // 1640px на экранах 3XL
        },
      },
      screens: {
        "3xl": "1420px", // Новый брейкпоинт для контейнера с шириной 1640px
      },
    },
  },
  plugins: [],
};
