<template>
  <div class="idpage">
    <section class="single py-10">
      <div class="container">
        <div>
          <h1 class="text-4xl font-semibold mb-4">Jetta VS7</h1>
        </div>
        <div class="grid grid-cols-2 gap-10 mb-20">
          <div>
            <UiGalleryCar class="sticky top-10 left-0" />
          </div>
          <div>
            <div class="flex-1 bg-primary text-white rounded-xl p-6 mb-5">
              <div class="flex items-start mb-10">
                <div class="flex flex-1 flex-col gap-2">
                  <div class="flex-grow mb-3">
                    <p class="text-lg font-semibold leading-6 mb-2">
                      Старая цена:
                    </p>
                    <span class="block line-through">1 140 000 ₽</span>
                  </div>
                  <div>
                    <p class="text-lg font-semibold leading-6">Цена:</p>
                    <span class="text-xxl font-medium">354 400 ₽</span>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="mb-5">
                    <p class="text-lg font-semibold leading-6 mb-2">
                      Ежемесячный платеж:
                    </p>
                    <span>от 2 690 ₽/мес.</span>
                  </div>
                  <div>
                    <p class="text-lg font-semibold leading-6 mb-2">
                      Особенности:
                    </p>
                    <span
                      >Двигатель 1.6 л., Комплектация Comfort'24, Цвет Белый
                      «Ледниковый» (221)</span
                    >
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3 mb-4">
                <btn
                  name="Заявка на Trade-in"
                  theme="secondary"
                  size="normal"
                  class="flex-1"
                  custom-class="!px-4 !py-4"
                />
                <btn
                  name="Специальное предложение"
                  theme="secondary"
                  size="normal"
                  class="flex-1"
                  custom-class="!px-4 !py-4"
                />
              </div>
              <btn
                name="Рассчитать автокредит от 1%"
                theme="secondary"
                size="normal"
                custom-class="w-full !px-4 !py-4"
              />
            </div>
            <div class="mb-10">
              <h3 class="text-lg font-medium mb-4">Модификации</h3>
              <ul class="flex items-center flex-wrap gap-5">
                <li v-for="card in cards" :key="card.id">
                  <RadioCard :card="card" v-model="selectedCard" />
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-medium mb-4">Комплектация</h3>
              <ul class="grid grid-cols-2 gap-3">
                <li v-for="card in complect" :key="card.id">
                  <CardComplect :data="card" v-model="selectedComplect" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mb-20">
          <h3 class="text-xxxl font-semibold mb-6">Галерея</h3>
          <Gallery
            :images="[
              { url: '/assets/img/cars/black.png', alt: 'Вид спереди' },
              { url: '/assets/img/cars/black.png', alt: 'Вид спереди' },
              { url: '/assets/img/cars/black.png', alt: 'Вид спереди' },
              { url: '/assets/img/cars/black.png', alt: 'Вид спереди' },
              { url: '/assets/img/cars/black.png', alt: 'Вид спереди' },
              { url: '/assets/img/cars/black.png', alt: 'Вид спереди' },
              { url: '/assets/img/cars/black.png', alt: 'Вид спереди' },
              { url: '/assets/img/cars/black.png', alt: 'Вид спереди' },
              { url: '/assets/img/cars/black.png', alt: 'Вид спереди' },
            ]"
          />
        </div>
        <Programs />
        <Slider class="mb-20" title="Акционные предложения" />
        <Credit class="mb-20" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import btn from "~/components/ui/btn.vue";
import RadioCard from "~/components/card/RadioCard.vue";
import CardComplect from "~/components/card/CardComplect.vue";
import Gallery from "~/components/shared/Gallery.vue";
import Credit from "~/components/shared/Credit.vue";
import Programs from "~/components/shared/Programs.vue";

const selectedCard = ref("");
const selectedComplect = ref("");
const cards = [
  {
    id: "1",
    name: "radio1",
    title: "1.6 л (90 л.с.), 5MT",
    price: "354 400",
    params: "1.6 л, 90 л.с., Бензин",
  },
  {
    id: "2",
    name: "radio1",
    title: "2.0 л (150 л.с.), 6AT",
    price: "500 000",
    params: "2.0 л, 150 л.с., Бензин",
  },
];

const complect = [
  {
    id: "comfort-21",
    name: "modification",
    title: "Comfort'24",
    price: 354400,
    monthlyPrice: 2690,
    features: [
      "Подушка безопасности водителя",
      "Подушка безопасности переднего пассажира",
      "Индикация незащегнутого ремня безопасности водителя",
      "Подголовники задних сидений 2 шт.",
      "Крепления для детских сидений ISOFIX",
      "Блокировка задних дверей от открывания детьми",
    ],
  },
  {
    id: "comfort-24",
    name: "modification",
    title: "Comfort'24",
    price: 354400,
    monthlyPrice: 2690,
    features: [
      "Подушка безопасности водителя",
      "Подушка безопасности переднего пассажира",
      "Индикация незащегнутого ремня безопасности водителя",
      "Подголовники задних сидений 2 шт.",
      "Крепления для детских сидений ISOFIX",
      "Блокировка задних дверей от открывания детьми",
    ],
  },
];
</script>
