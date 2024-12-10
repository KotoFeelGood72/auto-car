<template>
  <section class="hero">
    <div class="section_in">
      <div class="row">
        <heading
          title="НОВЫЕ АВТОМОБИЛИ В МОСКВЕ ВЫГОДА ДО 600 000 ₽"
          :size="40"
          class="title"
        />
        <heading
          title="Кредит от 7% + подарки от салона"
          :level="2"
          :size="36"
          color="gradient"
          class="subtitle"
        />
        <btn
          name="Зафиксировать выгоду"
          color="gradient"
          styles="primary"
          size="large"
          class="mb-9"
          @click="openModal('sale')"
        />
        <timer />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useModalStore } from "~/stores/useModalStore";
import Btn from "../ui/btn.vue";
import heading from "../ui/heading.vue";
import timer from "../ui/timer.vue";

const { openModal } = useModalStore();
</script>

<style scoped lang="scss">
.hero {
  background-image: url("~/assets/img/hero.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  color: $white;
}

.row {
  padding: 6rem 0 11.2rem 0;
  max-width: 67.5rem;
}

.title {
  margin-bottom: 1.2rem;
}
.subtitle {
  margin-bottom: 2rem;
  max-width: 50rem;
}
</style>
