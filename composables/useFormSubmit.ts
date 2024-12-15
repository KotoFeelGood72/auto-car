import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useModalStore } from "~/stores/useModalStore";

export function useFormSubmit() {
  const toast = useToast();
  const { closeAllModals } = useModalStore();
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);
  const errorMessage = ref<any>(null);

  const submitForm = async (
    url: string,
    data: Record<string, any>,
    method: "POST" | "PUT" = "POST",
    showToast: boolean = true,
    apiKey?: string // Опциональный API-ключ
  ) => {
    isLoading.value = true;
    isSuccess.value = false;
    isError.value = false;
    errorMessage.value = null;

    try {
      console.log("Отправка данных на URL:", url);
      console.log("Метод:", method);
      console.log("Данные:", data);

      const headers: Record<string, string> = {
        "Content-Type":
          method === "PUT"
            ? "application/x-www-form-urlencoded"
            : "application/json",
      };

      if (apiKey) {
        headers["Authorization"] = `Bearer ${apiKey}`; // Добавляем API-ключ в заголовок
      }

      const body =
        method === "PUT"
          ? new URLSearchParams(data).toString()
          : JSON.stringify(data);

      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      console.log("Ответ от сервера:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ошибка ответа сервера:", errorText);
        throw new Error(`Ошибка: ${response.status}, ${errorText}`);
      }

      const responseData = await response.json();
      console.log("Успешный ответ сервера:", responseData);

      isSuccess.value = true;

      if (showToast) {
        toast.success("Данные успешно отправлены!");
      }
    } catch (error: any) {
      isError.value = true;
      errorMessage.value =
        error.message || "Произошла ошибка при отправке данных";
      console.error("Ошибка отправки:", error);
      if (showToast) {
        toast.error(errorMessage.value);
      }
    } finally {
      closeAllModals();
      isLoading.value = false;
    }
  };

  const sendToCRM = async (data: Record<string, any>) => {
    const crmProxyUrl = "/api/crm";

    const apiKey = "ed2f550d045b3d3a54d2662fe6d5e677"; // Ваш API-ключ

    const extendedData = {
      ...data,
      api_key: apiKey, // Добавляем ключ в тело запроса
      ...(data.deal_type === 80 || data.deal_type === 81
        ? {
            additional_info: {
              deal_marka: data.deal_marka || "Не указано",
              deal_model: data.deal_model || "Не указано",
              down_payment: data.down_payment || 0,
              loan_term: data.loan_term || 0,
            },
          }
        : {}),
    };

    console.log("Отправка данных в CRM:", extendedData);

    await submitForm(crmProxyUrl, extendedData, "PUT", false);
  };

  const sendToTelegram = async (data: Record<string, any>) => {
    const botToken = "7957318895:AAFSjT_RCGDqfl0fhm8Tj3etNb0-xxJ1aEg";
    const chatId = "-1002365907170";

    const dealTypes: Record<number, string> = {
      46: "Звонок",
      80: "Кредит",
      81: "Экспресс-кредит",
      47: "Рассрочка",
      83: "Обратный звонок",
      84: "Бронь",
      85: "Trade-in",
      86: "Обратная связь",
      87: "Утилизация",
      88: "Выкуп",
      1684: "Отзыв",
    };

    const dealTypeName = dealTypes[data.deal_type] || "Неизвестный тип сделки";

    const message = `Новая заявка:
      Имя: ${data.deal_name}
      Телефон: ${data.deal_phone_mobile}
      Тип сделки: ${dealTypeName}${
      data.deal_marka
        ? `\nАвтомобиль: ${data.deal_marka} ${data.deal_model}`
        : ""
    }${
      data.deal_type === 80 || data.deal_type === 81 || data.deal_type === 47
        ? `\nПервоначальный взнос: ${
            data.down_payment || 0
          }%\nСрок кредитования: ${data.loan_term || 0} месяцев`
        : ""
    }`;

    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    await submitForm(
      tgUrl,
      {
        chat_id: chatId,
        text: message,
      },
      "POST", // Метод POST
      false
    );
  };

  return {
    isLoading,
    isSuccess,
    isError,
    errorMessage,
    submitForm,
    sendToCRM,
    sendToTelegram,
  };
}
