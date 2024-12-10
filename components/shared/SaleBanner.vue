<template>
  <div @click="openModal('happy')" class="banner">
    <div class="section_in">
      <div class="row">
        <div class="title">“Счастливые часы”</div>
        <div class="line"></div>
        <div class="txt">
          Приезжайте к открытию салона и получите доп. скидку 199 999 руб
        </div>
        <div class="work">С 8:00 ДО 10:00</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "~/stores/useModalStore";

const { openModal } = useModalStore();
</script>

<style scoped lang="scss">
.banner {
  background: url("~/assets/img/sale-top.jpg");
  background-position: center center;
  background-size: cover;
  padding: 2.5rem 0;
  color: $white;
  cursor: pointer;

  @include bp($point_2) {
    padding: 1rem 0;
  }

  .title {
    font-size: 3rem;
    font-weight: 600;
    @include bp($point_2) {
      font-size: 1.8rem;
    }
  }

  .line {
    width: 7.4rem;
    border-bottom: 0.1rem solid $white;
    @include bp($point_2) {
      display: none;
    }
  }

  .txt {
    max-width: 34rem;
  }

  .work {
    font-size: 2.2rem;
    background-color: $white;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    color: $darkPrimary;
    font-weight: 500;
  }
}
.row {
  @include flex-center;
  gap: 20px;
  flex-wrap: wrap;
  @include bp($point_2) {
    align-items: flex-start;
  }
}
</style>
