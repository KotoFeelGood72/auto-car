<template>
  <div class="card">
    <div class="col">
      <heading :title="card.title" :level="2" :size="32" class="title" />
      <p class="text">{{ card.txt }}</p>
    </div>
    <btn size="normal" styles="primary" color="blue" name="Подробнее" />
  </div>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";
import heading from "../ui/heading.vue";

defineProps<{
  card: any;
}>();
</script>

<style scoped lang="scss">
.card {
  @include flex-space;
  border: 0.1rem solid $border;
  padding: 3.1rem 4rem;
  border-radius: 1rem;
}

.text {
  font-size: 2rem;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
