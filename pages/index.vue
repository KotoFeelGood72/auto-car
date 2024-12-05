<template>
  <div class="home">
    <section
      class="hero bg-[url('~/assets/img/hero.jpg')] bg-center bg-cover text-white pt-14"
    >
      <div class="container">
        <div class="max-w-[675px]">
          <h1 class="text-white text-3xl font-bold uppercase mb-3">
            НОВЫЕ АВТОМОБИЛИ В МОСКВЕ ВЫГОДА ДО 600 000 ₽
          </h1>
          <h2
            class="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text max-w-[426px] mb-5 leading-10"
          >
            Кредит от 7% + подарки от салона
          </h2>
          <btn
            name="Зафиксировать выгоду"
            theme="gradient"
            size="large"
            class="mb-9"
          />
          <timer />
        </div>
      </div>
    </section>
    <section class="mb-20 adv mt-[-4rem]">
      <div class="container">
        <div class="adv_list flex items-center gap-5">
          <div
            v-for="(item, i) in adv"
            :key="'adv-item-' + i"
            class="relative bg-primary py-6 px-8 text-white text-xl rounded-[10px] group overflow-hidden cursor-pointer"
          >
            <p class="font-medium">{{ item }}</p>
            <div
              class="absolute bottom-[0] right-0 w-full h-[10px] rounded-tl-[10px] bg-blue-400 group-hover:bg-blue-500 transition-all max-w-[70%]"
            ></div>
            <div
              class="flex items-center justify-center absolute top-4 right-4 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            >
              <Icon name="fluent:chevron-right-28-regular" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="models mb-20">
      <div class="container">
        <div class="flex items-center gap-10">
          <h3 class="text-4xl font-semibold mb-10">Марки автомобилей</h3>
        </div>
        <div class="flex items-center justify-start gap-5 flex-wrap">
          <ModelsCard
            v-for="(item, i) in models"
            :key="'models-item-' + i"
            :card="item"
          />
        </div>
      </div>
    </section>
    <Slider class="mb-20" />
    <section class="form">
      <div class="container">
        <div>
          <img src="~/assets/img/forms.png" alt="" />
        </div>
        <div class="forms">
          <div>
            <h4>Не нашли свое авто</h4>
            <p>Оставь заявку - получи подбор!</p>
          </div>
          <div class="form-action">
            <Inputs v-model="form.name" placeholder="Ваше Имя" type="text" />
            <Inputs
              v-model="form.phone"
              placeholder="+7 (___) ___-__-__"
              type="tel"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import timer from "~/components/ui/timer.vue";
import btn from "~/components/ui/btn.vue";
import ModelsCard from "~/components/card/ModelsCard.vue";
import Slider from "~/components/slider/Slider.vue";
import Inputs from "~/components/ui/Inputs.vue";

const adv = [
  "Выгода до 600 000 ₽ на все модели",
  "Без первоначального взноса",
  "ТО или доп. оборудование в подарок",
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
