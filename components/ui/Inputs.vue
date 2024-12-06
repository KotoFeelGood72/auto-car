<template>
  <div>
    <div class="relative">
      <input
        :type="type"
        v-model="localValue"
        :placeholder="placeholder"
        :class="[
          'block w-full py-4 px-6 border rounded-lg focus:outline-none focus:ring-2 text-minlg bg-white',
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: any;
  type?: "text" | "tel";
  placeholder: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
</script>

<style scoped></style>
