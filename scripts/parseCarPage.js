import fs from "fs";
import path from "path";
import slugify from "slugify";
import axios from "axios";

const allCars = [];
const basePath = path.join(process.cwd(), "public", "api", "cars");
// Метод для извлечения галереи изображений
const extractGalleryImages = async (page) => {
  return await page.evaluate(() => {
    const galleryItems = document.querySelectorAll(".gallery-item");
    return Array.from(galleryItems).map((item) => ({
      fullImage: item.getAttribute("href"), // Полная версия изображения
      thumbnail:
        item.querySelector("img")?.getAttribute("src") || // Миниатюра
        item.querySelector("img")?.getAttribute("data-src"),
      alt: item.querySelector("img")?.getAttribute("alt") || "", // Альтернативный текст
    }));
  });
};

const processGalleryImages = async (gallery, galleryFolder) => {
  if (!fs.existsSync(galleryFolder)) {
    fs.mkdirSync(galleryFolder, { recursive: true });
  }

  return await Promise.all(
    gallery.map(async (image, index) => {
      if (image.fullImage) {
        const safeFileName = `gallery-${index + 1}.jpg`;
        const fullImagePath = path.join(galleryFolder, safeFileName);

        try {
          await downloadImage(image.fullImage, fullImagePath);
        } catch (error) {
          console.error(
            `Ошибка загрузки изображения галереи: ${image.fullImage}`,
            error
          );
        }

        return {
          ...image,
          fullImage: `/api/cars/${path
            .relative(basePath, fullImagePath)
            .replace(/\\/g, "/")}`,
        };
      }
      return image;
    })
  );
};

// Метод для обработки галереи
const handleGallery = async (page, galleryFolder) => {
  console.log("Извлечение галереи изображений...");
  const gallery = await extractGalleryImages(page);

  console.log("Скачивание изображений галереи...");
  const processedGallery = await processGalleryImages(gallery, galleryFolder);

  return processedGallery;
};

// Функция для скачивания изображения
const downloadImage = async (url, filePath) => {
  try {
    // Проверяем, является ли URL абсолютным
    if (!url.startsWith("http")) {
      const baseUrl = "https://klassavto.ru"; // Замените на свой базовый URL
      url = `${baseUrl}${url}`;
    }

    const writer = fs.createWriteStream(filePath);
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(`Ошибка загрузки изображения: ${url}`, error.message);
  }
};

// Функция для сохранения всех автомобилей в общий JSON файл
const saveAllCarsToFile = () => {
  const outputFilePath = path.join(
    process.cwd(),
    "api",
    "cars",
    "all-cars.json"
  );
  fs.writeFileSync(outputFilePath, JSON.stringify(allCars, null, 2), "utf-8");
  console.log(`Файл all-cars.json успешно сохранен: ${outputFilePath}`);
};

// Функция для получения основных данных о машине
const extractCarData = async (page) => {
  return await page.evaluate(() => {
    const titleElement = document.querySelector(".section-header__heading h1");
    const title = titleElement ? titleElement.textContent.trim() : "Неизвестно";

    const brandElement = document.querySelector(
      ".breadcrumbs__item:nth-last-child(2)"
    );
    const brand = brandElement ? brandElement.textContent.trim() : "Неизвестно";

    // Извлечение данных из блока sale-block
    const saleBlockElement = document.querySelector(".sale-block");
    const saleBlock = saleBlockElement
      ? saleBlockElement.textContent.trim()
      : "Нет данных";

    const model = title.replace(brand, "").split("в")[0].trim(); // Извлечение модели
    const cityMatch = title.match(/в\s([А-Яа-я\s-]+)/); // Поиск города через регулярное выражение
    const city = cityMatch ? cityMatch[1].trim() : "Неизвестный город"; // Извлечение города

    const imageElement = document.querySelector(".model-page__preview-img");
    const image = imageElement ? imageElement.getAttribute("src") : null;

    const priceOldElement = document.querySelector(
      "del[data-car-price-old-text]"
    );
    const priceOld = priceOldElement
      ? priceOldElement.textContent.trim()
      : null;

    const priceNewElement = document.querySelector("[data-car-price-text]");
    const priceNew = priceNewElement
      ? priceNewElement.textContent.trim()
      : null;

    const monthlyPaymentElement = document.querySelector(
      "[data-car-price-permounth-text]"
    );
    const monthlyPayment = monthlyPaymentElement
      ? monthlyPaymentElement.textContent.trim()
      : null;

    const featuresElements = document.querySelectorAll(
      ".mod-check__addon-item"
    );
    const features = Array.from(featuresElements).map((el) =>
      el.textContent.trim()
    );

    const colorsElements = document.querySelectorAll(
      ".model-page__colors-item"
    );
    const colors = Array.from(colorsElements).map((color) => ({
      name: color.getAttribute("data-color-name"),
      image: color.getAttribute("data-color-link"),
      style: color.getAttribute("style") || "",
    }));

    const slugify = (text) =>
      text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const slug = `/api/cars/${slugify(brand)}/${slugify(model)}-${slugify(
      city
    )}/${slugify(model)}.json`;

    return {
      title,
      brand,
      model,
      saleBlock,
      city,
      image,
      slug,
      priceOld,
      priceNew,
      monthlyPayment,
      features,
      colors,
    };
  });
};

// Функция для извлечения модификаций автомобиля
const extractModifications = async (page) => {
  return await page.evaluate(() => {
    const modificationElements = document.querySelectorAll(
      ".model-mods__mods-grid .mod-check__input"
    );
    return Array.from(modificationElements).map((mod) => ({
      modification: mod.getAttribute("data-modification") || "Неизвестно",
      engineDisplacement:
        mod.getAttribute("data-engine-displacement") || "Неизвестно",
      price: mod.getAttribute("data-price") || "Неизвестно",
      priceOld: mod.getAttribute("data-price_old") || "Неизвестно",
      monthlyPayment: mod.getAttribute("data-permounth") || "Неизвестно",
    }));
  });
};

// Метод для замены слов в тексте
const replaceCityNames = (text) => {
  if (!text) return text; // Если текст отсутствует, возвращаем как есть
  return text
    .replace(/Краснодар/gi, "Москва")
    .replace(/Краснодаре/gi, "Москве")
    .replace(/krasnodare/gi, "moscow");
};

const processColors = async (colors, imgFolder) => {
  return await Promise.all(
    colors.map(async (color) => {
      if (color.image) {
        const safeFileName = slugify(color.name || "default", {
          lower: true,
          remove: /[*+~.()'"!:@\\\/]/g, // Удаление недопустимых символов
        });
        const fileName = `${safeFileName}.jpg`;
        const filePath = path.join(imgFolder, fileName);

        // Проверка существования папки
        if (!fs.existsSync(imgFolder)) {
          fs.mkdirSync(imgFolder, { recursive: true });
        }

        try {
          await downloadImage(color.image, filePath);
        } catch (error) {
          console.error(
            `Ошибка загрузки изображения цвета: ${color.image}`,
            error
          );
        }

        return {
          ...color,
          image: `/api/cars/${path
            .relative(basePath, filePath)
            .replace(/\\/g, "/")}`,
        };
      }
      return color;
    })
  );
};

export const parseCarPage = async (page, carLink) => {
  try {
    console.log(`Обработка автомобиля: ${carLink}`);
    await page.goto(carLink, { waitUntil: "domcontentloaded" });

    // Ожидаем заголовок модели
    await page.waitForSelector(".section-header__heading h1", {
      timeout: 10000,
    });

    // Извлекаем основные данные автомобиля
    const carData = await extractCarData(page);

    // Замена слов
    carData.title = replaceCityNames(carData.title);
    carData.model = replaceCityNames(carData.model);
    carData.features = carData.features.map(replaceCityNames);
    carData.colors = carData.colors.map((color) => ({
      ...color,
      name: replaceCityNames(color.name),
    }));

    carData.modifications = await extractModifications(page);
    carData.modifications = carData.modifications.map((mod) => ({
      ...mod,
      modification: replaceCityNames(mod.modification),
    }));

    // Формируем директорию для галереи
    const brandSlug = slugify(carData.brand, { lower: true });
    const modelSlug = slugify(carData.model, { lower: true });
    const brandFolder = path.join(basePath, brandSlug);
    const galleryFolder = path.join(brandFolder, modelSlug, "gallery");
    const colorsFolder = path.join(brandFolder, modelSlug, "colors");

    if (!fs.existsSync(galleryFolder))
      fs.mkdirSync(galleryFolder, { recursive: true });
    if (!fs.existsSync(colorsFolder))
      fs.mkdirSync(colorsFolder, { recursive: true });

    // Обрабатываем галерею
    carData.gallery = await handleGallery(page, galleryFolder);

    // Обрабатываем изображения цветов
    carData.colors = await processColors(carData.colors, colorsFolder);

    // Сохраняем JSON файл с данными
    const carFilePath = path.join(brandFolder, modelSlug, `${modelSlug}.json`);
    fs.writeFileSync(
      carFilePath,
      JSON.stringify(
        {
          ...carData,
          gallery: carData.gallery.map((g) => ({
            ...g,
            fullImage: g.fullImage.replace("/public", ""),
          })),
        },
        null,
        2
      ),
      "utf-8"
    );

    allCars.push({ slug: `/api/cars/${brandSlug}/${modelSlug}`, ...carData });
  } catch (error) {
    console.error(`Ошибка обработки автомобиля ${carLink}:`, error);
  }
};

// Функция завершения процесса
export const finalizeAllCars = () => {
  saveAllCarsToFile();
  const outputFilePath = path.join(basePath, "all-cars.json");
  fs.writeFileSync(outputFilePath, JSON.stringify(allCars, null, 2), "utf-8");
  console.log(`Общий файл автомобилей сохранен: ${outputFilePath}`);
};
