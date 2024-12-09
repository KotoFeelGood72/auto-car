<template>
  <div class="gallery mb-8">
    <a
      class="gallery-item"
      v-if="images.length > 0"
      :href="images[0].url"
      data-fancybox="gallery"
    >
      <img :src="images[0].url" :alt="images[0].alt || 'Картинка 1'" />
    </a>
    <template v-for="(image, index) in images.slice(1, -1)" :key="index">
      <a :href="image.url" class="gallery-item" data-fancybox="gallery">
        <img :src="image.url" :alt="image.alt || `Изображение ${index + 2}`" />
      </a>
    </template>
    <a
      v-if="images.length > 1"
      :href="images[images.length - 1].url"
      class="gallery-item"
      data-fancybox="gallery"
    >
      <img
        :src="images[images.length - 1].url"
        :alt="images[images.length - 1].alt || 'Открыть галерею'"
      />
      <div class="open-gallery">Открыть галерею</div>
    </a>
  </div>
</template>

<script setup lang="ts">
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";
Fancybox.bind("[data-fancybox]", {});
defineProps<{
  images: { url: string; alt?: string }[];
}>();
</script>

<style lang="scss" scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
}

.gallery-item:first-child {
  grid-column: 2 span;
  grid-row: 2 span;
}

.gallery-item {
  box-shadow: 0 0 2rem 0 #30303015;
  border-radius: 1rem;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  position: relative;

  &:last-child {
    position: relative;
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      content: "";
      opacity: 0.4;
    }
  }
  &:hover {
    box-shadow: 0 0.5rem 3rem 0 #30303027;
  }
}

.open-gallery {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $white;
  font-size: 2rem;
  font-weight: 500;
}
</style>
