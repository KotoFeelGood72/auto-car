import { ref } from "vue";
import { useToast } from "vue-toastification";

export function useFormSubmit() {
  const toast = useToast();
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);
  const errorMessage = ref<string | null>(null);

  const lastSubmitTime = ref<number | null>(null); // Время последней отправки
  const cooldownTime = 60000; // Минимальный промежуток между отправками в миллисекундах

  const canSubmit = () => {
    const now = Date.now();
    if (lastSubmitTime.value && now - lastSubmitTime.value < cooldownTime) {
      const remainingTime = ((cooldownTime - (now - lastSubmitTime.value)) / 1000).toFixed(1);
      toast.warning(`Пожалуйста, подождите ${remainingTime} секунд перед повторной отправкой.`);
      return false;
    }
    lastSubmitTime.value = now;
    return true;
  };

  const submitForm = async (url: string, data: Record<string, any>) => {
    if (!canSubmit()) return; // Проверяем, можно ли отправлять

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
      toast.success("Данные успешно отправлены!");
    } catch (error: any) {
      isError.value = true;
      errorMessage.value = error.message || "Произошла ошибка при отправке данных";
      toast.error(errorMessage.value);
    } finally {
      isLoading.value = false;
    }
  };

  const sendToCRM = async (data: Record<string, any>) => {
    const crmUrl = "http://crm.renault-s.ru/expo/api/deal/add"; // Укажите ваш URL
    await submitForm(crmUrl, data);
  };

  const sendToTelegram = async (data: Record<string, any>) => {
    const botToken = "7957318895:AAFSjT_RCGDqfl0fhm8Tj3etNb0-xxJ1aEg";
    const chatId = "-1002365907170";

    // Формируем сообщение для Telegram
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

    const message = `Новая заявка:\nИмя: ${data.deal_name}\nТелефон: ${data.deal_phone_mobile}\nТип сделки: ${dealTypeName}${
      data.deal_marka ? `\nАвтомобиль: ${data.deal_marka} ${data.deal_model}` : ""
    }`;

    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await submitForm(tgUrl, {
      chat_id: chatId,
      text: message,
    });
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