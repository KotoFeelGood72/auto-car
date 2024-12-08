<template>
  <div :class="['input__w', theme]">
    <div class="row">
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="localValue"
        :class="{ error: error }"
      />
    </div>
    <span v-if="error" class="input-message">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, watch } from "vue";

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    message?: string;
    error?: boolean;
    modelValue: any;
    theme?: "default" | "transparent";
  }>(),
  {
    type: "text",
    placeholder: "placeholder",
    message: "",
    error: false,
    modelValue: "",
    theme: "default",
  }
);

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
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
  @include app;
  border: 0.1rem solid $border;
  font-size: 1.6rem;
  color: $black;
  padding: 2rem 3rem;
  width: 100%;
  border-radius: 1rem;

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
