<template>
  <div class="relative inline-block text-left w-full" ref="dropdown">
    <div>
      <button
        @click="toggleDropdown"
        type="button"
        class="w-full flex justify-between items-center px-4 py-3 border border-light rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring focus:primary"
      >
        <span>{{ selectedLabel || placeholder }}</span>
        <Icon name="bi:chevron-down" :class="{ 'rotate-180': isOpen }" />
      </button>
    </div>

    <div
      v-if="isOpen"
      :class="[
        dropdownPosition,
        'absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto',
      ]"
      :style="{
        marginTop: dropdownPosition === 'top-full' ? '8px' : '0',
        marginBottom: dropdownPosition === 'bottom-full' ? '8px' : '0',
      }"
    >
      <ul class="text-txtGray">
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          :class="{
            'bg-primary text-white': selectedValue === option.value,
            'hover:bg-gray-100 cursor-pointer': selectedValue !== option.value,
          }"
          class="px-4 py-2"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  options: { value: string; label: string }[];
  placeholder: string;
}>();

const isOpen = ref(false);
const selectedValue = ref("");
const selectedLabel = ref("");
const dropdownPosition = ref("top-full");
const dropdown = ref<HTMLElement | null>(null);

// Переключение видимости выпадающего меню
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;

  // Проверяем доступное пространство для отображения меню
  if (isOpen.value) {
    adjustDropdownPosition();
  }
};

// Выбор опции
const selectOption = (option: { value: string; label: string }) => {
  selectedValue.value = option.value;
  selectedLabel.value = option.label;
  isOpen.value = false; // Закрытие меню после выбора
};

// Закрытие при клике вне
const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// Определение расположения выпадающего меню
const adjustDropdownPosition = () => {
  const dropdownRect = dropdown.value?.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (dropdownRect && dropdownRect.bottom + 200 > windowHeight) {
    dropdownPosition.value = "bottom-full"; // Показываем вверх
  } else {
    dropdownPosition.value = "top-full"; // Показываем вниз
  }
};

// Добавляем обработчики событий
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Ограничение высоты списка и плавная анимация стрелки */
.rotate-180 {
  transform: rotate(180deg);
}

.bottom-full {
  bottom: 100%;
}

.top-full {
  top: 100%;
}
</style>
