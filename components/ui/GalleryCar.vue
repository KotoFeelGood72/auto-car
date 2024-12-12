<template>
  <div class="cars">
    <div class="img">
      <img :src="selectedImage" alt="Автомобиль" />
      <div class="hot">{{ price }}</div>
    </div>
    <div class="color-picker__w">
      <p class="label">Цвет: {{ selectedColor }}</p>
      <div class="color-picker">
        <div
          v-for="color in colors"
          :key="color.name"
          :style="color.style"
          :class="{ active: selectedColor === color.name }"
          @click="selectColor(color.name, color.image)"
          title="Нажмите, чтобы выбрать цвет"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  colors: any;
  price: any;
}>();

const selectedColor = ref(props.colors[0]?.name);
const selectedImage = ref(props.colors[0]?.image);

const selectColor = (colorName: string, image: string) => {
  selectedColor.value = colorName;
  selectedImage.value = image;
};

watch(
  () => props.colors,
  (newColors) => {
    if (newColors && newColors.length) {
      selectedColor.value = newColors[0]?.name;
      selectedImage.value = newColors[0]?.image;
    }
  },
  { immediate: true } // Обновляет данные сразу при монтировании
);
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
  gap: 1.5rem;
  div {
    width: 5rem;
    height: 4rem;
    border-radius: 1rem;
    border: 0.1rem solid $border;
    cursor: pointer;
    @include flex-center;
    transition: all 0.3s ease-in-out;
    &.active {
      transform: scale(1.1);
    }
  }
}
</style>
