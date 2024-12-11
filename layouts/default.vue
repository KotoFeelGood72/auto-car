<template>
  <div class="layout" :class="[{ 'id-page': isIdRoutePage }]">
    <SaleBanner />
    <SharedHeader />
    <slot />
    <Map />
    <SharedFooter />
    <!-- Условие для отображения TradeFly -->
    <transition name="fade">
      <TradeFly v-if="isTradeFlyVisible && route.name === 'index'" />
    </transition>
    <modal />
    <transition name="fade-bg">
      <div class="bg" v-if="isModalActive" @click="closeAllModals"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import TradeFly from "../components/ui/TradeFly.vue";
import Map from "../components/shared/Map.vue";
import { useModalStoreRefs, useModalStore } from "../stores/useModalStore";
import { useRoute } from "vue-router";
import modal from "../components/modals/modal.vue";
import SaleBanner from "../components/shared/SaleBanner.vue";

const { closeAllModals } = useModalStore();
const { modals } = useModalStoreRefs();
const route = useRoute();

// Видимость TradeFly
const isTradeFlyVisible = ref(false);

// Логика определения видимости TradeFly при прокрутке
const handleScroll = () => {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Настройте порог, начиная с которого TradeFly становится видимым
  const threshold = 500; // Например, после 500px прокрутки

  isTradeFlyVisible.value = scrollPosition > threshold;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const isModalActive = computed(() => {
  return Object.values(modals.value).some((isActive) => isActive);
});

watch(
  () => route.path,
  () => {
    closeAllModals();
  }
);

watch(isModalActive, (newValue) => {
  if (newValue) {
    document.body.classList.add("is_fixed");
  } else {
    document.body.classList.remove("is_fixed");
  }
});

const isIdRoutePage = computed(() => route.name === "cars-brand-model");
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.layout {
  background-color: #f2f2f2;

  &.id-page {
    background-color: $white;
  }
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $txtGray;
  opacity: 0.7;
  z-index: 99;
}
</style>
