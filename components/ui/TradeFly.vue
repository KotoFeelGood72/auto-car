<template>
  <div @click="openModal('trade')" class="fly">
    <img src="~/assets/img/trade.png" />
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "#build/imports";

const { openModal } = useModalStore();
</script>

<style scoped lang="scss">
.fly {
  max-width: 20rem;
  @include flex-center;
  position: fixed;
  bottom: 4rem;
  left: 4rem;
  z-index: 99;
}
</style>
