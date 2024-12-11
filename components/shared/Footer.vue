<template>
  <footer class="footer">
    <div class="section_in">
      <div class="row">
        <heading title="Контакты" :level="2" :size="42" class="title" />
        <div class="row-head">
          <ul class="info-list">
            <li
              class="list-item"
              v-for="(item, i) in info"
              :key="'info-item-' + i"
            >
              <div class="item-icon"><Icon :name="item.icon" :size="20" /></div>
              <p class="item-txt" v-if="item.txt">{{ item.txt }}</p>
              <a class="item-link" :href="'tel:' + item.link">{{
                item.link
              }}</a>
            </li>
          </ul>
          <Btn
            name="Заказать звонок"
            styles="primary"
            color="white"
            size="large"
            :weight="true"
            @click="openModal('call')"
          />
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom__left">
          <div class="img">
            <img src="~/assets/img/logo-footer.svg" alt="АВТОКАР" />
          </div>
          <p class="footer-info">
            ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ТК ПРЕМИУМ ИНВЕСТ" ИНН
            9725142062, ОГРН 1237700847504, ОКПО 64851333, КПП 772501001 от 04
            декабря 2023 г. Юридический адрес: город Москва, Дербеневская наб,
            д. 7 стр. 2, помещ. 22/1/3
          </p>
        </div>
        <nav class="nav-col">
          <NuxtLink
            class=""
            to="/"
            v-for="(item, i) in footerLinks"
            :key="'footer-link-' + i"
            >{{ item.name }}</NuxtLink
          >
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Btn from "../ui/btn.vue";
import heading from "../ui/heading.vue";
import { useModalStore } from "~/stores/useModalStore";

const { openModal } = useModalStore();

const footerLinks = [
  { name: "Политика конфиденциальности", link: "/" },
  { name: "Условия кредитования", link: "/" },
  { name: "Пользовательское соглашение", link: "/" },
];

const info = [
  { txt: "Ежедневно с 8:00 до 21:00", icon: "svg-spinners:pulse-3" },
  { txt: "г. Москва, 33км МКАД, 6с6", icon: "et:map-pin" },
  { link: "+7 (495) 021 31 19", icon: "prime:phone" },
];
</script>

<style scoped lang="scss">
.footer {
  background-color: #03183d;
  padding: 5rem 0;
  color: $white;
  a {
    color: inherit;
  }
}

.row-head {
  @include flex-space;
  margin-bottom: 4rem;
  @include bp($point_2) {
    flex-wrap: wrap;
  }
}

.info-list {
  @include flex-start;
  gap: 3rem;
  font-size: 2rem;
  @include bp($point_2) {
    flex-direction: column;
    align-items: flex-start;
    padding: 3rem 0;
    gap: 1.5rem;
  }
  li {
    @include flex-start;
    gap: 1.5rem;
  }
  .item-icon {
    @include flex-center;
  }
}

.footer-bottom {
  @include flex-space;
  align-items: flex-start;
  border-top: 0.1rem solid #ffffff21;
  padding-top: 4rem;

  @include bp($point_2) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.footer-bottom__left {
  @include flex-start;
  gap: 6rem;
  font-size: 1.2rem;
  color: #ffffff95;
  max-width: 82rem;

  @include bp($point_2) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 2rem;
    font-size: 1rem;
  }
}

.nav-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 1.2rem;
  gap: 0.5rem;
  @include bp($point_2) {
    font-size: 1rem;
    align-items: flex-start;
  }
  a {
    color: #ffffff95;
    &:hover {
      color: $white;
    }
  }
}

.img {
  min-width: 24rem;
  @include flex-center;
  @include bp($point_2) {
    min-width: 12rem;
    max-width: 12rem;
  }
  img {
    width: 100%;
  }
}
</style>
