<template>
  <div @click="closeAllModals" class="close">
    <Icon name="material-symbols-light:close" :size="28" />
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "~/stores/useModalStore";

const { closeAllModals } = useModalStore();
</script>

<style scoped lang="scss">
.close {
  @include flex-center;
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
  z-index: 999;
  &:hover {
    color: rgb(231, 36, 36);
  }
}
</style>
