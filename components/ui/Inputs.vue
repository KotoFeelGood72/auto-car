<template>
  <div class="input-wrapper">
    <input
      ref="input"
      :type="type"
      :placeholder="placeholder"
      v-model="localValue"
      :class="{ error: error }"
      @input="applyMask"
    />
    <span v-if="error" class="input-message">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    message?: string;
    error?: boolean;
    modelValue: string;
    phone?: boolean;
  }>(),
  {
    type: "text",
    placeholder: "Введите номер телефона",
    message: "",
    error: false,
    modelValue: "",
    phone: false,
  }
);

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

const applyMask = (event: Event) => {
  if (!props.phone) return;

  const inputElement = event.target as HTMLInputElement;
  let value = inputElement.value.replace(/\D/g, ""); // Удаляем все нецифровые символы

  // Автозамена "8" на "+7" в начале строки
  if (value.startsWith("8")) {
    value = "7" + value.slice(1);
  }

  // Форматируем в формате +7 (XXX) XXX-XX-XX
  let formattedValue = "+7";
  if (value.length > 1) {
    formattedValue += " (" + value.slice(1, 4);
  }
  if (value.length >= 5) {
    formattedValue += ") " + value.slice(4, 7);
  }
  if (value.length >= 8) {
    formattedValue += "-" + value.slice(7, 9);
  }
  if (value.length >= 10) {
    formattedValue += "-" + value.slice(9, 11);
  }

  formattedValue = formattedValue.slice(0, 18);
  localValue.value = formattedValue;
};
</script>

<style scoped lang="scss">
.default {
  input {
    background-color: $white;
  }
}
.transparent {
  input {
    background-color: transparent;
    color: $white;
    border-color: $white;
    &::-webkit-input-placeholder {
      opacity: 0.7;
      color: $white;
    }
  }
}
input {
  border: 0.1rem solid $border;
  font-size: 1.6rem;
  color: $black;
  padding: 2rem 3rem;
  width: 100%;
  border-radius: 1rem;
  @include bp($point_2) {
    padding: 1.5rem 2rem;
    height: 4.6rem;
  }

  &:focus {
    border-color: $black;
  }

  &.error {
    border: 0.1rem solid $red;
    &::-webkit-input-placeholder {
      color: $red;
    }
  }
}

.input-message {
  color: $red;
  font-size: 1.2rem;
}
</style>
