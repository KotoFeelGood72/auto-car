<template>
  <section class="programs mb-8">
    <div class="section_in">
      <heading
        title="Государственные программы"
        :level="2"
        :size="42"
        class="title"
      />
      <div class="row">
        <div class="col">
          <ProgramsCard
            v-for="(item, i) in programs"
            :key="'programs-item-' + i"
            :card="item"
          />
        </div>
        <div class="services-w">
          <heading
            title="Преимущества программы"
            :level="2"
            :size="32"
            class="subtitle"
          />
          <ul class="services">
            <li
              v-for="(item, i) in services"
              :key="'services-item-' + i"
              v-html="item.title"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProgramsCard from "../card/ProgramsCard.vue";
import heading from "../ui/heading.vue";

const programs = [
  { title: "Семейный автомобиль", txt: "Госпрограмма" },
  { title: "Первый автомобиль", txt: "Госпрограмма" },
  { title: "Медицинский работник", txt: "Госпрограмма" },
];

const services = [
  { title: "Автокредит <br/>от 7%" },
  { title: "Компенсация <br/>проезда" },
  { title: "5 лет гарантии или<br/> 150 000 пробега" },
  { title: "Кешбек 20% на 3<br/> ТО в подарок" },
];
</script>

<style scoped lang="scss">
.services-w {
  max-width: 32.5rem;
  @include bp($point_2) {
    max-width: 100%;
  }
}
.row {
  @include flex-start;
  align-items: flex-start;
  gap: 4.3rem;
  @include bp($point_2) {
    flex-direction: column;
  }
}

.title {
  margin-bottom: 4rem;
  @include bp($point_2) {
    margin-bottom: 3rem;
  }
}

.subtitle {
  margin-bottom: 4rem;
  @include bp($point_2) {
    margin-bottom: 3rem;
  }
}

.col {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @include bp($point_2) {
    gap: 1rem;
  }
}

.services {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @include bp($point_2) {
    gap: 1rem;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  li {
    position: relative;
    font-size: 2rem;
    font-weight: 500;
    padding-left: 2.7rem;
    @include bp($point_2) {
      width: 100%;
      font-size: 1.4rem;
      max-width: 45%;
    }
    &:before {
      content: "";
      background-color: $primary;
      width: 0.7rem;
      border-radius: 2rem;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
