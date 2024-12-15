<template>
  <div class="burger">
    <closeBtn />
    <Logo class="logo-burger" />
    <nav>
      <NuxtLink
        v-for="(item, i) in nav"
        :key="'burger-nav-item' + i"
        :to="item.link"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>
    <div class="stars">
      <img src="~/assets/img/stars.svg" alt="Яндекс рейтинг" />
    </div>
    <div class="col">
      <div class="contact">
        <a href="#" class="phone">
          <div class="phone-icon">
            <Icon name="f:phone" :size="20" />
          </div>
          <heading title="+7 (499) 289-87-21" :level="2" :size="24" />
        </a>
        <span class="timework">Без выходных с 08 до 20ч</span>
      </div>
      <btn
        name="Заказать звонок"
        size="large"
        styles="secondary"
        color="dark"
        @click="openModal('call')"
        class="header_btn"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "../ui/Logo.vue";
import { useModalStore } from "~/stores/useModalStore";
import btn from "../ui/btn.vue";
import heading from "../ui/heading.vue";
import closeBtn from "../ui/buttons/close-btn.vue";

const { openModal } = useModalStore();

const nav = [
  { name: "Авто в наличии", link: "/cars" },
  { name: "Акции", link: "/" },
  { name: "Отзывы", link: "/" },
  { name: "Автокредит", link: "/#credit" },
  { name: "Trade-In", link: "/#trade" },
  { name: "Контакты", link: "/#contacts" },
];
</script>

<style scoped lang="scss">
.burger {
  background-color: $white;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  position: relative;
  max-height: 100dvh;
  overflow-y: auto;

  :deep(.close) {
    top: 2rem;
    right: 0;
  }
}

nav {
  display: flex;
  flex-direction: column;

  font-size: 2rem;
  a {
    border-bottom: 0.1rem solid #dfdfdf;
    padding: 1.5rem 0;
  }
}

.stars {
  max-width: 15rem;
}

.phone {
  @include flex-start;
  gap: 2rem;
  margin-bottom: 1rem;
}

.contact {
  margin-bottom: 2rem;
}
</style>
