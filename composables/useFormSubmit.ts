import { ref } from "vue";

export function useFormSubmit() {
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);
  const errorMessage = ref<string | null>(null);

  const submitForm = async (url: string, data: Record<string, any>) => {
    isLoading.value = true;
    isSuccess.value = false;
    isError.value = false;
    errorMessage.value = null;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      isSuccess.value = true;
    } catch (error: any) {
      isError.value = true;
      errorMessage.value = error.message || "Произошла ошибка при отправке данных";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    isSuccess,
    isError,
    errorMessage,
    submitForm,
  };
}