<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.is_fixed {
  overflow: hidden;
}

:root {
  --full-screen: calc(var(--vh, 1vh) * 100);
}

html {
  height: 100%;
  font: 400 calc(100vw / 1920 * 10) / 1.33 $font_1;
  @include bp(1560px) {
    font: 400 calc(100vw / 1920 * 12) / 1.33 $font_1;
  }

  @include bp($point_2) {
    font-size: 10px;
  }
  // &::-webkit-scrollbar-track {
  //   background-color: $lbrown;
  // }

  // &::-webkit-scrollbar {
  //   width: 0.6rem;
  //   background-color: $lbrown;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background-color: $brown;
  // }
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
}
</style>
