<template>
  <div class="slider-container">
    <label class="slider-label">{{ label }}</label>
    <div class="slider-wrapper">
      <!-- Шкала -->
      <div class="slider-track">
        <div
          class="slider-fill"
          :style="{
            width: `calc(${((localValue - min) / (max - min)) * 100}% - 5px)`,
          }"
        ></div>
      </div>

      <!-- Сам input -->
      <input
        type="range"
        class="slider-input"
        :min="min"
        :max="max"
        :step="step"
        v-model="localValue"
        @input="emitInput"
      />

      <!-- Кружок -->
      <div
        class="slider-thumb"
        :style="{
          left: `calc(${((localValue - min) / (max - min)) * 100}% )`,
        }"
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
      <span
        v-for="mark in marks"
        :key="mark"
        class="slider-mark"
        :style="{
          left: `calc(${((parseFloat(mark) - min) / (max - min)) * 100}% )`,
        }"
      >
        {{ mark }}
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
  marks: (string | number)[]; // Деления на шкале
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
const emitInput = () => {
  emits("update:value", localValue.value);
};
</script>

<style scoped>
.slider-container {
  margin-bottom: 40px;
}

.slider-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}

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
}

.slider-fill {
  height: 3px;
  background-color: #2563eb; /* Синий цвет */
  border-radius: 2px;
}

.slider-input {
  position: absolute;
  width: 100%;
  height: 24px;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
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
  margin-top: -6px;
  width: 100%;
  font-size: 14px;
  color: #6b7280; /* Тёмно-серый */
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  justify-content: space-between;
  max-width: calc(100% - 40px);
}

.slider-mark {
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
}
</style>
