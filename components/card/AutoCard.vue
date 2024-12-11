<template>
  <NuxtLink :to="formattedSlug" class="card" v-if="isCardValid">
    <div class="">
      <div class="hot">{{ card.saleBlock }}</div>
      <div class="img">
        <img :src="card.image" :alt="card.title" />
      </div>
      <div class="content">
        <heading :title="card.title" :size="24" class="title" />
        <div class="row">
          <div>
            <p class="price">от {{ card.priceNew }} ₽</p>
            <p class="old">от {{ card.priceOld }} ₽</p>
          </div>
          <div class="credit">В кредит от {{ card.monthlyPayment }} ₽/мес.</div>
        </div>
        <div class="btn-row">
          <btn
            name="Подробнее"
            size="normal"
            styles="secondary"
            color="white"
          />
          <btn
            name="Купить в кредит"
            size="normal"
            styles="primary"
            color="blue"
            @click.prevent="
              openModal('car', {
                img: card.image,
                title: 'Спецпредложение по кредиту',
                name: card.title,
              })
            "
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";
import heading from "../ui/heading.vue";
import { useModalStore } from "~/stores/useModalStore";

const props = defineProps<{
  card: any;
}>();

const { openModal } = useModalStore();
const isCardValid = computed(() => {
  return (
    props.card &&
    Object.keys(props.card).length > 0 && // Проверка, что объект не пуст
    props.card.slug &&
    props.card.image &&
    props.card.title // Убедитесь, что ключевые данные присутствуют
  );
});
const formattedSlug = computed(() =>
  props.card && props.card.slug
    ? props.card.slug
        .replace("/api", "") // Удаляем префикс "/api"
        .replace(".json", "") // Удаляем суффикс ".json"
        .replace(/\/[^/]+-/, "") // Удаляем слово перед дефисом
    : ""
);
</script>

<style scoped lang="scss">
.card {
  border: 0.1rem solid $border;
  @include flex-start;
  flex-direction: column;
  border-radius: 1rem;
  position: relative;
}

.hot {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  background-color: $red;
  padding: 1rem 2rem;
  color: $white;
  border-radius: 1rem;
}

.content {
  padding: 1.5rem;
  .title {
    margin-bottom: 2rem;
    min-height: 6rem;
  }
  .row {
    @include flex-start;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  .credit {
    max-width: 40%;
  }
  .price {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .old {
    color: $light;
    font-size: 1.6rem;
    text-decoration: line-through;
    font-weight: 500;
  }
}

.btn-row {
  gap: 1rem;
  @include flex-space;
  :deep(.btn) {
    flex: 1;
    @include flex-center;
  }
}

.img {
  padding: 4rem 0 2rem 0;
}
</style>
