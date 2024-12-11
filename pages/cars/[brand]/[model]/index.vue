<template>
  <div class="idpage" v-if="singleCar">
    <section class="single">
      <div class="section_in">
        <heading
          :title="singleCar?.title || 'Машина'"
          :level="2"
          :size="42"
          class="title"
        />
        <div class="row-top mb-8">
          <div class="gallery-column">
            <GalleryCar
              :colors="singleCar.colors"
              :price="singleCar.saleBlock"
            />
          </div>
          <div class="content-column">
            <div class="card">
              <div class="card-row">
                <div class="prices">
                  <ul>
                    <li>
                      <p>Старая цена:</p>
                      <span>{{ singleCar?.priceOld }} ₽</span>
                    </li>
                    <li>
                      <p>Цена:</p>
                      <span>{{ singleCar?.priceNew }} ₽</span>
                    </li>
                  </ul>
                </div>
                <div class="info">
                  <ul>
                    <li>
                      <p>Ежемесячный платеж:</p>
                      <span>от {{ singleCar?.monthlyPayment }} ₽/мес.</span>
                    </li>
                    <li>
                      <p>Особенности:</p>
                      <span>{{ featuresFormatted }}</span>
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
                    @click.prevent="
                      openModal('car', {
                        img: singleCar?.image,
                        title: 'Заявка на TRADE-IN',
                        name: singleCar?.title,
                      })
                    "
                  />
                  <btn
                    size="large"
                    styles="secondary"
                    color="white"
                    :weight="true"
                    name="Специальное предложение"
                    @click.prevent="
                      openModal('car', {
                        img: singleCar?.image,
                        title: 'Специальное предложение',
                        name: singleCar?.title,
                      })
                    "
                  />
                  <btn
                    size="large"
                    styles="primary"
                    color="white"
                    :weight="true"
                    name="Рассчитать автокредит от 1%"
                    :full="true"
                    @click="scrollDown"
                  />
                </div>
              </div>
            </div>
            <div class="modes" v-if="singleCar?.modifications?.length">
              <heading
                title="Модификации"
                :level="4"
                :size="24"
                class="subtitle"
              />
              <div
                class="modes-list"
                :class="[
                  'modes-list',
                  'modes-grid-' + singleCar?.modifications?.length,
                ]"
              >
                <ModeCard
                  v-for="(item, i) in singleCar.modifications"
                  :key="'mode-item-' + i"
                  :card="item"
                />
              </div>
            </div>
            <div class="modes" v-if="singleCar?.modifications?.length">
              <heading
                title="Комплектация"
                :level="4"
                :size="24"
                class="subtitle"
              />
              <div class="modes-list">
                <ModeCard
                  v-for="(item, i) in singleCar.modifications"
                  :key="'mode-item-' + i"
                  :features="singleCar.features"
                  :card="item"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="gallery_single" v-if="singleCar?.gallery?.length">
          <heading title="Галерея" :level="2" :size="42" class="subtitle" />
          <Gallery :images="singleCar.gallery" />
        </div>
        <Credit :credits="credits" />
        <Calc :car="singleCar" id="calc-car" />
        <Programs />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Credit from "~/components/shared/Credit.vue";
import btn from "~/components/ui/btn.vue";
import Gallery from "~/components/shared/Gallery.vue";
import GalleryCar from "~/components/ui/GalleryCar.vue";
import Programs from "~/components/shared/Programs.vue";
import heading from "~/components/ui/heading.vue";
import Calc from "~/components/shared/Calc.vue";
import ModeCard from "~/components/card/ModeCard.vue";
import { useModalStore } from "~/stores/useModalStore";
import { useCars } from "~/composables/useCars";
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";

const { openModal } = useModalStore();
const { useGetCarBySlug, singleCar } = useCars();

const route = useRoute();
const data = ref<any>(null);

// Форматирование особенностей
const featuresFormatted = computed(
  () => data.value?.features?.join(", ") || "Нет данных"
);

const scrollDown = () => {
  const calcSection = document.querySelector("#calc-car"); // Укажите правильный селектор
  if (calcSection) {
    calcSection.scrollIntoView({ behavior: "smooth" });
  }
};

const credits = [
  { title: "от 1%", txt: "Ставка по <br/>кредиту" },
  { title: "1 час", txt: "Рассмотрение <br/>заявки" },
  { title: "90%", txt: "Одобрение <br/>по кредиту" },
];

// Загружаем данные машины по слагу
onMounted(async () => {
  const slug = `${route.path}/${route.params.model}`;
  await useGetCarBySlug(slug);
});
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
  @include bp($point_2) {
    flex-direction: column;
  }
}

.card {
  background-color: $primary;
  padding: 4rem;
  border-radius: 1rem;
  color: $white;
  max-width: 65rem;
  @include bp($point_2) {
    max-width: 100%;
  }
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
  li {
    flex-grow: 1;
  }
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
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.gallery-column {
  position: sticky;
  top: 3rem;
  left: 0;
  @include bp($point_2) {
    position: static;
  }
}

.modes {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modes-grid-1 {
}
.modes-grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  grid-gap: 2rem;
}
</style>
