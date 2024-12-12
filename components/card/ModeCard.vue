<template>
  <div class="mode">
    <div class="col">
      <heading :title="card.modification" :level="5" :size="24" />
      <heading
        :title="'от ' + formatPrice(card.price) + ' ₽'"
        :level="4"
        :size="20"
      />
    </div>
    <div class="col-txt" v-if="features">
      <ul>
        <li v-for="(item, i) in features" :key="'card-list-item-' + i">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import heading from "../ui/heading.vue";
defineProps<{
  card: any;
  features?: any;
}>();

const formatPrice = (price: number | string): string => {
  return Number(price).toLocaleString("ru-RU");
};
</script>

<style lang="scss" scoped>
.mode {
  background-color: #f3f3f3;
  border-radius: 1rem;
  padding: 3rem 1.6rem;
  @include flex-start;
  gap: 2rem;
  align-items: flex-start;
  @include bp($point_2) {
    flex-direction: column;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @include bp($point_2) {
    gap: 1rem;
  }
}

:deep(.heading-20) {
  margin-bottom: 0 !important;
}

.col-txt {
  max-width: 70%;
  max-height: 25rem;
  overflow-y: auto;
  padding-right: 3rem;
  @include bp($point_2) {
    width: 100%;
    max-width: 100%;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: $txtGray;
    li {
      position: relative;
      display: flex;
      padding-left: 2rem;
      &:before {
        content: "";
        position: absolute;
        top: 0.7rem;
        left: 0;
        width: 0.7rem;
        height: 0.7rem;
        background-color: $border;
        border-radius: 2rem;
      }
    }
  }
}

.col-txt::-webkit-scrollbar {
  width: 0.6rem; /* Ширина скролла */
}

.col-txt::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.116); /* Цвет ползунка */
  border-radius: 0.4rem; /* Закругление */
}

.col-txt::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.2); /* Цвет ползунка при наведении */
}

.col-txt::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.055); /* Цвет трека */
  border-radius: 0.4rem;
}
</style>
