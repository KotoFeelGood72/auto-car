<template>
  <div
    class="card-check flex items-start justify-between rounded-xl shadow-sm hover:shadow-md transition-shadow relative"
  >
    <input
      type="radio"
      :id="card.id"
      :name="card.name"
      :value="card"
      v-model="selectedValue"
      class="peer hidden"
    />
    <label
      :for="card.id"
      class="flex flex-row items-start w-full cursor-pointer p-4 rounded-xl gap-4 border peer-checked:border-primary"
    >
      <div class="flex flex-col">
        <p class="text-lg font-semibold text-primary mb-2">
          {{ card.title }}
        </p>
        <p class="text-lg font-semibold mb-2">от {{ card.price }} ₽</p>
        <p class="text-sm text-txtGray">
          {{ card.params }}
        </p>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: any;
  card: {
    id: string;
    name: string;
    title: string;
    price: string | number;
    params: string;
  };
}>();

const emit = defineEmits(["update:modelValue"]);
const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
