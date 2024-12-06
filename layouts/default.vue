<template>
  <div class="layout">
    <SharedHeader />
    <slot />
    <Map />
    <SharedFooter />
  </div>
</template>

<script setup lang="ts">
import Map from "~/components/shared/Map.vue";
</script>

<style scoped lang="scss"></style>
