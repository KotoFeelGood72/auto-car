<template>
  <div
    class="bg-white rounded-[10px] bg-[url('~/assets/img/sale.jpg')] bg-center bg-cover z-50 w-[90vw] xl:py-14 lg:px-8 lg:py-6 xl:h-full max-h-[95dvh] overflow-y-auto"
  >
    <closeBtn />
    <div class="flex xl:flex-row items-center gap-10 lg:flex-col">
      <div
        class="flex xl:max-w-[50%] items-center justify-center lg:max-w-[25rem]"
      >
        <img src="~/assets/img/special-car.png" />
      </div>
      <div class="max-w-[45%] text-left w-full">
        <h3
          class="xl:text-2xl mb-5 font-semibold leading-14 uppercase xl:mx-0 xl:text-left lg:text-xl lg:text-center lg:max-w-[20rem] lg:mx-auto"
        >
          Заявка на спецпредложение
        </h3>
        <ul
          class="space-y-1 mb-8 lg:mb-4 xl:block lg:flex lg:items-center lg:flex-wrap lg:gap-4"
        >
          <li class="flex items-center gap-4 lg:gap-2">
            <Icon
              name="iconamoon:check-thin"
              :size="30"
              class="flex items-center justify-center text-primary"
            />
            <p class="xl:text-minlg lg:text-base">
              <span class="text-primary font-semibold">Без</span>
              первоначального взноса
            </p>
          </li>
          <li class="flex items-center gap-4 xl:gap-2">
            <Icon
              name="iconamoon:check-thin"
              :size="30"
              class="flex items-center justify-center text-primary"
            />
            <p class="xl:text-minlg lg:text-base">
              Ставка от
              <span class="text-primary font-semibold">7%</span>
            </p>
          </li>
          <li class="flex items-center gap-4 xl:gap-2">
            <Icon
              name="iconamoon:check-thin"
              :size="30"
              class="flex items-center justify-center text-primary"
            />
            <p class="xl:text-minlg lg:text-base">
              ТО или доп. оборудование в подарок
            </p>
          </li>
        </ul>
        <Form />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Form from "../shared/Form.vue";
import closeBtn from "../ui/buttons/close-btn.vue";
</script>

<style scoped lang="scss"></style>
