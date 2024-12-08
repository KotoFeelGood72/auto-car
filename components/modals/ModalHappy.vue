<template>
  <div
    class="rounded-[10px] bg-[url('~/assets/img/modal-happy.png')] bg-center bg-cover z-50 min-w-[1270px] w-full py-6 text-white xl:min-w-[90vw]"
  >
    <closeBtn />
    <div class="flex items-center justify-end gap-10 p-10">
      <div class="max-w-[555px] w-full">
        <h3
          class="xl:text-2xl mb-5 font-semibold leading-tight uppercase lg:text-xxl"
        >
          ВАМ УЖЕ СДЕЛАЛИ ПРЕДЛОЖЕНИЕ?
        </h3>
        <div
          class="mb-5 bg-gradient-to-r from-[#0540A9] to-[#63C7DD] text-white xl:text-xxxl leading-10 pt-1 pb-0 px-3 rounded-[10px] uppercase font-semibold inline-flex justify-start lg:text-minlg"
        >
          МЫ СДЕЛАЕМ ЛУЧШЕ!
        </div>
        <p class="xl:text-lg mb-5">Оставьте заявку и менеджер Вам перезвонит</p>
        <Form :transparent="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Form from "../shared/Form.vue";
import closeBtn from "../ui/buttons/close-btn.vue";
</script>

<style scoped lang="scss"></style>
