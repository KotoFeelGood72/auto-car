import axios from "axios";
import { ref, computed } from "vue";

const cars = ref<any>([]); // Все автомобили
const filteredCars = ref<any>([]); // Для хранения отфильтрованных машин
const currentPage = ref<any>(1); // Текущая страница
const itemsPerPage = ref<any>(6); // Количество элементов на странице
const brands = ref<any[]>([]); // Список брендов
const selectedBrand = ref<any>(null); // Выбранный бренд
const popularCars = ref<any>([]); // Популярные автомобили
const promotionalCars = ref<any>([]); // Промо-автомобили
const singleCar = ref<any>(null);
// Перемешивание массива (для популярного и промо списка)
const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Пагинация
const paginatedCars = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCars.value.slice(start, end);
});

// Общее количество страниц для пагинации
const totalPages = computed(() => {
  return Math.ceil(filteredCars.value.length / itemsPerPage.value);
});

// Фильтрация по бренду
const filterByBrand = (brand: any) => {
  selectedBrand.value = brand;
  if (brand) {
    filteredCars.value = cars.value.filter((car: any) => car.brand === brand);
  } else {
    filteredCars.value = [...cars.value];
  }
  currentPage.value = 1; // Сбрасываем на первую страницу
};

// Получение всех автомобилей
export const useGetAll = async (
  popularCount: any = 5, // Количество популярных автомобилей
  promoCount: any = 5 // Количество промо-автомобилей
) => {
  try {
    const response = await axios.get("/api/cars/all-cars.json");
    cars.value = response.data;

    // Формируем список уникальных брендов
    brands.value = Array.from(new Set(cars.value.map((car: any) => car.brand)));

    // Устанавливаем начальные данные
    filteredCars.value = [...cars.value];

    // Формируем популярные и промо-автомобили
    popularCars.value = shuffleArray([...cars.value]).slice(0, popularCount);
    promotionalCars.value = shuffleArray([...cars.value]).slice(0, promoCount);
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
};

export const useGetCarBySlug = async (slug: any) => {
  try {
    const response = await axios.get(`/api${slug}/index.json`);
    singleCar.value = response.data;
    console.log(singleCar);
  } catch (error) {
    console.error("Ошибка загрузки машины по слагу:", error);
    singleCar.value = null;
  }
};

const setCurrentPage = (page: any) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;

    // Прокрутка страницы наверх
    const container = document.querySelector(".shop-grid"); // Убедитесь, что '.shop-grid' — это правильный селектор для основного контейнера
    if (container) {
      container.scrollIntoView({ behavior: "smooth" });
    }
  }
};

// Экспортируем реактивные переменные для использования в других компонентах
export const useCars = () => {
  return {
    cars,
    filteredCars,
    paginatedCars,
    brands,
    selectedBrand,
    currentPage,
    itemsPerPage,
    totalPages,
    popularCars,
    promotionalCars,
    singleCar,
    setCurrentPage,
    useGetAll,
    filterByBrand,
    useGetCarBySlug,
  };
};
