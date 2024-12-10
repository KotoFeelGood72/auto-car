<template>
  <NuxtLink to="/car/1" class="card">
    <div class="">
      <div class="hot">Выгода 390 000 ₽</div>
      <div class="img">
        <img src="~/assets/img/jetta.png" alt="Jetta VS7" />
      </div>
      <div class="content">
        <heading title="Jetta VS7" :size="24" class="title" />
        <div class="row">
          <div>
            <p class="price">от 1 759 000 ₽</p>
            <p class="old">от 2 149 000 ₽</p>
          </div>
          <div class="credit">В кредит от 13 351 ₽/мес.</div>
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
                img: '/assets/img/cars/beige.png',
                title: 'Спецпредложение по кредиту',
                name: 'Jetta VS7',
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

const { openModal } = useModalStore();
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
