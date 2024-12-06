<template>
  <section class="gos mb-20">
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
  </section>
</template>

<script setup lang="ts">
import ProgramsCard from "../card/ProgramsCard.vue";

const programs = [
  { title: "Семейный автомобиль", txt: "Госпрограмма" },
  { title: "Первый автомобиль", txt: "Госпрограмма" },
  { title: "Медицинский работник", txt: "Госпрограмма" },
];
</script>

<style scoped lang="scss"></style>
