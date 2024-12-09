<template>
  <div class="card-check">
    <div>
      <input
        type="radio"
        :id="data.id"
        :name="data.name"
        :value="data.id"
        v-model="selectedValue"
      />

      <label :for="data.id">
        <div class="icon">
          <Icon name="ep:check" :size="22" />
        </div>
        <div class="col">
          <heading :title="data.title" :level="5" :size="24" class="title" />
          <heading
            :title="'от ' + data.price"
            :level="5"
            :size="20"
            class="subtitle"
          />
          <heading
            :title="'от ' + data.monthlyPrice + ' ₽ / мес.'"
            :level="5"
            :size="16"
            class="text"
          />
        </div>
        <ul class="col-list">
          <li v-for="(feature, index) in data.features" :key="index">
            {{ feature }}
          </li>
          <li v-for="(feature, index) in data.features" :key="index">
            {{ feature }}
          </li>
        </ul>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import heading from "../ui/heading.vue";
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

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
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
    padding: 1.5rem 2rem 1.5rem 7rem;
    border-radius: 1rem;
    @include flex-start;
    align-items: flex-start;
    gap: 3rem;
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

.col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.5rem;
}

.title {
  font-weight: 600;
  color: $primary;
}
.subtitle {
  font-weight: 600;
}
.text {
  opacity: 0.4;
  font-weight: 500;
}

.col-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.8rem;
  max-height: 20rem;
  overflow-y: auto;
  padding-right: 3rem;
  li {
    position: relative;
    padding-left: 2rem;
    &:before {
      content: "";
      position: absolute;
      top: 0.7rem;
      left: 0;
      width: 1rem;
      height: 1rem;
      background-color: $border;
      border-radius: 2rem;
    }
  }
}

.col-list::-webkit-scrollbar {
  width: 0.6rem; /* Ширина скролла */
}

.col-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.116); /* Цвет ползунка */
  border-radius: 0.4rem; /* Закругление */
}

.col-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.2); /* Цвет ползунка при наведении */
}

.col-list::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.055); /* Цвет трека */
  border-radius: 0.4rem;
}
</style>
