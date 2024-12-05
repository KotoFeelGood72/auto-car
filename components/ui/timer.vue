<template>
  <div class="flex flex-col items-start text-center pb-28">
    <p class="text-lg text-white mb-4">До конца акции осталось:</p>
    <div class="flex gap-4">
      <div
        v-for="(value, label) in time"
        :key="label"
        class="flex flex-col items-center"
      >
        <div
          class="flex items-center text-[51px] rounded-[7px] overflow-hidden"
        >
          <div
            v-for="(digit, i) in formatDigits(value)"
            :key="digit + label + i"
            :class="[
              'flex items-center justify-center w-[61px] h-16 text-white font-bold text-[36px]',
              i === 0 ? 'bg-white/30' : 'bg-white/60',
            ]"
          >
            <span class="z-10">{{ digit }}</span>
          </div>
        </div>
        <p class="text-lg text-white mt-3">{{ label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

// Таймстамп окончания акции
const endDate = ref<number | null>(null);
const interval = ref<number | null>(null);
const now = ref<number>(Date.now());

// Функция для вычисления оставшегося времени
const time = computed(() => {
  if (!endDate.value) return { дней: 0, часов: 0, минут: 0, секунд: 0 };

  const distance = endDate.value - now.value;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    дней: Math.max(days, 0),
    часов: Math.max(hours, 0),
    минут: Math.max(minutes, 0),
    секунд: Math.max(seconds, 0),
  };
});

// Форматирование числа в массив отдельных цифр
const formatDigits = (value: number) => {
  return value < 10 ? ["0", value.toString()] : value.toString().split("");
};

// Инициализация таймера
onMounted(() => {
  const savedEndDate = JSON.parse(localStorage.getItem("timerEnd") || "null");

  if (savedEndDate) {
    endDate.value = savedEndDate;
  } else {
    const newEndDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    endDate.value = newEndDate;
    localStorage.setItem("timerEnd", JSON.stringify(newEndDate));
  }

  interval.value = window.setInterval(() => {
    now.value = Date.now();
    if (endDate.value && endDate.value - now.value <= 0) {
      clearInterval(interval.value!);
      localStorage.removeItem("timerEnd");
      endDate.value = null;
    }
  }, 1000);
});

// Очищаем интервал при уничтожении компонента
onUnmounted(() => {
  if (interval.value) clearInterval(interval.value);
});
</script>

<style scoped lang="scss"></style>
