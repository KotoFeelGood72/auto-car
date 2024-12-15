import fs from "fs";
import path from "path";
import slugify from "slugify";
import axios from "axios";

const allCars = [];
const basePath = path.join(process.cwd(), "public", "api", "cars");

const ensureDirectory = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};
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
  ensureDirectory(galleryFolder);

  return await Promise.all(
    gallery.map(async (image, index) => {
      if (image.fullImage) {
        const safeFileName = `gallery-${index + 1}.jpg`;
        const fullImagePath = path.join(galleryFolder, safeFileName);

        try {
          await downloadImage(image.fullImage, fullImagePath);
        } catch (error) {
          console.error(
            `Ошибка загрузки изображения галереи: ${image.fullImage}. Путь: ${fullImagePath}`,
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

const processColors = async (colors, imgFolder) => {
  ensureDirectory(imgFolder);

  return await Promise.all(
    colors.map(async (color) => {
      if (color.image) {
        const safeFileName = slugify(color.name || "default", {
          lower: true,
          remove: /[*+~.()'"!:@\\\/]/g,
        });
        const fileName = `${safeFileName}.jpg`;
        const filePath = path.join(imgFolder, fileName);

        try {
          await downloadImage(color.image, filePath);
        } catch (error) {
          console.error(
            `Ошибка загрузки изображения цвета: ${color.image}. Путь: ${filePath}`,
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

    const slug = `/cars/${slugify(brand)}/${slugify(model)}/`;

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

    // Извлекаем модификации автомобиля
    carData.modifications = await extractModifications(page);

    // Обработка изображений
    const brandSlug = slugify(carData.brand, { lower: true });
    const modelSlug = slugify(carData.model, { lower: true });
    const brandFolder = path.join(basePath, brandSlug);
    const galleryFolder = path.join(brandFolder, modelSlug, "gallery");
    const colorsFolder = path.join(brandFolder, modelSlug, "colors");

    carData.gallery = await handleGallery(page, galleryFolder);
    carData.colors = await processColors(carData.colors, colorsFolder);

    // Сохранение основного изображения автомобиля
    if (carData.image) {
      const mainImageFilePath = path.join(brandFolder, modelSlug, "main.jpg");
      try {
        await downloadImage(carData.image, mainImageFilePath);
        carData.image = `/api/cars/${path
          .relative(basePath, mainImageFilePath)
          .replace(/\\/g, "/")}`;
      } catch (error) {
        console.error(
          `Ошибка загрузки основного изображения автомобиля: ${carData.image}`,
          error
        );
      }
    }

    // Замена городов в модификациях (если применимо)
    if (carData.modifications) {
      carData.modifications = carData.modifications.map((mod) => ({
        ...mod,
      }));
    }

    // Сохранение JSON файла
    const carFilePath = path.join(brandFolder, modelSlug, "index.json");
    fs.writeFileSync(carFilePath, JSON.stringify(carData, null, 2), "utf-8");

    // Добавление данных в общий список автомобилей
    allCars.push({ slug: `/api/cars/${brandSlug}/${modelSlug}`, ...carData });
  } catch (error) {
    console.error(`Ошибка обработки автомобиля ${carLink}:`, error);
  }
};
