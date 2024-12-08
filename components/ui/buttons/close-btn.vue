<template>
  <div
    @click="closeAllModals"
    class="flex items-center justify-center absolute top-5 right-5 w-7 h-7 hover:text-rose-500 transition-colors cursor-pointer"
  >
    <Icon name="material-symbols-light:close" :size="28" />
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "~/stores/useModalStore";

const { closeAllModals } = useModalStore();
</script>

<style scoped></style>
