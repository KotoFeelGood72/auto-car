<template>
  <div class="calc mb-8">
    <div class="left-side">
      <heading title="Выберите автомобиль" :level="2" :size="32" />
      <!-- <Select :options="options" placeholder="Выберите марку" />
      <Select :options="options" placeholder="Выберите модель" /> -->

      <heading title="Первоначальный взнос" :level="2" :size="16" />
      <range
        :start="0"
        :min="0"
        :max="90"
        :step="1"
        :values="[0, 23, 45, 68, 90]"
        :connect="true"
        :show-values="true"
        v-model="down_payment"
        unit="%"
      />

      <heading title="Срок кредитования" :level="2" :size="16" />
      <range
        :start="6"
        :min="6"
        :max="96"
        :step="6"
        :values="[6, 24, 36, 48, 60, 72, 84, 96]"
        :connect="true"
        :show-values="true"
        v-model="loan_term"
        unit=""
      />
      <heading title="Укажите контактные данные" :level="2" :size="32" />
      <Form :row="true" :deal-type="80" :additionalData="formAdditionalData" />
    </div>
    <div class="right-side">
      <CarDetails
        :car="car"
        :downPayment="down_payment"
        :loanTerm="loan_term"
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

const props = defineProps<{
  car: any;
}>();

const down_payment = ref(45);
const loan_term = ref(36);

const formAdditionalData = computed(() => ({
  down_payment: down_payment.value,
  loan_term: loan_term.value,
  car: props.car,
}));
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
  @include bp($point_2) {
    order: 1;
    padding: 2rem;
  }
}
.right-side {
  flex-grow: 1;
  @include bp($point_2) {
    order: 0;
    width: 100%;
  }
}

.calc {
  @include flex-start;
  align-items: flex-start;
  gap: 4rem;
  @include bp($point_2) {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
