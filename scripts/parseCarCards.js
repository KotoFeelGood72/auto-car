export const parseCarCards = async (page, brand) => {
    console.log(`Обработка бренда: ${brand.name}`);
    await page.goto(brand.url, { waitUntil: "domcontentloaded" });
  
    const carLinks = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll(".car-card a.car-card__thumb").forEach((el) => {
        links.push(el.getAttribute("href"));
      });
      return links;
    });
  
    console.log(`Найдено автомобилей: ${carLinks.length} для бренда ${brand.name}`);
    return carLinks;
  };
  