<template>
  <div class="calc">
    <div class="left-side">
      <heading title="Выберите автомобиль" :level="2" :size="24" />
      <Select :options="options" placeholder="Выберите марку" />
      <Select :options="options" placeholder="Выберите модель" />

      <heading title="Выберите условия автокредита" :level="2" :size="24" />
      <range
        :start="0"
        :min="0"
        :max="90"
        :step="1"
        :values="[0, 23, 45, 68, 90]"
        :connect="true"
        :show-values="true"
        @update="updateDownPayment"
      />

      <heading title="Контактные данные" :level="2" :size="24" />
      <range
        :start="6"
        :min="6"
        :max="96"
        :step="6"
        :values="[6, 24, 36, 48, 60, 72, 84, 96]"
        :connect="true"
        :show-values="true"
        @update="updateLoanTerm"
        unit=""
      />
      <Form :row="true" />
    </div>
    <div class="right-side">
      <CarDetails
        :car="selectedCar"
        :downPayment="downPayment"
        :loanTerm="loanTerm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Select from "../ui/Select.vue";
import range from "../ui/range.vue";
import Form from "./Form.vue";
import heading from "../ui/heading.vue";
import CarDetails from "./CarDetails.vue";

const options = [
  { value: "lada", label: "LADA" },
  { value: "kia", label: "KIA" },
  { value: "toyota", label: "Toyota" },
];

const selectedCar = ref({
  brand: "LADA",
  model: "Granta",
  price: 354400,
  image: "https://via.placeholder.com/300x200?text=LADA+Granta",
});

const downPayment = ref(30); // Первоначальный взнос (%)
const loanTerm = ref(36); // Срок кредитования (месяцы)

const updateDownPayment = (value: number) => {
  downPayment.value = value;
};

const updateLoanTerm = (value: number) => {
  loanTerm.value = value;
};
</script>

<style lang="scss" scoped>
.left-side {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 65rem;
  background-color: #f7f7f7;
  padding: 4rem;
  border-radius: 2rem;
}

.calc {
  @include flex-start;
}
</style>
