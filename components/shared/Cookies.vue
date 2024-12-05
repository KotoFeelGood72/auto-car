<script setup lang="ts">
import { ref, onMounted } from "vue";
import btn from "./buttons/btn.vue";

const isCookieAccepted = ref(true);

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

onMounted(() => {
  const accepted = getCookie("cookieAccepted") === "true";
  const rejected = getCookie("cookieRejected") === "true";
  if (!accepted && !rejected) {
    isCookieAccepted.value = false;
  }
});

const acceptCookie = () => {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  document.cookie = `cookieAccepted=true; path=/; expires=${expiryDate.toUTCString()}`;
  isCookieAccepted.value = true;
};

const rejectCookie = () => {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  document.cookie = `cookieRejected=true; path=/; expires=${expiryDate.toUTCString()}`;
  isCookieAccepted.value = true;
};
</script>

<template>
  <div v-if="!isCookieAccepted" class="cookies">
    <p>
      Кстати, действия представителей оппозиции представлены в исключительно
      положительном свете. Бронь авиабилета можно проверить на сайте
      авиакомпании после оплаты заказа.
    </p>
    <div class="row">
      <btn name="Отклонить" @click="rejectCookie" />
      <btn theme="primary" name="Принять" @click="acceptCookie" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
