<template>
  <section class="credit mb-20">
    <div class="container">
      <div
        class="credit_main bg-[url('~/assets/img/credit.png')] px-10 py-9 text-white rounded-[10px] overflow-hidden"
      >
        <h5 class="text-xxxl font-semibold mb-6">Выгодный кредит</h5>
        <ul class="flex items-center justify-start gap-8 mb-11">
          <li>
            <p class="text-xxxl font-semibold mb-3 leading-10">от 1%</p>
            <span class="text-minlg block leading-5">Ставка по кредиту</span>
          </li>
          <li>
            <p class="text-xxxl font-semibold mb-3 leading-10">1 час</p>
            <span class="text-minlg block leading-5">Рассмотрение заявки</span>
          </li>
          <li>
            <p class="text-xxxl font-semibold mb-3 leading-10">90%</p>
            <span class="text-minlg block leading-5">Одобрение по кредиту</span>
          </li>
        </ul>
        <btn
          name="Рассчитать кредит"
          size="large"
          theme="secondary"
          custom-class="!px-16"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import btn from "../ui/btn.vue";
</script>

<style scoped lang="scss"></style>
