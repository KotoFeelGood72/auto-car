<template>
  <div class="timers">
    <p class="title">До конца акции осталось:</p>
    <div class="timer-row">
      <div v-for="(value, label) in time" :key="label" class="">
        <div class="timer-digit">
          <div
            v-for="(digit, i) in formatDigits(value)"
            :key="digit + label + i"
          >
            <span>{{ digit }}</span>
          </div>
        </div>
        <p class="">{{ label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

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

const formatDigits = (value: number) => {
  return value < 10 ? ["0", value.toString()] : value.toString().split("");
};

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

<style scoped lang="scss">
.timers {
  padding-top: 2rem;
}
.timer-row {
  @include flex-start;
  gap: 2rem;
  @include bp($point_2) {
    gap: 1rem;
  }

  p {
    @include flex-center;
    font-size: 2rem;
    @include bp($point_2) {
      font-size: 1.4rem;
    }
  }
}

.timer-digit {
  @include flex-start;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.27) 50%,
    #ffffff80 50%
  );
  width: 11rem;
  height: 6.8rem;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1.2rem;
  @include bp($point_2) {
    width: 6rem;
    height: 4rem;
    border-radius: 0.3rem;
  }

  div {
    flex-grow: 1;
    @include flex-center;
    line-height: 4rem;
  }
  span {
    font-size: 5rem;
    @include bp($point_2) {
      font-size: 2rem;
    }
  }
}

.title {
  font-size: 2rem;
  margin-bottom: 2.8rem;
}
</style>
