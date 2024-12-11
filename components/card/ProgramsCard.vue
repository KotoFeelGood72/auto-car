<template>
  <div class="card">
    <div class="col">
      <heading :title="card.title" :level="2" :size="32" class="title" />
      <p class="text">{{ card.txt }}</p>
    </div>
    <btn
      size="normal"
      styles="primary"
      color="blue"
      name="Подробнее"
      @click.prevent="
        openModal('call', {
          title: card?.title,
          name: card?.txt,
        })
      "
    />
  </div>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";
import heading from "../ui/heading.vue";
import { useModalStore } from "~/stores/useModalStore";

const { openModal } = useModalStore();

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

  @include bp($point_2) {
    width: 100%;

    padding: 2rem;
  }
}

.text {
  font-size: 2rem;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @include bp($point_2) {
    gap: 0.5rem;
  }
}
</style>
