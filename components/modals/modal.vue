<template>
  <div :class="['modal', { burgers: activeModalName === 'burger' }]">
    <transition :name="modalTransitionName">
      <component v-if="activeModalComponent" :is="activeModalComponent" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useModalStoreRefs } from "~/stores/useModalStore";
import ModalSale from "./ModalSale.vue";
import ModalHappy from "./ModalHappy.vue";
import ModalTradein from "./ModalTradein.vue";
import ClassicModal from "./ClassicModal.vue";
import ModalCar from "./ModalCar.vue";
import Burger from "./Burger.vue";

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

        case "call":
          return ClassicModal;
        case "car":
          return ModalCar;
        case "burger":
          return Burger;
        default:
          return null;
      }
    }
  }
  return null;
});

const previousModalName = ref<ModalKey | null>(null);

const modalTransitionName = computed(() => {
  // Если модальное окно "бургер", используем slide-left
  if (activeModalName.value === "burger") {
    previousModalName.value = "burger";
    return "slide-left";
  }

  // Если активное модальное окно относится к "ModalUp", используем slide-up
  if (activeModalName.value && ModalUp.value.includes(activeModalName.value)) {
    previousModalName.value = activeModalName.value; // Сохраняем предыдущее модальное окно
    return "slide-up";
  }

  // Если модальное окно закрывается, возвращаем анимацию предыдущего окна
  if (!activeModalName.value) {
    if (previousModalName.value === "burger") {
      return "slide-left";
    }
    return "slide-up";
  }

  return "slide-up"; // Анимация по умолчанию
});
</script>

<style lang="scss">
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
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

.burgers {
  max-width: 90%;
}
</style>
