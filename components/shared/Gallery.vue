<template>
  <div class="gallery grid grid-cols-4 gap-4">
    <!-- Первая крупная картинка -->
    <a
      v-if="images.length > 0"
      :href="images[0].url"
      data-fancybox="gallery"
      class="relative col-span-2 row-span-2 overflow-hidden rounded-lg border border-border"
    >
      <img
        :src="images[0].url"
        :alt="images[0].alt || 'Картинка 1'"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
    </a>

    <!-- Оставшиеся картинки -->
    <template v-for="(image, index) in images.slice(1, -1)" :key="index">
      <a
        :href="image.url"
        data-fancybox="gallery"
        class="relative overflow-hidden rounded-lg border border-border"
      >
        <img
          :src="image.url"
          :alt="image.alt || `Изображение ${index + 2}`"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </a>
    </template>

    <!-- Оверлей для последней картинки -->
    <a
      v-if="images.length > 1"
      :href="images[images.length - 1].url"
      data-fancybox="gallery"
      class="relative overflow-hidden rounded-lg border border-border"
    >
      <img
        :src="images[images.length - 1].url"
        :alt="images[images.length - 1].alt || 'Открыть галерею'"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
      <div
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-lg font-semibold xl:text-minlg"
      >
        Открыть галерею
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

// Подключение Fancybox
Fancybox.bind("[data-fancybox]", {});

// Принимаем массив картинок через пропсы
const props = defineProps<{
  images: { url: string; alt?: string }[];
}>();
</script>
