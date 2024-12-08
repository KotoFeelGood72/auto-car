<template>
  <div class="layout">
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
      <div
        class="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-[100]"
        v-if="isModalActive"
        @click="closeAllModals"
      ></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import TradeFly from "~/components/ui/TradeFly.vue";
import Map from "~/components/shared/Map.vue";
import { useModalStore, useModalStoreRefs } from "~/stores/useModalStore";
import { useRoute } from "vue-router";
import modal from "~/components/modals/modal.vue";
import SaleBanner from "~/components/shared/SaleBanner.vue";

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
}
</style>
