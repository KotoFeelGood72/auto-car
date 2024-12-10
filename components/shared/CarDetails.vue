<template>
  <div class="car-details">
    <img :src="car.image" :alt="`Фото ${car.model}`" class="car-image" />
    <heading
      :title="'от ' + car.price.toLocaleString() + ' ₽'"
      :level="2"
      :size="32"
      color="blue"
    />
    <div class="info">
      <div>
        <p>Первоначальный взнос</p>
        <span>{{ downPayment }} % </span>
      </div>
      <div>
        <p>Срок кредитования</p>
        <span>{{ formatLoanTerm(loanTerm) }}</span>
      </div>
      <div>
        <p>Ежемесячный платёж</p>
        <span>{{ formatCurrency(monthlyPayment) }}/мес.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import heading from "../ui/heading.vue";

const props = defineProps<{
  car: any;
  downPayment: any;
  loanTerm: any;
}>();

const monthlyPayment = computed(() => {
  const initialPayment = (props.car.price * props.downPayment) / 100;
  const loanAmount = props.car.price - initialPayment;
  const interestRate = 0.07;
  const monthlyRate = interestRate / 12;
  const numPayments = props.loanTerm;
  return Math.round(
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))
  );
});

const formatCurrency = (value: number): string => {
  return value.toLocaleString("ru-RU", { style: "currency", currency: "RUB" });
};

const getYearEnding = (years: number): string => {
  const lastDigit = years % 10;
  const lastTwoDigits = years % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "лет";
  }

  if (lastDigit === 1) {
    return "год";
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return "года";
  }

  return "лет";
};

const formatLoanTerm = (months: number): string => {
  if (months < 12) {
    return `${months} мес.`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const yearEnding = getYearEnding(years);

  return remainingMonths > 0
    ? `${years} ${yearEnding} ${remainingMonths} мес.`
    : `${years} ${yearEnding}`;
};
</script>

<style scoped lang="scss">
.car-details {
  background-color: #f7f7f7;
  padding: 4rem;
  border-radius: 2rem;
  overflow: hidden;

  @include bp($point_2) {
    padding: 2rem;
    width: 100%;
    flex-grow: 1;
  }
}
.car-image {
  background-color: #e4e4e4;
  border-radius: 1rem;
  overflow: hidden;
  @include flex-center;
  height: 32.5rem;
  width: 100%;
  object-fit: contain;
  margin-bottom: 3rem;
  @include bp($point_2) {
    max-width: 20rem;
    height: auto;
    margin: 0 auto;
    padding: 0;
    background-color: transparent;
  }
}
.info {
  background: radial-gradient(
    105.52% 108.84% at 37.86% 30.64%,
    rgb(0, 57, 166) 0%,
    rgb(84, 120, 188) 100%
  );
  padding: 2rem;
  border-radius: 1rem;
  color: $white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0 0 0;

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
    font-size: 2rem;
    font-weight: 500;
    @include bp($point_2) {
      font-size: 1.2rem;
      gap: 1rem 2rem;
    }
    span {
      font-size: 2.4rem;
      font-weight: 600;
      @include bp($point_2) {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
