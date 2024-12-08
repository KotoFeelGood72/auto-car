<template>
  <div class="idpage">
    <section class="single">
      <div class="section_in">
        <heading title="Jetta VS7" :level="2" :size="42" class="title" />
        <div class="row-top">
          <div class="gallery-column">
            <GalleryCar />
          </div>
          <div class="content-column">
            <div class="card">
              <div class="card-row">
                <div class="prices">
                  <ul>
                    <li>
                      <p>Старая цена:</p>
                      <span>1 920 000 ₽</span>
                    </li>
                    <li>
                      <p>Цена:</p>
                      <span>1 152 000 ₽</span>
                    </li>
                  </ul>
                </div>
                <div class="info">
                  <ul>
                    <li>
                      <p>Ежемесячный платеж:</p>
                      <span>от 8 744 ₽/мес.</span>
                    </li>
                    <li>
                      <p>Особенности:</p>
                      <span
                        >Двигатель 1.5 л., Комплектация Action MT, Цвет
                        Искрящийся белый</span
                      >
                    </li>
                  </ul>
                </div>
                <div class="card-buttons">
                  <btn
                    size="normal"
                    styles="primary"
                    color="white"
                    name="Заявка на TRADE-IN"
                  />
                  <btn
                    size="normal"
                    styles="secondary"
                    color="white"
                    name="Специальное предложение"
                  />
                  <btn
                    size="normal"
                    styles="primary"
                    color="white"
                    name="Рассчитать автокредит от 1%"
                  />
                </div>
              </div>
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
        <div class="xl:mb-20 lg:mb-10">
          <h3 class="xl:text-xxxl font-semibold mb-6 lg:text-xxl">Галерея</h3>
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
        <Slider title="Акционные предложения" />
        <!-- <Credit /> -->
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import btn from "~/components/ui/btn.vue";
import RadioCard from "~/components/card/RadioCard.vue";
import CardComplect from "~/components/card/CardComplect.vue";
import Gallery from "~/components/shared/Gallery.vue";
import GalleryCar from "~/components/ui/GalleryCar.vue";
import Credit from "~/components/shared/Credit.vue";
import Programs from "~/components/shared/Programs.vue";
import heading from "~/components/ui/heading.vue";

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
