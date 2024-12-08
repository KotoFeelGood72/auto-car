<template>
  <div class="rounded-[10px] bg-center bg-cover z-50 w-full py-14">
    <div class="flex items-center gap-10 relative">
      <closeBtn class="mr-4" />
      <Calc />
    </div>
  </div>
</template>

<script setup lang="ts">
import Calc from "../shared/Calc.vue";
import closeBtn from "../ui/buttons/close-btn.vue";
</script>

<style scoped lang="scss"></style>
