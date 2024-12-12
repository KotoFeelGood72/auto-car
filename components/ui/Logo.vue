<template>
  <NuxtLink to="/">
    <div class="logo">
      <div class="logo-img">
        <img src="~/assets/img/logo.svg" alt="Автокар" />
      </div>
      <div class="logo-txt">
        <span>Автосалон</span>
        <heading title="Москва" :level="2" :size="36" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import heading from "./heading.vue";
</script>

<style scoped lang="scss">
.logo {
  @include flex-start;
  gap: 4.1rem;

  @include bp($point_2) {
    gap: 2rem;
  }
}

.logo-img {
  max-width: 26.6rem;
  border-right: 0.1rem solid $border;
  padding-right: 3rem;
  img {
    width: 100%;
  }
  @include bp($point_2) {
    max-width: 10rem;
    padding-right: 0;
    border: none;
  }
}

.logo-txt {
  @include bp($point_2) {
    display: none;
  }
}

.logo-burger {
  gap: 2rem !important;
  .logo-txt {
    display: block;
  }
  .logo-img {
    max-width: 16rem;
  }
}
</style>
