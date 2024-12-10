export const parseBrands = async (page, mainUrl) => {
  console.log("Начинаем парсинг брендов...");
  await page.goto(mainUrl, { waitUntil: "domcontentloaded" });

  const brandLinks = await page.evaluate(() => {
    const links = [];
    document.querySelectorAll(".marks-grid a.mark-link").forEach((el) => {
      links.push({
        url: el.getAttribute("href"),
        name: el.querySelector(".mark-link__title").textContent.trim(),
      });
    });
    return links;
  });

  console.log(`Найдено брендов: ${brandLinks.length}`, brandLinks);
  return brandLinks;
};
