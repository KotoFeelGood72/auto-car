import { useHead } from "nuxt/app";

interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: object;
}

export const useSeo = (seoData: SeoData) => {
  const defaultImage = "https://autocarmsk.ru/assets/img/geely.jpg";
  const defaultUrl = "https://autocarmsk.ru/";
  const defaultType = "website";

  useHead({
    title: seoData.title,
    meta: [
      { name: "description", content: seoData.description },
      { name: "keywords", content: seoData.keywords || "" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: seoData.title },
      { property: "og:description", content: seoData.description },
      { property: "og:image", content: seoData.image || defaultImage },
      { property: "og:url", content: seoData.url || defaultUrl },
      { property: "og:type", content: seoData.type || defaultType },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seoData.title },
      { name: "twitter:description", content: seoData.description },
      { name: "twitter:image", content: seoData.image || defaultImage },
    ],
    script: seoData.schema
      ? [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify(seoData.schema),
          },
        ]
      : [],
  });
};
