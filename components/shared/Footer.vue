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
      <div class="footer-loan">
        <p class="footer-info">
          Данный сайт носит исключительно информационный характер и ни при каких
          условиях не является публичной офертой, определяемой положениями
          Статьи 437 Гражданского кодекса РФ. Предоставляя свои персональные
          данные в любых формах, а также при звонке на номера, указанные на
          сайте, вы даёте согласие на обработку и использование персональных
          данных в интересах владельца сайта. Все персональные данные подлежат
          обработке в соответствии с политикой конфиденциальности и защищены
          Федеральным законом Российской Федерации от 27 июля 2006 г. № 152-ФЗ.
          Для получения подробной информации о стоимости автомобилей обращайтесь
          в наши автосалоны. Опубликованная на данном сайте информация может
          быть изменена в любое время без предварительного уведомления. Свою
          ставку и максимальную сумму кредита вы сможете узнать после того, как
          подадите заявку. Они зависят от данных, которые вы укажете в заявке, и
          от вашей кредитной истории. *.Первоначальный взнос 0% - от стоимости
          транспортного средства. Кредитор — ПАО «Совкомбанк» (лицензия ЦБ РФ №
          963 от 05.12.2014, далее — «Банк»). Валюта кредита — рубль РФ.
          Первоначальный взнос — от 0% цены приобретаемого ТС; сумма кредита —
          от 90 000 руб.; срок кредита — 24-72 мес.; процентная ставка — от
          23,0% годовых; обеспечение по кредиту — залог приобретаемого ТС;
          возврат кредита — ежемесячные (аннуитетные) платежи; При обязательном
          условии страхования жизни, КАСКО в страховых компаниях-партнерах на
          весь срок действия кредитного договора, а также покупки доп.
          оборудования. Все подробности предоставления кредитной программы и
          полные условия уточняйте у менеджеров. Срок проведения акции с
          01.11.2024 по 08.12.2024. Подробности акции, стоимость автомобилей
          уточняйте у менеджеров отдела продаж или по телефону: +7 861 201 84 27
          Реквизиты организации: ООО "АВАНГАРД", ИНН: 2312329147, ОГРН:
          1242300044722 Кредитор: АО «Тинькофф Банк», лицензия ЦБ РФ № 2673 от
          11.04.2022 Страховой партнер: АО «АльфаСтрахование» (лицензия ОС №
          2239-03 от 13.11.2017 г.)
        </p>
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
  { link: "+7 (499) 289-87-21", icon: "prime:phone" },
];
</script>

<style scoped lang="scss">
.footer {
  background-color: #03183d;
  padding: 5rem 0;
  color: $white;
  @include bp($point_2) {
    padding: 5rem 0 10rem 0;
  }
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
    font-size: 1.6rem;
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
  margin-bottom: 2rem;

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

.footer-info {
  font-size: 1.2rem;
  line-height: 1.8rem;
  opacity: 0.7;
}
</style>
