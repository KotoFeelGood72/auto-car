<template>
  <div id="map" class="map"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useModalStore } from "../../stores/useModalStore";

const { openModal } = useModalStore();

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

      // Создаем кастомный контент балуна с кнопкой
      const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        `
        <div>
          <div style="max-width: 20rem; margin-bottom: 2rem;">
            <img src="/assets/img/logo.svg" />
          </div>
          <h3 style="text-align: left; font-size: 2rem; font-family: 'Gilroy'; margin-bottom: 1rem;">
            Контакты
          </h3>
          <a href="tel:+74950213119" style="text-align: left; font-size: 1.4rem; font-family: 'Gilroy'; margin-bottom: 2rem;">
            +7 (495) 021 31 19
          </a>
          <p style="text-align: left; font-size: 1.4rem; font-family: 'Gilroy'; margin-bottom: 1rem;">
            Краснобогатырская улица, 2с22, Москва, 107564
          </p>
          <p style="text-align: left; font-size: 1.4rem; font-family: 'Gilroy'; margin-bottom: 1rem;">
            Ежедневно с 8:00 до 21:00
          </p>
          <button id="orderCallButton"  style="cursor: pointer; padding: .8rem 2rem; background: #0039A6; color: white; border-radius: .5rem;">
            Заказать звонок
          </button>
        </div>
        `,
        {
          build: function () {
            BalloonContentLayout.superclass.build.call(this);

            // Добавляем обработчик на кнопку
            const orderCallButton = document.getElementById("orderCallButton");
            if (orderCallButton) {
              orderCallButton.addEventListener("click", () => {
                openModal("call"); // Открываем модальное окно
              });
            }
          },
          clear: function () {
            // Убираем обработчики
            const orderCallButton = document.getElementById("orderCallButton");
            if (orderCallButton) {
              orderCallButton.removeEventListener("click", () => {
                openModal("call");
              });
            }
            BalloonContentLayout.superclass.clear.call(this);
          },
        }
      );

      // Кастомная метка с балуном
      const placemark = new ymaps.Placemark(
        [55.751574, 37.573856],
        {},
        {
          iconLayout: "default#image",
          iconImageHref: "/assets/img/marker.svg",
          iconImageSize: [60, 60],
          iconImageOffset: [-20, -20],
          balloonContentLayout: BalloonContentLayout, // Указываем кастомный Layout
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

<style lang="scss" scoped>
.map {
  height: 34rem;
  width: 100%;
}
</style>
