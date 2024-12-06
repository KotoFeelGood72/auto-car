<template>
  <button
    :class="[
      'flex items-center justify-center gap-3 font-medium rounded-lg transition-all ',
      sizeClass,
      themeClass,
      customClass,
      { 'opacity-50 cursor-not-allowed': loading },
    ]"
    :disabled="loading"
  >
    <div v-if="loading" class="flex items-center justify-center">
      <Icon name="svg-spinners:ring-resize" :size="20" />
    </div>
    <span v-if="!loading">{{ name }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  name?: string;
  loading?: boolean;
  size: "small" | "normal" | "large";
  theme: "primary" | "gradient" | "default" | "secondary";
  customClass?: string;
}>();

// Маппинг размеров кнопки
const sizeClass = computed(() => {
  switch (props.size) {
    case "small":
      return "py-3 px-6 text-sm";
    case "large":
      return "py-5 px-8 text-lg";
    default:
      return "py-3 px-6 text-base";
  }
});

// Маппинг тем кнопки
const themeClass = computed(() => {
  switch (props.theme) {
    case "primary":
      return "bg-primary text-white hover:bg-primary hover:opacity-90";
    case "gradient":
      return "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-90";
    case "secondary":
      return "border bg-white text-primary border-primary  hover:bg-primary hover:text-white";
    case "default":
    default:
      return "border border-gray-300 text-gray-700 hover:bg-gray-100";
  }
});
</script>

<style scoped lang="scss"></style>
