<template>
  <div id="map" class="map h-[34rem]"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

declare global {
  interface Window {
    ymaps: any;
  }
}

onMounted(() => {
  const yandexMapScript = document.createElement("script");
  yandexMapScript.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
  yandexMapScript.async = true;
  yandexMapScript.onload = () => {
    const ymaps = window.ymaps;
    ymaps.ready(() => {
      const map = new ymaps.Map("map", {
        center: [55.751574, 37.573856],
        zoom: 10,
      });

      // Отключение скролла
      map.behaviors.disable("scrollZoom");

      // Кастомная метка с балуном
      const placemark = new ymaps.Placemark(
        [55.751574, 37.573856],
        {
          balloonContentHeader: `<div>
          
          <div>
            <img src="/assets/img/logo.svg"/>
          </div>
          <div>
          <h3 style="text-align: center; font-family: 'Gilroy'">Автосалон</h3>
          <h3 style="text-align: center; font-size: 12px; text-transform: uppercase; font-family: 'Gilroy'">Москва</h3>
          </div>
          </div>`,
          balloonContentBody: `
          <h3 style="text-align: left; font-size: 20px; font-family: 'Gilroy'; margin-bottom: 10px;">Контакты</h3>
          <a href="tel:+74950213119"  style="text-align: left; font-size: 14px; font-family: 'Gilroy'; margin-bottom: 10px;">+7 (495) 021 31 19</a>
          <p  style="text-align: left; font-size: 14px; font-family: 'Gilroy'; margin-bottom: 10px;">Краснобогатырская улица, 2с22, Москва, 107564</p>
          <p  style="text-align: left; font-size: 14px; font-family: 'Gilroy'; margin-bottom: 10px;">Ежедневно с 8:00 до 21:00</p>
          `,
          balloonContentFooter: `<button style="padding: 8px 20px; background: #0039A6; color: white; border-radius: 5px;">Заказать звонок</button>`,
          hintContent: "Краснобогатырская улица, 2с22, Москва, 107564",
        },
        {
          iconLayout: "default#image",
          iconImageHref: "/assets/img/map.gif",
          iconImageSize: [40, 40],
          iconImageOffset: [-20, -20],
        }
      );

      // Добавляем метку на карту
      map.geoObjects.add(placemark);

      // Открываем балун сразу
      placemark.balloon.open();
    });
  };
  document.head.appendChild(yandexMapScript);
});
</script>
