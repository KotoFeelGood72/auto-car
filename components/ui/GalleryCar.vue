<template>
  <div>
    <!-- Изображение автомобиля -->
    <div
      class="bg-slate-100 rounded-[10px] overflow-hidden p-5 max-h-[25rem] flex items-center justify-center mb-6"
    >
      <img
        :src="selectedImage"
        alt="Автомобиль"
        class="w-full h-auto rounded-lg"
      />
    </div>
    <div class="color-picker">
      <p class="text-txtGray text-lg mb-5">Цвет: {{ selectedColor }}</p>
      <div class="flex items-center gap-4 mt-2">
        <div
          v-for="color in colors"
          :key="color.name"
          :style="{ backgroundColor: color.hex }"
          class="w-8 h-8 rounded-full border cursor-pointer"
          :class="{ 'border-black': selectedColor === color.name }"
          @click="selectColor(color.name, color.image)"
          title="Нажмите, чтобы выбрать цвет"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const colors = [
  { name: "Белый", hex: "#FFFFFF", image: "/assets/img/cars/white.png" },
  { name: "Черный", hex: "#000000", image: "/assets/img/cars/black.png" },
  { name: "Синий", hex: "#1D4E89", image: "/assets/img/cars/blue.png" },
  { name: "Коричневый", hex: "#F58220", image: "/assets/img/cars/brown.png" },
  { name: "Бежевый", hex: "#F58220", image: "/assets/img/cars/beige.png" },
];

const selectedColor = ref(colors[0].name);
const selectedImage = ref(colors[0].image);

const selectColor = (colorName: string, image: string) => {
  selectedColor.value = colorName;
  selectedImage.value = image;
};
</script>
