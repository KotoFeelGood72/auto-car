<template>
  <div class="car-details">
    <img :src="car.image" :alt="`Фото ${car.model}`" class="car-image" />
    <div class="car-price">от {{ car.price.toLocaleString() }} ₽</div>
    <button class="btn">Первоначальный взнос</button>
    <ul class="car-info">
      <li>Марка: {{ car.brand }}</li>
      <li>Модель: {{ car.model }}</li>
      {{
        loanTerm
      }}
      {{
        downPayment
      }}
      <li>Ежемесячный платёж: {{ monthlyPayment }} ₽/мес</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  car: {
    type: Object as () => {
      brand: string;
      model: string;
      price: number;
      image: string;
    },
    required: true,
  },
  downPayment: { type: Number, default: 30 }, // Первоначальный взнос (%)
  loanTerm: { type: Number, default: 36 }, // Срок кредитования (в месяцах)
});

const monthlyPayment = computed(() => {
  const initialPayment = (props.car.price * props.downPayment) / 100;
  const loanAmount = props.car.price - initialPayment;
  const interestRate = 0.07; // 7% годовых
  const monthlyRate = interestRate / 12;
  const numPayments = props.loanTerm;
  return Math.round(
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))
  );
});
</script>

<style scoped>
.car-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.car-image {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
}

.car-price {
  font-size: 2rem;
  font-weight: bold;
  color: #0b4dc2;
}

.car-info {
  list-style: none;
  padding: 0;
  text-align: center;
  font-size: 1rem;
}

.btn {
  background-color: #0b4dc2;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

.btn:hover {
  background-color: #063b96;
}
</style>
