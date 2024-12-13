<template>
  <section class="models mb-8">
    <div class="section_in">
      <heading
        :title="'АВТОМОБИЛИ ' + isCar + ' В МОСКВЕ'"
        :size="42"
        class="title"
        style="text-transform: uppercase"
      />
      <div class="grid" ref="gridContainer">
        <div
          v-for="(item, i) in models"
          :key="'models-item-' + i"
          :data-brand="item"
          class="model-item"
        >
          <ModelsCard :card="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
import ModelsCard from "../card/ModelsCard.vue";
import heading from "../ui/heading.vue";

const props = defineProps<{
  models: string[]; // Предполагаем, что `models` — это массив строк
}>();

const route = useRoute();
const gridContainer = ref<HTMLElement | null>(null);

const isCar = computed(() => route.params.brand || "");

// Прокрутка к активному элементу
const scrollToActiveElement = async () => {
  if (!gridContainer.value) {
    return;
  }

  await nextTick();

  const activeElement = gridContainer.value.querySelector(
    `.model-item[data-brand="${isCar.value}"]`
  ) as HTMLElement | null;

  if (activeElement) {
    activeElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  } else {
  }
};

// Следим за изменением данных и `isCar`
watch(
  () => props.models,
  (newModels) => {
    if (newModels.length > 0) {
      scrollToActiveElement();
    } else {
    }
  },
  { immediate: true, deep: true }
);

// Следим за изменением `isCar`
watch(isCar, scrollToActiveElement, { immediate: false });

onMounted(() => {
  if (props.models.length > 0) {
    scrollToActiveElement();
  } else {
  }
});
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 4rem;
  @include bp($point_2) {
    margin-bottom: 2rem;
  }
}

.grid {
  @include flex-start;
  gap: 2.1rem;
  flex-wrap: wrap;

  @include bp($point_2) {
    padding-bottom: 1rem;
    overflow-x: scroll;
    flex-wrap: nowrap;
    gap: 0.8rem;
    padding: 0 2rem 1.5rem 2rem;
  }
}

// .model-item:first-child {
//   margin-left: 2rem;
// }
// .model-item:last-child {
//   margin-left: 2rem;
// }

.models {
  .section_in {
    @include bp($point_2) {
      padding: 0;
    }
  }
  .heading-42 {
    @include bp($point_2) {
      padding: 0 2rem;
    }
  }
  @include bp($point_2) {
    margin-bottom: 2rem;
  }
}
</style>
