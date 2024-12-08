<template>
  <div class="slider-container">
    <label class="font-light text-sm mb-2 block">{{ label }}</label>
    <div class="slider-wrapper">
      <!-- Шкала -->
      <div class="slider-track">
        <div
          class="slider-fill"
          :style="{
            width: `calc(${((localValue - min) / (max - min)) * 100}% )`,
          }"
        ></div>
      </div>

      <!-- Кружок -->
      <div
        class="slider-thumb"
        :style="{
          left: `calc(${((localValue - min) / (max - min)) * 100}% )`,
        }"
        @mousedown="startDrag"
        @touchstart="startDrag"
      ></div>

      <!-- Текущее значение -->
      <div
        class="slider-value"
        :style="{
          left: `calc(${((localValue - min) / (max - min)) * 100}% )`,
        }"
      >
        {{ localValue }} {{ unit }}
      </div>
    </div>

    <!-- Деления -->
    <div class="slider-marks">
      <span v-for="mark in marks" :key="mark" class="slider-mark">
        {{ mark }}{{ unit === "%" ? " %" : "" }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  marks: any[]; // Деления на шкале
  unit?: string; // Единица измерения
}>();

const emits = defineEmits(["update:value"]);

const localValue = ref(props.value);

// Слежение за обновлением значения
watch(
  () => props.value,
  (newValue) => {
    localValue.value = newValue;
  }
);

// Обновление значения
const updateValue = (value: number) => {
  if (value < props.min) value = props.min;
  if (value > props.max) value = props.max;

  localValue.value = value;
  emits("update:value", localValue.value);
};

// Эмуляция перетаскивания
const startDrag = (event: MouseEvent | TouchEvent) => {
  const sliderWrapper = (event.target as HTMLElement).closest(
    ".slider-wrapper"
  ) as HTMLElement;
  const rect = sliderWrapper.getBoundingClientRect();

  const moveHandler = (e: MouseEvent | TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const percentage = Math.min(
      Math.max((clientX - rect.left) / rect.width, 0),
      1
    );
    const newValue = props.min + percentage * (props.max - props.min);

    updateValue(Math.round(newValue / props.step) * props.step);
  };

  const stopHandler = () => {
    window.removeEventListener("mousemove", moveHandler);
    window.removeEventListener("mouseup", stopHandler);
    window.removeEventListener("touchmove", moveHandler);
    window.removeEventListener("touchend", stopHandler);
  };

  window.addEventListener("mousemove", moveHandler);
  window.addEventListener("mouseup", stopHandler);
  window.addEventListener("touchmove", moveHandler);
  window.addEventListener("touchend", stopHandler);
};
</script>

<style scoped>
.slider-container {
  position: relative;
  user-select: none;
}

/* .slider-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
} */

.slider-wrapper {
  position: relative;
  width: 100%;
  height: 40px;
}

.slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #d1d5db; /* Серый цвет */
  border-radius: 2px;
  transform: translateY(-50%);
  pointer-events: none;
}

.slider-fill {
  height: 3px;
  background-color: #2563eb; /* Синий цвет */
  border-radius: 2px;
}

.slider-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border: 2px solid #2563eb; /* Синий цвет */
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1;
  cursor: grab;
}

.slider-thumb:active,
.slider-thumb:focus {
  box-shadow: 0 0 0 5px rgba(37, 100, 235, 0.329); /* Синяя более заметная тень */
  cursor: grabbing;
}

.slider-value {
  position: absolute;
  top: -6px;
  font-size: 12px;
  font-weight: 600;
  color: #2563eb; /* Синий цвет */
  transform: translateX(-50%);
  white-space: nowrap;
}

.slider-marks {
  position: relative;
  width: 100%;
  font-size: 14px;
  color: #6b7280;
  display: flex;
  justify-content: space-between;
}

.slider-mark {
  white-space: nowrap;
  display: block;
  text-align: center;
}
</style>
