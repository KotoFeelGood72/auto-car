<template>
  <section class="cars mb-8">
    <div class="section_in">
      <div class="head">
        <heading :title="title" :size="40" class="title" />
        <div class="nav">
          <div :class="'prev-' + id">
            <Icon name="f:left" />
          </div>
          <div :class="'next-' + id">
            <Icon name="f:right" />
          </div>
        </div>
      </div>

      <div>
        <Swiper
          :modules="[Navigation, Pagination]"
          :slides-per-view="4"
          :space-between="20"
          :navigation="{
            prevEl: `.prev-${id}`,
            nextEl: `.next-${id}`,
          }"
          :breakpoints="{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }"
        >
          <SwiperSlide v-for="(item, i) in cars" :key="'models-item-' + i">
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
import heading from "../ui/heading.vue";
import "swiper/swiper-bundle.css";

defineProps<{
  title: string;
  cars: any;
  id: string;
}>();
</script>

<style scoped lang="scss">
.cars {
  @include bp($point_2) {
    overflow-x: hidden;
  }

  .swiper {
    @include bp($point_2) {
      overflow: visible;
    }
  }
}
.head {
  @include flex-start;
  gap: 4rem;
  margin-bottom: 4rem;
}

.nav {
  @include flex-start;
  gap: 2rem;
  div {
    width: 4rem;
    height: 4rem;
    background-color: $primary;
    @include flex-center;
    border-radius: 100%;
    cursor: pointer;
  }
}

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

.swiper-button-disabled {
  background-color: #b4b4b4 !important;
  cursor: not-allowed !important;
}
</style>
