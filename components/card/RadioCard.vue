<template>
  <div class="card-check">
    <input
      type="radio"
      :id="card.id"
      :name="card.name"
      :value="card"
      v-model="selectedValue"
    />
    <label :for="card.id">
      <div class="card">
        <div class="icon">
          <Icon name="ep:check" :size="22" />
        </div>
        <heading :title="card.title" :level="5" :size="24" />
        <heading :title="'от ' + card.price + ' ₽'" :level="4" :size="20" />
        <p class="text">
          {{ card.params }}
        </p>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import heading from "../ui/heading.vue";
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

<style lang="scss" scoped>
.card-check {
  input {
    display: none;
    &:checked + label {
      background-color: #f3f3f3;
      .icon {
        span {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }

  label {
    cursor: pointer;
    position: relative;
    padding: 1.5rem 2rem 1.5rem 6rem;
    border-radius: 1rem;
    @include flex-start;
    user-select: none;
  }
  :deep(h4) {
    font-weight: 600;
    margin-bottom: 1rem;
  }
}

.icon {
  position: absolute;
  top: 2rem;
  left: 1rem;
  width: 4rem;
  height: 4rem;
  @include flex-center;
  border-radius: 100%;
  border: 0.1rem solid $primary;
  color: $primary;
  span {
    opacity: 0;
    visibility: hidden;
  }
}

:deep(h5) {
  margin-bottom: 0.5rem;
}
</style>
