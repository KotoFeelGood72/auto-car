<template>
  <div
    class="card-check flex flex-col border rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <!-- Верхняя часть карточки -->
    <div class="flex items-start">
      <input
        type="radio"
        :id="data.id"
        :name="data.name"
        :value="data.id"
        v-model="selectedValue"
        class="hidden peer"
      />

      <label
        :for="data.id"
        class="relative cursor-pointer border peer-checked:border-primary p-5 rounded-lg gap-5"
      >
        <div class="flex flex-col gap-2">
          <p class="text-lg font-semibold leading-4 text-primary">
            {{ data.title }}
          </p>
          <p class="text-xl font-medium">от {{ data.price }} ₽</p>
          <p class="text-sm text-txtGray">
            от {{ data.monthlyPrice }} ₽ / мес.
          </p>
        </div>
        <ul class="mt-4 space-y-2">
          <li
            v-for="(feature, index) in data.features"
            :key="index"
            class="flex items-center text-sm text-txtGray"
          >
            <span class="w-2 h-2 min-w-2 bg-gray-400 rounded-full mr-2"></span>
            {{ feature }}
          </li>
        </ul>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: {
    id: string;
    name: string;
    title: string;
    price: number;
    monthlyPrice: number;
    features: string[];
  };
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

// Связь с v-model
const selectedValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<style scoped></style>
