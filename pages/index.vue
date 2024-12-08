<template>
  <div class="home">
    <Hero />
    <Adv :adv="adv" />
    <ModelsGrid :models="models" />
    <Slider title="Популярные модели" />
    <Action />
    <Slider title="Акционные предложения" />
    <Programs />
    <Trade :services="services" :topservices="topservices" />
    <Credit :credits="credits" />
  </div>
</template>

<script setup lang="ts">
import Slider from "~/components/slider/Slider.vue";
import Credit from "~/components/shared/Credit.vue";
import Programs from "~/components/shared/Programs.vue";
import { useModalStore } from "~/stores/useModalStore";

// Blocks
import Hero from "~/components/blocks/Hero.vue";
import Adv from "~/components/blocks/Adv.vue";
import ModelsGrid from "~/components/blocks/ModelsGrid.vue";
import Action from "~/components/blocks/Action.vue";
import Trade from "~/components/blocks/Trade.vue";

const { openModal } = useModalStore();

const adv = [
  "Выгода до 600 000 ₽ на все модели",
  "Без первоначального взноса",
  "ТО или доп. оборудование в подарок",
];

const services = [
  { icon: "car", title: "20% на 3 ТО", txt: "Кешбек при покупке в кредит" },
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
  { title: "от 1%", txt: "Ставка по <br/>кредиту" },
  { title: "1 час", txt: "Рассмотрение <br/>заявки" },
  { title: "90%", txt: "Одобрение <br/>по кредиту" },
];

const models = [
  { img: "baic", name: "BAIC", link: "" },
  { img: "belgee", name: "Belgee", link: "" },
  { img: "changan", name: "Changan", link: "" },
  { img: "chery", name: "Chery", link: "" },
  { img: "jac", name: "JAC", link: "" },
  { img: "haval", name: "HAVAL", link: "" },
  { img: "exeed", name: "EXEED", link: "" },
  { img: "uaz", name: "УАЗ", link: "" },
  { img: "gac", name: "GAC", link: "" },
  { img: "geely", name: "Geely", link: "" },
  { img: "hyundai", name: "Hyundai", link: "" },
  { img: "omoda", name: "OMODA", link: "" },
  { img: "jetour", name: "Jetour", link: "" },
  { img: "moscow", name: "МОСКВИЧ", link: "" },
  { img: "kayi", name: "KAIYI", link: "" },
  { img: "ki", name: "KIA", link: "" },
  { img: "lada", name: "Lada", link: "" },
  { img: "skoda", name: "SKODA", link: "" },
  { img: "jaecoo", name: "Jaecoo", link: "" },
  { img: "mitsubishi", name: "Mitsubishi", link: "" },
  { img: "renault", name: "Renault", link: "" },
  { img: "jetta", name: "Jetta", link: "" },
  { img: "tank", name: "Tank", link: "" },
  { img: "ww", name: "Volkswagen", link: "" },
];

const form = ref<any>({
  name: "",
  tel: "",
});
</script>

<style scoped lang="scss"></style>
