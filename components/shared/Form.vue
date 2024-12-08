<template>
  <div :class="['form', { 'row-inputs': row }]">
    <Inputs placeholder="Ваше имя" v-model="form.name" />
    <Inputs placeholder="+7 (___) ___-__-__" v-model="form.phone" />
    <btn
      :name="isLoading ? 'Отправка...' : 'Отправить заявку'"
      :disabled="isLoading"
      styles="primary"
      color="blue"
      size="large"
      @click="handleSubmit"
    />
    <div :class="[color, 'notice']">
      Нажимая на кнопку «Отправить», я даю согласие на обработку персональных
      данных.
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "../ui/Inputs.vue";
import btn from "../ui/btn.vue";
import { useFormSubmit } from "#build/imports";

withDefaults(
  defineProps<{
    color?: "white" | "black";
    row?: boolean;
  }>(),
  {
    color: "black",
    row: false,
  }
);

const { isLoading, isSuccess, isError, errorMessage, submitForm } =
  useFormSubmit();

const form = ref({
  name: "",
  phone: "",
});

const handleSubmit = async () => {
  if (!form.value.name || !form.value.phone) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  await submitForm("/api/form-submit", form.value);
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 2.7rem;

  &.row-inputs {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;

    :deep(.btn) {
      width: 100%;
    }

    :deep(.input__w) {
      flex-grow: 1;
    }
  }
}

.black {
  color: $black;
}
.white {
  color: $black;
}

.notice {
  text-align: center;
  font-size: 1.4rem;
  max-width: 80%;
  margin: 0 auto;
}
</style>
