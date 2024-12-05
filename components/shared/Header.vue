<template>
  <header>
    <div class="container py-5 flex items-center justify-between">
      <div class="flex items-center gap-6">
        <UiLogo />
        <div class="max-w-36">
          <img src="~/assets/img/yandex.png" alt="Яндекс рейтинг" />
        </div>
      </div>
      <div class="flex items-center gap-5">
        <div>
          <a href="#" class="flex items-center gap-2">
            <div class="flex items-center justify-center">
              <Icon name="f:phone" :size="25" />
            </div>
            <p class="text-xxl font-semibold">+7 (495) 021 31 19</p>
          </a>
          <span class="flex items-end justify-end"
            >Без выходных с 10 до 22ч</span
          >
        </div>
        <btn name="Заказать звонок" size="large" theme="default" />
      </div>
    </div>
    <div class="bg-black flex items-center justify-between">
      <div class="container flex items-center justify-between">
        <nav class="gap-10 flex items-center">
          <NuxtLink
            v-for="(item, i) in nav"
            :key="'main-nav-' + i"
            :to="item.link"
            class="text-white text-lg font-light py-5"
            >{{ item.name }}</NuxtLink
          >
        </nav>
        <nav class="flex items-center gap-10">
          <NuxtLink
            class="text-white text-lg font-light flex items-center gap-2"
            v-for="(item, i) in other"
            :key="'other-nav-' + i"
            :to="item.link"
          >
            <div class="flex items-center justify-center">
              <Icon name="f:flame" />
            </div>
            <p>{{ item.name }}</p>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";

const nav = [
  { name: "Авто в наличии", link: "" },
  { name: "Акции", link: "" },
  { name: "Отзывы", link: "" },
  { name: "Контакты", link: "" },
];
const other = [
  { name: "Автокредит", link: "" },
  { name: "Trade-In", link: "" },
];
</script>

<style scoped lang="scss"></style>
