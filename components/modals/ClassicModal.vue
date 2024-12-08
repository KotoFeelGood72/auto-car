<template>
  <div
    class="rounded-[10px] bg-white p-6 shadow-md max-w-[621px] mx-auto relative"
  >
    <closeBtn />
    <div
      class="bg-gradient-to-r from-[#0540A9] to-[#63C7DD] text-white text-xxxl leading-10 pt-1 pb-0 px-3 rounded-[10px] uppercase font-semibold inline-flex justify-start mb-4"
    >
      Бесплатно
    </div>
    <h3 class="text-4xl font-medium max-w-[555px] leading-tight">
      Оценим ваш автомобиль
      <span class="text-primary font-semibold">ВЫШЕ</span> рынка
    </h3>
    <div class="flex items-center gap-4 my-7">
      <div
        class="border-2 border-dashed border-primary py-2 px-6 rounded-[10px] text-xl"
      >
        Скидка <span class="font-semibold text-primary">300 000 руб</span> на
        следующий автомобиль
      </div>
      <div
        class="border-2 border-dashed border-primary py-2 px-6 rounded-[10px] text-xl"
      >
        3 ТО в подарок
      </div>
    </div>
    <Form class="mt-6" />
    <p class="text-xs text-white mt-4">
      Нажимая на кнопку «Отправить», я даю согласие на
      <a href="#" class="underline">обработку персональных данных</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import Form from "../shared/Form.vue";
import closeBtn from "../ui/buttons/close-btn.vue";
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(to right, #0540a9 0%, #63c7dd 90%);
}
</style>
