<template>
  <div class="home">
    <Hero />
    <Adv :adv="adv" />
    <ModelsGrid :models="brands" />
    <Slider title="Популярные модели авто" :cars="popularCars" id="popular" />
    <Action />
    <Slider
      title="Спецпредложения на покупку нового авто"
      :cars="promotionalCars"
      id="sales"
    />
    <Programs />
    <Trade :services="services" :topservices="topservices" />
    <Credit :credits="credits" />
  </div>
</template>

<script setup lang="ts">
import Credit from "../components/shared/Credit.vue";
import Slider from "../components/slider/Slider.vue";
import Programs from "../components/shared/Programs.vue";

// Blocks
import Hero from "../components/blocks/Hero.vue";
import Adv from "../components/blocks/Adv.vue";
import ModelsGrid from "../components/blocks/ModelsGrid.vue";
import Action from "../components/blocks/Action.vue";
import Trade from "../components/blocks/Trade.vue";
import { useCars } from "~/composables/useCars";
const { useGetAll, popularCars, promotionalCars, brands } = useCars();

const adv = [
  "Выгода до 20%<br/> на все модели",
  "Без первоначального<br/> взноса",
  "ТО или доп. оборудование<br/> в подарок",
];

const services = [
  {
    icon: "car",
    title: "Кэшбек на ТО",
    txt: "Кешбек при покупке в кредит",
  },
  { icon: "casco", title: "Каско", txt: "В подарок при покупки в кредит" },
  { icon: "cash", title: "Кешбек 100%", txt: "На 3 платежа по кредиту" },
  { icon: "card", title: "Топливная карта", txt: "В подарок на 3 полных бака" },
];
const topservices = [
  { title: "300 000", txt: "Выгода" },
  { title: "КАСКО", txt: "В подарок" },
  { title: "БЕСПЛАТНО", txt: "Оценка" },
];
const credits = [
  { title: "от 7%", txt: "Ставка по <br/>кредиту" },
  { title: "1 час", txt: "Рассмотрение <br/>заявки" },
  { title: "90%", txt: "Одобрение <br/>по кредиту" },
];

onMounted(() => {
  useGetAll(40);

  // useSeo({
  //   title:
  //     singleCar?.value?.title || "Автокар - Новые автомобили Geely в Москве",
  //   description:
  //     "Откройте для себя лучшие автомобили" +
  //     singleCar.value.model +
  //     " в автосалоне Автокар. Удобные условия покупки, кредит, тест-драйв в Москве.",
  //   keywords:
  //     singleCar.value.model +
  //     "," +
  //     "автосалон, Москва, новые автомобили, купить " +
  //     singleCar.value.model,
  //   image:
  //     singleCar.value.image || "https://autocarmsk.ru/assets/img/geely.jpg",
  //   url: "https://autocarmsk.ru" + formattedSlug.value,
  //   type: "article",
  //   schema: {
  //     "@context": "https://schema.org",
  //     "@type": "Product",
  //     name: singleCar.value.model + " - " + singleCar.value.brand || "",
  //     image:
  //       singleCar.value.image || "https://autocarmsk.ru/assets/img/geely.jpg",
  //     description:
  //       singleCar?.value?.title +
  //       " — современный кроссовер с продвинутыми функциями и высоким уровнем комфорта.",
  //     brand: {
  //       "@type": singleCar.value.brand,
  //       name: singleCar.value.model,
  //     },
  //     offers: {
  //       "@type": "Offer",
  //       priceCurrency: "RUB",
  //       price: singleCar.value.priceNew || "Цена не указана",
  //       itemCondition: "https://schema.org/NewCondition",
  //       availability: "https://schema.org/InStock",
  //       url: "https://autocarmsk.ru" + formattedSlug.value,
  //     },
  //   },
  // });
});
</script>

<style scoped lang="scss"></style>
