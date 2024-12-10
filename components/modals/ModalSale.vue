<template>
  <div class="sale">
    <closeBtn />
    <div class="col-img">
      <img src="~/assets/img/special-car.png" />
    </div>
    <div class="col-action">
      <heading title="Заявка на спецпредложение" :size="40" class="title" />
      <ul>
        <li v-for="(item, i) in list" :key="'form-list-item-' + i">
          <div class="list-icon">
            <Icon name="ep:check" :size="20" />
          </div>
          <div v-html="item"></div>
        </li>
      </ul>
      <Form :row="true" :deal-type="84" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Form from "../shared/Form.vue";
import closeBtn from "../ui/buttons/close-btn.vue";
import heading from "../ui/heading.vue";

const list = [
  "<span>Без</span> первоначального взноса",
  "Ставка от <span>7%</span>",
  "<span>ТО</span> или доп. оборудование в подарок",
];
</script>

<style scoped lang="scss">
.sale {
  background-image: url("~/assets/img/sale.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 90vw;
  @include flex-start;
  gap: 4rem;
  border-radius: 1rem;
  overflow: hidden;
  padding: 4rem;
}

.col-action {
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  li {
    @include flex-start;
    gap: 1rem;
    font-size: 2rem;
    font-weight: 500;
    :deep(span) {
      font-size: 2rem;
      color: $primary;
    }
  }
}

.list-icon {
  color: $primary;
}
</style>
