<template>
  <div
    class="card border border-border rounded-[10px] px-10 py-6 w-full flex items-center justify-between"
  >
    <div>
      <h3 class="text-xxxl font-medium mb-3">{{ card.title }}</h3>
      <p class="text-txtGray">{{ card.txt }}</p>
    </div>
    <btn size="normal" theme="primary" name="Подробнее" />
  </div>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";

defineProps<{
  card: any;
}>();
</script>

<style scoped lang="scss"></style>
