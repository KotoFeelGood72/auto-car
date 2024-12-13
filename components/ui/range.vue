<template>
  <div class="slider-container">
    <div ref="slider"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineEmits } from "vue";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

const props = defineProps({
  modelValue: { type: Number, default: 50 }, // Используем modelValue для v-model
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  connect: { type: Boolean, default: false },
  showValues: { type: Boolean, default: true },
  values: {
    type: Array as () => number[],
    default: () => [0, 25, 50, 75, 90],
  },
  unit: { type: String, default: "%" }, // Новое поле для единицы измерения
});

const emits = defineEmits(["update:modelValue"]); // Эмитим событие для v-model

const slider = ref<any>(null);

onMounted(() => {
  if (slider.value) {
    // Создаем объект range с явными min и max
    const range: any = props.values.reduce((acc: any, value, index) => {
      const percentage: any = (index / (props.values.length - 1)) * 100;
      acc[percentage] = value;
      return acc;
    }, {});

    // Добавляем min и max в объект range
    range.min = Math.min(...props.values);
    range.max = Math.max(...props.values);

    const noUiSliderInstance = noUiSlider.create(slider.value, {
      start: props.modelValue, // Используем значение modelValue
      connect: props.connect,
      range: range, // Используем кастомный range
      snap: true, // Привязка к значениям
      pips: <any>{
        mode: "values",
        values: props.values, // Значения для отображения
        density: 4,
        format: {
          to: (value: any) => `${value} ${props.unit}`,
          from: (value: any) => parseFloat(value),
        },
      },
    });

    // Обновление при перемещении ползунка
    noUiSliderInstance.on("update", (value: any) => {
      const parsedValue = parseFloat(value[0]);
      emits("update:modelValue", parsedValue); // Обновляем v-model
    });
  }
});

// Следим за изменениями modelValue и обновляем слайдер
watch(
  () => props.modelValue,
  (newValue) => {
    if (slider.value && slider.value.noUiSlider) {
      slider.value.noUiSlider.set(newValue);
    }
  }
);
</script>

<style lang="scss">
/* Основная линия слайдера */

.slider-container {
  position: relative;
  height: 4rem;
}

.noUi-horizontal .noUi-handle {
  right: -0.9rem;
}

/* Основная линия слайдера */
.noUi-target {
  background: none;
  border: none;
  height: 0.4rem; /* Уменьшаем толщину линии */
  background-color: #e0e0e0; /* Цвет неактивной части */
  position: relative;
  width: calc(100% - 2.4rem); /* Учитываем ширину ползунка */
  margin: 0 auto; /* Центрируем трек */
}

/* Ползунок */
.noUi-handle {
  max-height: 2.4rem;
  max-width: 2.4rem;
  width: 2.4rem;
  height: 2.4rem;
  background-color: #fff;
  border: 0.6rem solid $primary;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  top: -0.9rem !important;

  &:before,
  &:after {
    display: none;
  }
}

.noUi-handle:hover {
  transform: scale(1.1);
}

/* Значения делений (пипсов) */
.noUi-value {
  font-size: 12px;
  color: #0b4dc2;
  font-weight: bold;
  position: absolute; /* Абсолютное позиционирование */
  white-space: nowrap; /* Убираем перенос текста */
  transform: translate(
    -50%,
    20px
  ); /* Центрируем по горизонтали и смещаем вниз */
  max-width: 50px; /* Ограничиваем ширину значений */
  overflow: hidden; /* Убираем лишний текст */
  text-overflow: ellipsis; /* Добавляем многоточие для длинных значений */
}

.noUi-value-large {
  font-size: 1.6rem;
  font-weight: 400;
  color: $txtGray;
}

.noUi-origin {
  box-shadow: none;
}

/* Тонкая линия шкалы */
.noUi-connect {
  background-color: #0b4dc2;
}

.noUi-marker {
  display: none;
}

.noUi-pips-horizontal {
  padding: 0;
}

// .noUi-value:nth-child(2) {
//   left: 1rem !important;
//   //   transform: translateX(1rem) translateY(-50%);
// }

// .noUi-value:last-of-type {
//   left: 98% !important;
//   //   transform: translateX(-3rem) translateY(-50%);
// }

.noUi-target {
  touch-action: pan-y; /* Разрешает вертикальную прокрутку */
}
</style>
