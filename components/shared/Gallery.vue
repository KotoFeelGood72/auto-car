<template>
  <div class="gallery mb-8">
    <!-- Первое изображение -->
    <a
      class="gallery-item"
      v-if="imagesToShow.length > 0"
      :href="imagesToShow[0].fullImage"
      data-fancybox="gallery"
    >
      <img
        :src="imagesToShow[0].fullImage"
        :alt="imagesToShow[0].alt || 'Картинка 1'"
      />
    </a>

    <!-- Последующие изображения (со 2-го по 8-е) -->
    <template v-for="(image, index) in imagesToShow.slice(1, 8)" :key="index">
      <a :href="image.fullImage" class="gallery-item" data-fancybox="gallery">
        <img
          :src="image.fullImage"
          :alt="image.alt || `Изображение ${index + 2}`"
        />
      </a>
    </template>

    <!-- Последнее изображение с кнопкой "Открыть галерею" -->
    <a
      v-if="images.length > 9"
      href="javascript:void(0);"
      class="gallery-item open-gallery-button"
      @click="openFullGallery"
    >
      <img
        :src="images[8].fullImage"
        :alt="images[8].alt || 'Открыть галерею'"
      />
      <div class="open-gallery">Открыть галерею</div>
    </a>
  </div>
</template>

<script setup lang="ts">
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";
Fancybox.bind("[data-fancybox]", {});

const props = defineProps<{
  images: any;
}>();

// Отображаем первые 9 изображений для галереи
const imagesToShow = computed(() => props.images.slice(0, 9));

// Функция для открытия полной галереи
const openFullGallery = () => {
  Fancybox.show(
    props.images.map((image: any) => ({
      src: image.fullImage,
      type: "image",
      opts: {
        caption: image.alt || "Изображение",
      },
    }))
  );
};
</script>

<style lang="scss" scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

  @include bp($point_2) {
    grid-gap: 0.5rem;
  }
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
  @include bp($point_2) {
    border-radius: 0.3rem;
  }

  &:last-child {
    position: relative;

    grid-row: auto;
    max-height: 30rem;
    img {
      object-fit: cover;
    }
    @include bp($point_2) {
      height: 20rem;
    }
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
  cursor: pointer;
}
</style>
