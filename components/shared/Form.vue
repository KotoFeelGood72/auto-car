<template>
  <div :class="['form', { 'row-inputs': row }, color]">
    <Inputs
      placeholder="Ваше имя"
      v-model="form.name"
      :error="isError"
      @input="resetError"
    />
    <Inputs
      placeholder="+7 (___) ___-__-__"
      v-model="form.phone"
      :phone="true"
      :error="isError"
      @input="resetError"
    />
    <btn
      :name="isLoading ? 'Отправка...' : 'Отправить заявку'"
      :disabled="isLoading"
      styles="primary"
      color="blue"
      size="large"
      :loading="isLoading"
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
import { useFormSubmit } from "@/composables/useFormSubmit";

const props = withDefaults(
  defineProps<{
    color?: "white" | "black";
    row?: boolean;
    dealType: number; // Тип сделки (обязательный параметр)
    additionalData?: any; // Дополнительные данные (необязательный параметр)
  }>(),
  {
    color: "black",
    row: false,
    additionalData: {}, // По умолчанию пустой объект
  }
);

const {
  isLoading,
  isSuccess,
  isError,
  errorMessage,
  sendToCRM,
  sendToTelegram,
} = useFormSubmit();

const form = ref({
  name: "",
  phone: "",
});

const resetForm = () => {
  form.value.name = "";
  form.value.phone = "";
};

const resetError = () => {
  isError.value = false; // Сброс ошибки
};

const handleSubmit = async () => {
  if (!form.value.name || form.value.name.length < 2) {
    isError.value = true;
    return;
  }

  if (!form.value.phone || form.value.phone.length < 10) {
    isError.value = true;
    return;
  }

  // Формируем объект данных для отправки
  const data = {
    api_key: "ed2f550d045b3d3a54d2662fe6d5e677",
    deal_type: props.dealType,
    deal_name: form.value.name,
    deal_reklama: "Автокар",
    deal_phone_mobile: form.value.phone,
    deal_status: 82,
    deal_desc: `Имя: ${form.value.name}, Телефон: ${form.value.phone}`,
    ...props.additionalData,
  };

  isLoading.value = true;

  try {
    await sendToTelegram(data);
    isSuccess.value = true;
    resetForm();
  } catch (error) {
    isError.value = true;
    console.error("Ошибка отправки:", errorMessage.value || error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 2.7rem;

  &.white {
    :deep(input) {
      background-color: transparent;
      color: $white;
      &::-webkit-input-placeholder {
        color: $white;
      }
    }
  }

  &.row-inputs {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;

    :deep(.btn) {
      width: 100%;
    }

    :deep(.input-wrapper) {
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
