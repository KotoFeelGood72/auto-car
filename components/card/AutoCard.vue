<template>
  <div
    class="relative border border-border rounded-[10px] overflow-hidden pt-10 px-4 pb-4 shadow-md hover:shadow-lg transition-all cursor-pointer"
  >
    <div
      class="absolute top-5 right-5 bg-red py-2 px-4 rounded-[7px] text-white text-[12px]"
    >
      Выгода 390 000 ₽
    </div>
    <div class="flex justify-center mb-4">
      <img
        src="~/assets/img/jetta.png"
        alt="Jetta VS7"
        class="w-full h-auto object-contain"
      />
    </div>
    <h3 class="text-lg font-semibold mb-5">Jetta VS7</h3>
    <div class="mb-5 flex items-center gap-5">
      <div>
        <p class="text-minlg font-semibold mb-1 text-txtGray">от 1 759 000 ₽</p>
        <p class="text-light line-through font-medium">от 2 149 000 ₽</p>
      </div>
      <div class="max-w-32">В кредит от 13 351 ₽/мес.</div>
    </div>
    <div class="flex items-center gap-3">
      <btn name="Подробнее" size="small" theme="secondary" />
      <btn name="Купить в кредит" size="small" theme="primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";
</script>

<style scoped lang="scss"></style>
