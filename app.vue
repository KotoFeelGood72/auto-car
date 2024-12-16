<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@use "./assets/scss/style.scss";
.is_fixed {
  overflow: hidden;
}

:root {
  --full-screen: calc(var(--vh, 1vh) * 100);
}

html {
  height: 100%;
  // scroll-behavior: smooth;
  font: 400 calc(100vw / 1920 * 10) / 1.33 $font_1;
  @include bp(1560px) {
    font: 400 calc(100vw / 1920 * 12) / 1.33 $font_1;
  }

  @include bp($point_2) {
    font-size: 10px;
  }
}

body {
  position: relative;
  display: flex;
  height: 100%;
  // font-size: $font_size_base;
  color: $color_text_base;
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $body_bg;
  overflow-x: hidden;
  color: $txtGray;
  font-size: 1.6rem;

  span {
    font-size: 1.6rem;
  }

  @supports (display: grid) {
    display: block;
  }

  @include bp($point_2) {
    font-size: 1.6rem;
  }
}

a {
  text-decoration: none;
  transition: all 0.3s ease;
  color: $txtGray;

  &:hover,
  &:focus {
    text-decoration: none;
    transition: all 0.3s ease;
  }
}

.section_in {
  max-width: 142rem;
  margin: 0 auto;
  @include bp($point_2) {
    padding: 0 1.5rem;
  }
}

.mb-8 {
  margin-bottom: 8rem;
  @include bp($point_2) {
    margin-bottom: 6rem;
  }
}

img {
  width: 100%;
  height: 100%;
  display: block;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
