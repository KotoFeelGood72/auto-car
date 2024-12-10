<template>
  <div class="cars">
    <div class="img">
      <img :src="selectedImage" alt="Автомобиль" />
      <div class="hot">Выгода 739 600 ₽</div>
    </div>
    <div class="color-picker__w">
      <p class="label">Цвет: {{ selectedColor }}</p>
      <div class="color-picker">
        <div
          v-for="color in colors"
          :key="color.name"
          :style="{ backgroundColor: color.hex }"
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

<style lang="scss" scoped>
.img {
  @include flex-center;
  background-color: #f3f3f3;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
}

.hot {
  position: absolute;
  top: 2rem;
  right: 2rem;
  border-radius: 1rem;
  background-color: $red;
  padding: 1rem 2rem;
  color: $white;
  font-size: 1.8rem;
}

.cars {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
}

.color-picker__w {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 2rem;
}
.color-picker {
  @include flex-start;
  gap: 1rem;
  div {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    border: 0.1rem solid $border;
    cursor: pointer;
  }
}
</style>
