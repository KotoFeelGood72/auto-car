<template>
  <section>
    <div class="container">
      <div class="p-6">
        <h1 class="text-4xl font-semibold mb-6">Калькулятор</h1>
        <div class="flex flex-col md:flex-row gap-6">
          <div
            class="bg-gray-100 text-gray-900 rounded-lg p-6 flex-1 max-w-[605px]"
          >
            <h2 class="text-lg font-medium mb-4">Выберите автомобиль</h2>
            <Select
              :options="options"
              placeholder="Выберите марку"
              class="mb-4"
            />
            <Select
              :options="options"
              placeholder="Выберите модель"
              class="mb-4"
            />

            <h2 class="text-lg font-medium mb-1">
              Выберите условия автокредита
            </h2>
            <!-- Слайдеры -->
            <RangeSlider
              label="Первоначальный взнос"
              :value="downPayment"
              :min="10"
              :max="90"
              :step="10"
              :marks="[10, 30, 60, 90]"
              unit="%"
              @update:value="(val) => (downPayment = val)"
            />
            <RangeSlider
              label="Срок кредитования"
              :value="loanTerm"
              :min="6"
              :max="96"
              :step="6"
              :marks="['6 мес', '36 мес', '66 мес', '96 мес']"
              unit="мес"
              @update:value="(val) => (loanTerm = val)"
            />
            <h2 class="text-lg font-medium mb-4">Контактные данные</h2>
            <div class="flex items-center justify-start gap-3 mb-3 w-full">
              <Inputs
                placeholder="Ваше имя"
                v-model="contactName"
                class="flex-1"
              />
              <Inputs
                placeholder="+7 (___) ___-__-__"
                v-model="contactPhone"
                class="flex-1"
              />
            </div>
            <btn
              name="Отправить заявку"
              theme="primary"
              size="normal"
              custom-class="!px-8 !py-4 w-full"
              @click="submitApplication"
            />
            <p class="text-xs text-txtGray max-w-80 text-center mx-auto mt-3">
              Нажимая на кнопку «Отправить», я даю согласие на обработку
              персональных данных.
            </p>
          </div>

          <!-- Правая колонка: Результат -->
          <div class="bg-gray-100 text-gray-900 rounded-lg p-6 w-full md:w-1/3">
            <h2 class="text-lg font-medium mb-4">Результат</h2>
            <div class="mb-4">
              <img
                v-if="selectedModel"
                :src="selectedModel.image || '/images/car-placeholder.png'"
                alt="Выбранный автомобиль"
                class="w-full rounded-lg"
              />
            </div>
            <p class="text-blue-500 font-semibold text-lg mb-4">
              От {{ selectedModel?.price || "0" }} руб.
            </p>
            <p class="text-sm text-gray-600 mb-4">
              Для расчета условий по автокредиту выберите интересующий вас
              автомобиль.
            </p>
            <div class="bg-blue-100 rounded-lg p-4 mb-4">
              <p>
                Первоначальный взнос:
                <span class="font-semibold">{{ downPayment }}%</span>
              </p>
              <p>
                Срок кредитования:
                <span class="font-semibold">{{ loanTerm }} мес</span>
              </p>
              <p>
                Ежемесячный платеж:
                <span class="font-semibold">{{ monthlyPayment }} руб./мес</span>
              </p>
            </div>
            <p class="text-xs text-gray-500">
              К сожалению, банк не кредитует данные регионы: Магаданская
              область, Республика Дагестан, Республика Ингушетия...
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Inputs from "../ui/Inputs.vue";
import btn from "../ui/btn.vue";
import Select from "../ui/Select.vue";
import RangeSlider from "../ui/RangeSlider.vue";

const options = [
  { value: "option1", label: "Вариант 1" },
  { value: "option2", label: "Вариант 2" },
  { value: "option3", label: "Вариант 3" },
];

const downPayment = ref(30); // Первоначальный взнос (%)
const loanTerm = ref(36); // Срок кредитования (месяцы)
const contactName = ref(""); // Имя клиента
const contactPhone = ref(""); // Телефон клиента

const monthlyPayment = computed(() => {
  const price = 1000000; // Примерная цена
  const initialPayment = (price * downPayment.value) / 100;
  const loanAmount = price - initialPayment;
  const interestRate = 0.07; // 7% годовых
  const monthlyRate = interestRate / 12;
  const numPayments = loanTerm.value;
  return Math.round(
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))
  );
});

const submitApplication = () => {
  console.log("Имя:", contactName.value);
  console.log("Телефон:", contactPhone.value);
  console.log("Первоначальный взнос:", downPayment.value);
  console.log("Срок кредитования:", loanTerm.value);
};
</script>
