import fs from "fs";
import path from "path";

const basePath = path.join(process.cwd(), "public", "api", "cars");

// Функция для чтения всех файлов JSON и генерации общего файла
const collectCarsData = () => {
  const allCars = [];
  
  const readDirectory = (dirPath) => {
    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        // Если элемент - папка, рекурсивно обходим её
        readDirectory(itemPath);
      } else if (stats.isFile() && item.endsWith(".json")) {
        // Если элемент - JSON-файл, читаем его
        const carData = JSON.parse(fs.readFileSync(itemPath, "utf-8"));
        allCars.push({
          title: carData.title,
          image: carData.image,
          slug: carData.slug,
          priceOld: carData.priceOld,
          priceNew: carData.priceNew,
          monthlyPayment: carData.monthlyPayment,
        });
      }
    });
  };

  // Запускаем чтение с базовой папки
  readDirectory(basePath);

  return allCars;
};

// Функция для сохранения общего файла
const saveAllCarsFile = (allCars) => {
  const outputFilePath = path.join(basePath, "all-cars.json");

  fs.writeFileSync(outputFilePath, JSON.stringify(allCars, null, 2), "utf-8");
  console.log(`Общий файл автомобилей сохранён: ${outputFilePath}`);
};

// Запуск метода напрямую
try {
  console.log("Чтение данных и генерация общего файла...");
  const allCars = collectCarsData();
  saveAllCarsFile(allCars);
} catch (error) {
  console.error("Ошибка при генерации общего файла:", error.message);
}
