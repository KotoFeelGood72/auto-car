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

  const cooldownTime = 60000; // Минимальный промежуток между отправками в миллисекундах
  const localStorageKey = "lastSubmitTime";
  let warningToastId: any = null; // ID предупреждения, чтобы избежать дублирования

  const getLastSubmitTime = (): number | null => {
    const storedTime = localStorage.getItem(localStorageKey);
    return storedTime ? parseInt(storedTime, 10) : null;
  };

  const setLastSubmitTime = (time: number) => {
    localStorage.setItem(localStorageKey, time.toString());
  };

  const canSubmit = () => {
    const now = Date.now();
    const lastSubmitTime = getLastSubmitTime();
    if (lastSubmitTime && now - lastSubmitTime < cooldownTime) {
      const remainingTime = (
        (cooldownTime - (now - lastSubmitTime)) /
        1000
      ).toFixed(1);

      // Если предупреждение уже отображается, обновляем его
      if (warningToastId) {
        toast.update(warningToastId, {
          content: `Пожалуйста, подождите ${remainingTime} секунд перед повторной отправкой.`,
          // @ts-ignore
          type: "warning",
        });
      } else {
        warningToastId = toast.warning(
          `Пожалуйста, подождите ${remainingTime} секунд перед повторной отправкой.`
        );
      }

      return false;
    }

    warningToastId = null; // Сбрасываем предупреждение после успешной проверки
    setLastSubmitTime(now);
    return true;
  };

  const submitForm = async (
    url: string,
    data: Record<string, any>,
    showToast: boolean = true
  ) => {
    if (!canSubmit()) return;

    isLoading.value = true;
    isSuccess.value = false;
    isError.value = false;
    errorMessage.value = null;

    try {
      console.log("Отправка данных на URL:", url);
      console.log("Данные:", data);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Ответ от CRM:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ошибка ответа CRM:", errorText);
        throw new Error(`Ошибка: ${response.status}, ${errorText}`);
      }

      const responseData = await response.json();
      console.log("Успешный ответ CRM:", responseData);

      isSuccess.value = true;

      if (warningToastId) {
        toast.dismiss(warningToastId);
        warningToastId = null;
      }

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
    const crmProxyUrl = "/api/crm"; // Используем локальный URL

    const extendedData =
      data.deal_type === 80 || data.deal_type === 81
        ? {
            ...data,
            additional_info: {
              deal_marka: data.deal_marka || "Не указано",
              deal_model: data.deal_model || "Не указано",
              down_payment: data.down_payment || 0,
              loan_term: data.loan_term || 0,
            },
          }
        : { ...data };

    console.log("Отправка данных в CRM:", extendedData);

    await submitForm(crmProxyUrl, extendedData, false);
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

    // Передаем showToast = false, чтобы уведомление не отображалось второй раз
    await submitForm(
      tgUrl,
      {
        chat_id: chatId,
        text: message,
      },
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
