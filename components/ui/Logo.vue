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
}

.logo-img {
  max-width: 26.6rem;
  border-right: 0.1rem solid $border;
  padding-right: 3rem;
}
</style>
