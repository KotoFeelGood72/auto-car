<template>
  <div class="mb-4">
    <div class="relative">
      <input
        :type="type"
        v-model="localValue"
        :placeholder="placeholder"
        :class="[
          'block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2',
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  type: "text" | "tel";
  placeholder: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped></style>
