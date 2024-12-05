<template>
  <div
    class="models w-24 h-24 border border-border rounded-[10px] flex items-center justify-beetwen flex-col gap-1 cursor-pointer py-4 transition-all hover:bg-slate-50 hover:border-light"
  >
    <div class="h-10 items-center flex justify-center flex-grow">
      <img :src="`/models/${card.img}.png`" />
    </div>
    <p class="text-sm">{{ card.name }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  card: any;
}>();
</script>

<style scoped lang="scss"></style>
