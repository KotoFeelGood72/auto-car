<template>
  <footer
    class="footer bg-[#03183D] text-white py-12 rounded-tr-xl rounded-tl-xl overflow-hidden"
  >
    <div class="container">
      <div class="footer_main pb-8">
        <h6 class="text-4xl">Контакты</h6>
        <div class="flex items-center justify-between">
          <ul class="flex items-end justify-between gap-12">
            <li class="flex items-center gap-4">
              <div
                class="ic pulse animate-pulse w-2 h-2 bg-white rounded-full"
              ></div>
              <p>Ежедневно с 8:00 до 21:00</p>
            </li>
            <li class="flex items-center gap-4">
              <div class="ic flex items-center justify-center text-white">
                <Icon name="f:map" :size="25" />
              </div>
              <p>Краснобогатырская улица, 2с22, Москва, 107564</p>
            </li>
            <li class="flex items-center gap-4">
              <div class="ic flex items-center justify-center text-white">
                <Icon name="f:tel" :size="20" />
              </div>
              <a href="tel:+74950213119">+7 (495) 021 31 19</a>
            </li>
          </ul>
          <Btn
            name="Заказать звонок"
            theme="secondary"
            size="normal"
            custom-class="!px-14"
          />
        </div>
      </div>
      <div class="border-t border-light pt-7">
        <div class="flex items-center gap-14 flex-grow">
          <div class="flex items-center justify-center">
            <img src="~/assets/img/logo-footer.svg" alt="АВТОКАР" />
          </div>
          <p class="text-xs max-w-[531px]">
            ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ТК ПРЕМИУМ ИНВЕСТ" ИНН
            9725142062, ОГРН 1237700847504, ОКПО 64851333, КПП 772501001 от 04
            декабря 2023 г. Юридический адрес: город Москва, Дербеневская наб,
            д. 7 стр. 2, помещ. 22/1/3
          </p>
        </div>
        <nav class="flex gap-5 pt-6">
          <NuxtLink
            class="text-xs text-slate-200 underline-offset-4 underline hover:no-underline"
            to="/"
            >Политика конфиденциальности</NuxtLink
          >
          <NuxtLink
            class="text-xs text-slate-200 underline-offset-4 underline hover:no-underline"
            to="/"
            >Условия кредитования</NuxtLink
          >
          <NuxtLink
            class="text-xs text-slate-200 underline-offset-4 underline hover:no-underline"
            to="/"
            >Пользовательское соглашение</NuxtLink
          >
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Btn from "../ui/btn.vue";
</script>

<style scoped lang="scss"></style>
