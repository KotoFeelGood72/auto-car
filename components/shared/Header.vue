<template>
  <header :class="['header', { sticky: isSticky }]">
    <div class="section_in">
      <div class="row top-row">
        <div class="col">
          <Logo />
          <div class="stars">
            <img src="~/assets/img/stars.svg" alt="Яндекс рейтинг" />
          </div>
        </div>
        <div class="col">
          <div class="contact">
            <a href="#" class="phone">
              <div class="phone-icon">
                <Icon name="f:phone" :size="20" />
              </div>
              <heading title="+7 (495) 021 31 19" :level="2" :size="24" />
            </a>
            <span class="timework">Без выходных с 10 до 22ч</span>
          </div>
          <btn
            name="Заказать звонок"
            size="large"
            styles="secondary"
            color="dark"
            @click="openModal('call')"
            class="header_btn"
          />
          <div class="burger" @click="openModal('burger')">
            <Icon name="iconamoon:menu-burger-horizontal-light" :size="40" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="section_in">
        <div class="row">
          <nav>
            <NuxtLink
              v-for="(item, i) in nav"
              :key="'main-nav-' + i"
              :to="item.link"
              >{{ item.name }}</NuxtLink
            >
          </nav>
          <nav>
            <NuxtLink
              v-for="(item, i) in other"
              :key="'other-nav-' + i"
              :to="item.link"
            >
              <div class="nav-icon">
                <Icon name="f:flame" :size="20" />
              </div>
              <p>{{ item.name }}</p>
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";
import Logo from "../ui/Logo.vue";
import heading from "../ui/heading.vue";
import { useModalStore } from "~/stores/useModalStore";

const { openModal } = useModalStore();

const nav = [
  { name: "Авто в наличии", link: "/" },
  { name: "Акции", link: "/" },
  { name: "Отзывы", link: "/" },
  { name: "Контакты", link: "/" },
];
const other = [
  { name: "Автокредит", link: "/" },
  { name: "Trade-In", link: "/" },
];

const isSticky = ref(false);

const handleScroll = () => {
  isSticky.value = window.scrollY > 50; // Если прокрутка больше 50px, добавляем класс
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
.row,
.col {
  @include flex-space;
}
.top-row {
  padding: 2rem 0;
  @include bp($point_2) {
    padding: 1rem 0;
  }
}
.col {
  gap: 3rem;
}

.burger {
  @include flex-center;
  @include bp($point_2, $direction: min) {
    display: none;
  }
}

.phone {
  @include flex-start;
  gap: 1rem;
  @include bp($point_2) {
    display: none;
  }
}

.timework {
  @include flex-end;
  text-align: right;
  @include bp($point_2) {
    display: none;
  }
}

.contact {
  @include flex-end;
  flex-direction: column;
  align-items: flex-end;
}

.stars {
  max-width: 15.4rem;
  @include bp($point_2) {
    display: none;
  }
}
.bottom {
  background-color: $black;
  color: $white;
  @include bp($point_2) {
    display: none;
  }
  a {
    color: inherit;
    font-size: 2rem;
    font-family: $font_1;
    @include flex-start;
    gap: 1.5rem;
    padding: 1.5rem 0;
  }
}

nav {
  @include flex-start;
  gap: 5.2rem;
}

.nav-icon {
  @include flex-center;
}

.header {
  width: 100%;
  background-color: $white;
  z-index: 99;

  transition: all 0.3s ease-in-out;

  &.sticky {
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>
