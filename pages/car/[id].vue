<template>
  <div class="idpage">
    <section class="single">
      <div class="section_in">
        <heading title="Jetta VS7" :level="2" :size="42" class="title" />
        <div class="row-top mb-8">
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
                    size="large"
                    styles="primary"
                    color="white"
                    :weight="true"
                    name="Заявка на TRADE-IN"
                  />
                  <btn
                    size="large"
                    styles="secondary"
                    color="white"
                    :weight="true"
                    name="Специальное предложение"
                  />
                  <btn
                    size="large"
                    styles="primary"
                    color="white"
                    :weight="true"
                    name="Рассчитать автокредит от 1%"
                    :full="true"
                  />
                </div>
              </div>
            </div>
            <div class="mode">
              <heading
                title="Модификации"
                :level="4"
                :size="24"
                class="subtitle"
              />
              <ul class="grid-list">
                <li v-for="card in cards" :key="card.id">
                  <RadioCard :card="card" v-model="selectedCard" />
                </li>
              </ul>
            </div>
            <div class="complects">
              <heading
                title="Комплектация"
                :level="4"
                :size="24"
                class="subtitle"
              />
              <ul class="grid-list">
                <li v-for="card in complect" :key="card.id">
                  <CardComplect :data="card" v-model="selectedComplect" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="gallery_single">
          <heading title="Галерея" :level="2" :size="42" class="subtitle" />
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
        <Calc :credits="credits" />
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
import Calc from "~/components/shared/Calc.vue";

const credits = [
  { title: "от 1%", txt: "Ставка по <br/>кредиту" },
  { title: "1 час", txt: "Рассмотрение <br/>заявки" },
  { title: "90%", txt: "Одобрение <br/>по кредиту" },
];

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
const selectedCard = ref(cards[0]);
const selectedComplect = ref(complect[0]?.id);
</script>

<style lang="scss" scoped>
.single {
  padding: 5rem 0 0 0;
}

.gallery_single {
  :deep(h2) {
    margin-bottom: 4rem;
  }
}
.row-top {
  @include flex-start;
  align-items: flex-start;
  gap: 5rem;
  padding-top: 3rem;
}

.card {
  background-color: $primary;
  padding: 4rem;
  border-radius: 1rem;
  color: $white;
  max-width: 65rem;
  margin-bottom: 3rem;
}

.card-row {
  @include flex-start;
  flex-wrap: wrap;
  gap: 4rem;
  align-items: flex-start;
}

.prices,
.info {
  max-width: 45%;
  flex-grow: 1;
}

.prices {
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  p {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  span {
    font-size: 3.2rem;
    font-weight: 600;
  }
  li {
    &:first-child {
      span {
        font-size: 1.6rem;
        text-decoration: line-through;
        opacity: 0.7;
      }
    }
  }
}
.info {
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  p {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  span {
    font-size: 1.6rem;
  }
}

.card-buttons {
  @include flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  :deep(.btn) {
    flex-grow: 1;
  }
}

.grid-list {
  @include flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
}

.mode {
  &:deep(h4) {
    margin-bottom: 2rem;
  }
}
.complects {
  &:deep(h4) {
    margin-bottom: 2rem;
  }

  .grid-list {
    li {
      flex-grow: 1;
    }
  }
}

.content-column {
  max-width: 65rem;
}

.gallery-column {
  position: sticky;
  top: 3rem;
  left: 0;
}
</style>
