<template>
  <div class="modal">
    <transition :name="modalTransitionName">
      <component v-if="activeModalComponent" :is="activeModalComponent" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useModalStoreRefs } from "~/stores/useModalStore";
import ModalSale from "./ModalSale.vue";
import ModalCredit from "./ModalCredit.vue";
import ModalHappy from "./ModalHappy.vue";
import ModalTradein from "./ModalTradein.vue";
import ClassicModal from "./ClassicModal.vue";
import ModalCar from "./ModalCar.vue";

const { modals } = useModalStoreRefs();
type ModalKey = keyof typeof modals.value;

const ModalUp = ref<any>(["sale", "call", "trade", "happy"]);

const activeModalName = computed(() => {
  for (const name in modals.value) {
    if (modals.value[name as ModalKey]) {
      return name as ModalKey;
    }
  }
  return null;
});

const activeModalComponent = computed(() => {
  for (const [key, isActive] of Object.entries(modals.value)) {
    if (isActive) {
      switch (key) {
        case "sale":
          return ModalSale;
        case "trade":
          return ModalTradein;
        case "happy":
          return ModalHappy;
        case "credit":
          return ModalCredit;
        case "call":
          return ClassicModal;
        case "car":
          return ModalCar;
        default:
          return null;
      }
    }
  }
  return null;
});

const modalTransitionName = computed(() => {
  if (activeModalName.value) {
    if (ModalUp.value.includes(activeModalName.value)) {
      return "slide-up";
    }
  }
  return "slide-up";
});
</script>

<style lang="scss">
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(5rem);
  opacity: 0;
}

.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-leave-to {
  transform: translateY(5rem);
  opacity: 0;
}

// Стили для модального окна

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  z-index: 115;
  @include bp($point_2) {
    width: 100%;
    top: auto;
    bottom: 0;
    transform: translate(0, 0%);
    left: 0;
  }
}
</style>
