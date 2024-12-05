<template>
  <section class="models">
    <div class="container">
      <!-- Заголовок и кнопки навигации -->
      <div class="flex items-center gap-10 mb-10">
        <h3 class="text-4xl font-semibold">Популярные модели</h3>
        <div class="nav flex items-center gap-5">
          <!-- Кнопка "Назад" -->
          <div
            class="flex items-center justify-center rounded-full prev w-10 h-10 cursor-pointer bg-primary text-white hover:bg-primary-dark transition-all"
          >
            <Icon name="f:left" />
          </div>

          <!-- Кнопка "Вперед" -->
          <div
            class="flex items-center justify-center rounded-full next w-10 h-10 cursor-pointer bg-primary text-white hover:bg-primary-dark transition-all"
          >
            <Icon name="f:right" />
          </div>
        </div>
      </div>

      <div>
        <Swiper
          class="!py-10 !my-[-2.5rem]"
          :modules="[Navigation, Pagination]"
          :slides-per-view="4"
          :space-between="20"
          :navigation="{
            prevEl: '.prev',
            nextEl: '.next',
          }"
          :breakpoints="{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }"
        >
          <SwiperSlide v-for="(item, i) in 12" :key="'models-item-' + i">
            <AutoCard :card="item" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AutoCard from "../card/AutoCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
</script>

<style scoped>
/* Стили для кнопок */
.prev,
.next {
  background-color: #0b4dc2;
  transition: all 0.3s ease;
}

.prev:not(.swiper-button-disabled):hover,
.next:not(.swiper-button-disabled):hover {
  background-color: #0741a7;
}

/* Отключенные кнопки */
.swiper-button-disabled {
  background-color: #b4b4b4;
  cursor: not-allowed;
}
</style>
