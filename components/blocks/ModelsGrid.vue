<template>
  <section class="models mb-8">
    <div class="section_in">
      <heading title="Марки автомобилей" :size="42" class="title" />
      <div class="grid">
        <ModelsCard
          v-for="(item, i) in models"
          :key="'models-item-' + i"
          :card="item"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ModelsCard from "../card/ModelsCard.vue";
import heading from "../ui/heading.vue";
defineProps<{
  models: any[];
}>();
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 4rem;
}

.grid {
  @include flex-start;
  gap: 2.1rem;
  flex-wrap: wrap;
}
</style>
