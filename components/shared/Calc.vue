<template>
  <div class="bg-gray-900 text-white p-6">
    <h1 class="text-xl font-semibold mb-6">Калькулятор</h1>
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Левая колонка: Форма -->
      <div class="bg-gray-100 text-gray-900 rounded-lg p-6 flex-1">
        <h2 class="text-lg font-medium mb-4">Выберите автомобиль</h2>
        <div class="mb-4">
          <label for="brand" class="block text-sm font-medium mb-2">Марка</label>
          <select
            id="brand"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-500"
            v-model="selectedBrand"
          >
            <option value="">Выберите марку</option>
            <option v-for="brand in brands" :key="brand" :value="brand">
              {{ brand }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <label for="model" class="block text-sm font-medium mb-2">Модель</label>
          <select
            id="model"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-500"
            v-model="selectedModel"
          >
            <option value="">Выберите модель</option>
            <option
              v-for="model in models[selectedBrand] || []"
              :key="model.name"
              :value="model"
            >
              {{ model.name }} ({{ model.price }} руб.)
            </option>
          </select>
        </div>

        <h2 class="text-lg font-medium mb-4">Условия автокредита</h2>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Первоначальный взнос</label>
          <input
            type="range"
            class="w-full"
            min="10"
            max="90"
            step="10"
            v-model="downPayment"
          />
          <div class="flex justify-between text-sm text-gray-600 mt-1">
            <span>10%</span>
            <span>90%</span>
          </div>
          <p class="text-blue-500 font-semibold mt-2 text-right">{{ downPayment }}%</p>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2">Срок кредитования</label>
          <input
            type="range"
            class="w-full"
            min="6"
            max="96"
            step="6"
            v-model="loanTerm"
          />
          <div class="flex justify-between text-sm text-gray-600 mt-1">
            <span>6 мес</span>
            <span>96 мес</span>
          </div>
          <p class="text-blue-500 font-semibold mt-2 text-right">{{ loanTerm }} мес</p>
        </div>

        <h2 class="text-lg font-medium mb-4">Контактные данные</h2>
        <Inputs placeholder="Ваше имя" v-model="contactName" />
        <Inputs placeholder="+7 (___) ___-__-__" v-model="contactPhone" />
        <btn
          name="Отправить заявку"
          theme="primary"
          size="large"
          @click="submitApplication"
        />
        <p class="text-xs text-gray-500 mt-3">
          Нажимая на кнопку «Отправить», я даю согласие на обработку персональных данных.
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
          Для расчета условий по автокредиту выберите интересующий вас автомобиль.
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
          К сожалению, банк не кредитует данные регионы: Магаданская область, Республика
          Дагестан, Республика Ингушетия...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Inputs from "../ui/Inputs.vue";
import btn from "../ui/btn.vue";

// Пропсы
const props = defineProps<{
  brands: string[];
  models: Record<string, { name: string; price: number; image?: string }[]>;
  initialBrand?: string;
  initialModel?: string;
}>();

// Состояния
const selectedBrand = ref(props.initialBrand || "");
const selectedModel = ref(
  props.models[props.initialBrand || ""]?.find(
    (model) => model.name === props.initialModel
  ) || null
);
const downPayment = ref(30); // Первоначальный взнос (%)
const loanTerm = ref(36); // Срок кредитования (месяцы)
const contactName = ref(""); // Имя клиента
const contactPhone = ref(""); // Телефон клиента

// Следим за маркой
watch(selectedBrand, (newBrand) => {
  if (!newBrand) {
    selectedModel.value = null;
  } else if (!props.models[newBrand]?.includes(selectedModel.value)) {
    selectedModel.value = props.models[newBrand]?.[0] || null;
  }
});

// Вычисления
const monthlyPayment = computed(() => {
  if (!selectedModel.value) return 0;
  const price = selectedModel.value.price;
  const initialPayment = (price * downPayment.value) / 100;
  const loanAmount = price - initialPayment;
  const interestRate = 0.07; // 7% годовых
  const monthlyRate = interestRate / 12;
  const numPayments = loanTerm.value;
  return Math.round(
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))
  );
});

// Отправка данных
const submitApplication = () => {
  console.log("Имя:", contactName.value);
  console.log("Телефон:", contactPhone.value);
  console.log("Автомобиль:", selectedModel.value?.name || "Не выбран");
  console.log("Ежемесячный платеж:", monthlyPayment.value);
};
</script>

<style scoped></style>
