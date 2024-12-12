<template>
  <div class="card">
    <div class="img">
      <img :src="`/models/${card.img}.png`" class="" />
    </div>
    <p class="title">{{ card.name }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  card: any;
}>();
</script>

<style scoped lang="scss">
.card {
  width: 9.7rem;
  height: 8.7rem;
  border: 0.1rem solid #c8c8c9;
  @include flex-center;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  font-size: 1.4rem;
  @include bp($point_2) {
    width: 23%;
    flex-grow: 1;
  }
}
</style>
