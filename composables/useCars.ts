import axios from "axios";
import { ref } from "vue";

const cars = ref<any>([]);
const popularCars = ref<any>([]);
const promotionalCars = ref<any>([]);
const singleCar = ref<any>(null);

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Функция для получения списка автомобилей с ограничением по количеству
export const useGetAll = async (limit: number | null = null) => {
  try {
    const response = await axios.get("/api/cars/all-cars.json");
    let allCars = response.data;

    // Если передан параметр limit, обрезаем массив до указанного количества
    if (limit && typeof limit === "number") {
      allCars = allCars.slice(0, limit);
    }

    cars.value = allCars;
    popularCars.value = shuffleArray(allCars);
    promotionalCars.value = shuffleArray(allCars);
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
};

// Функция для получения одной машины по слагу
export const useGetCarBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`/api/${slug}.json`);
    singleCar.value = response.data;
  } catch (error) {
    console.error("Ошибка загрузки машины по слагу:", error);
    singleCar.value = null;
  }
};

// Экспортируем реактивные переменные для использования в других компонентах
export const useCars = () => {
  return {
    cars,
    popularCars,
    promotionalCars,
    singleCar,
    useGetAll,
    useGetCarBySlug,
  };
};
