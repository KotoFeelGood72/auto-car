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
    <Slider class="mb-20" title="Популярные модели" />
    <section class="form mb-20">
      <div class="container flex items-center gap-5">
        <div class="flex items-center justify-center">
          <img src="~/assets/img/forms.png" alt="Обратная связь" />
        </div>
        <div
          class="forms flex-col flex items-center justify-center flex-grow text-center border border-border rounded-[10px] p-10 bg-[#F2F2F2] min-h-[479px]"
        >
          <div class="mb-7">
            <h4 class="text-xxxl font-semibold mb-4">Не нашли свое авто</h4>
            <p>Оставь заявку - получи подбор!</p>
          </div>
          <div class="form-action w-full flex flex-col gap-7">
            <Inputs v-model="form.name" placeholder="Ваше Имя" type="text" />
            <Inputs
              v-model="form.phone"
              placeholder="+7 (___) ___-__-__"
              type="tel"
            />
            <btn name="Заказать звонок" size="large" theme="primary" />
          </div>
        </div>
      </div>
    </section>
    <Slider class="mb-20" title="Акционные предложения" />
    <Programs class="mb-20" />
    <Calc
      :brands="['Марка 1', 'Марка 2']"
      :models="{
        'Марка 1': [
          { name: 'Модель 1', price: 1000000, image: '/images/car1.png' },
          { name: 'Модель 2', price: 1200000, image: '/images/car2.png' },
        ],
        'Марка 2': [
          { name: 'Модель A', price: 900000, image: '/images/car3.png' },
          { name: 'Модель B', price: 950000, image: '/images/car4.png' },
        ],
      }"
      initialBrand="Марка 1"
      initialModel="Модель 1"
    />
    <!-- <section class="gos mb-20">
      <div class="container">
        <h4 class="text-4xl mb-10 font-semibold">Государственные программы</h4>
        <div class="flex items-center gap-10">
          <div class="flex flex-col gap-5 flex-grow">
            <ProgramsCard
              v-for="(item, i) in programs"
              :key="'programs-item-' + i"
              :card="item"
            />
          </div>
          <div>
            <h5 class="text-xxxl font-semibold mb-10">
              Преимущества <br />программы
            </h5>
            <ul class="flex flex-col gap-8">
              <li class="relative pl-7 max-w-52">
                <div
                  class="line absolute top-0 left-0 h-full w-2 bg-primary rounded-[10px]"
                ></div>
                <p class="text-minlg">
                  Автокредит <br /><b class="text-primary">от 7%</b>
                </p>
              </li>
              <li class="relative pl-7 max-w-52">
                <div
                  class="line absolute top-0 left-0 h-full w-2 bg-primary rounded-[10px]"
                ></div>
                <p class="text-minlg">Компенсация <br />проезда</p>
              </li>
              <li class="relative pl-7 max-w-52">
                <div
                  class="line absolute top-0 left-0 h-full w-2 bg-primary rounded-[10px]"
                ></div>
                <p class="text-minlg">
                  <b class="text-primary">5 лет</b> гарантии или <br /><b
                    class="text-primary"
                    >150 000</b
                  >
                  пробега
                </p>
              </li>
              <li class="relative pl-7 max-w-52">
                <div
                  class="line absolute top-0 left-0 h-full w-2 bg-primary rounded-[10px]"
                ></div>
                <p class="text-minlg">
                  <b class="text-primary">Кешбек 20%</b> на
                  <b class="text-primary">3</b> <br /><b class="text-primary"
                    >ТО</b
                  >
                  в подарок
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section> -->
    <section class="tradein mb-20">
      <div class="container">
        <h4 class="text-4xl font-semibold mb-10">TRADE - IN по новому!</h4>
        <div class="flex items-center gap-10 mb-10">
          <div class="border borde-border rounded-[10px] py-7 px-10">
            <div class="mb-6 flex flex-col gap-3">
              <h3 class="text-xxxl font-medium">Ваши преимущества:</h3>
              <p class="text-minlg">При использовании услуги</p>
            </div>
            <div class="flex items-center gap-5 mb-6">
              <div class="text-center border-r border-border pr-5">
                <p class="text-xxxl text-primary font-bold mb-1 leading-8">
                  300 000
                </p>
                <span class="text-txtGray">Выгода</span>
              </div>
              <div class="text-center border-r border-border pr-5">
                <p class="text-xxxl text-primary font-bold mb-1 leading-8">
                  КАСКО
                </p>
                <span class="text-txtGray">В подарок</span>
              </div>
              <div class="text-center">
                <p class="text-xxxl text-primary font-bold mb-1 leading-8">
                  БЕСПЛАТНО
                </p>
                <span class="text-txtGray">Оценка</span>
              </div>
            </div>
            <div class="mb-7 flex items-center justify-between gap-5">
              <Inputs
                v-model="form.name"
                placeholder="Ваше имя"
                class="w-full"
              />
              <Inputs
                class="w-full"
                v-model="form.phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <btn
              name="Заказать звонок"
              theme="primary"
              size="large"
              class="mb-4 w-full"
            />
            <p class="text-center">
              Нажимая на кнопку «Отправить», я даю согласие на обработку
              персональных данных
            </p>
          </div>
          <div class="flex items-center justify-center">
            <img src="~/assets/img/tradein.jpg" alt="Трейд ин" />
          </div>
        </div>
        <ul class="flex items-center justify-between gap-10">
          <li
            v-for="(item, i) in services"
            :key="'services-item-' + i"
            class="flex items-center gap-6"
          >
            <div
              class="ic w-16 h-16 flex items-center justify-center border border-primary rounded-[10px]"
            >
              <Icon :name="'f:' + item.icon" :size="35" />
            </div>
            <div>
              <p class="text-minlg mb-1">{{ item.title }}</p>
              <span class="text-txtGray max-w-44 block leading-5">{{
                item.txt
              }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <Credit />
  </div>
</template>

<script setup lang="ts">
import timer from "~/components/ui/timer.vue";
import btn from "~/components/ui/btn.vue";
import ModelsCard from "~/components/card/ModelsCard.vue";
import Slider from "~/components/slider/Slider.vue";
import Inputs from "~/components/ui/Inputs.vue";
import Calc from "~/components/shared/Calc.vue";
// import ProgramsCard from "~/components/card/ProgramsCard.vue";
import Credit from "~/components/shared/Credit.vue";
import Programs from "~/components/shared/Programs.vue";

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
