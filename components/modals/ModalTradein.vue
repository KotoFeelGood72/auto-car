<template>
  <div class="trade">
    <closeBtn />
    <div class="title-bg">
      <heading title="БЕСПЛАТНО" :size="32" color="white" />
    </div>
    <h3 class="title">Оценим ваш автомобиль <span>ВЫШЕ</span> рынка</h3>
    <div class="row">
      <div>Скидка <span>300 000 руб</span> на следующий автомобиль</div>
      <div>3 ТО в подарок</div>
    </div>
    <heading title="Укажите контактные данные" :size="24" />
    <Form :row="true" :deal-type="85" />
  </div>
</template>

<script setup lang="ts">
import Form from "../shared/Form.vue";
import closeBtn from "../ui/buttons/close-btn.vue";
import heading from "../ui/heading.vue";
</script>

<style scoped lang="scss">
.title-bg {
  background: linear-gradient(45deg, #0540a9, #63c7dd);
  display: inline-flex;
  padding: 1.5rem 2rem 0.5rem 2rem;
  border-radius: 1rem;
  margin: 1.5rem 0 3rem 0;
}

.title {
  font-size: 4.2rem;
  font-weight: 600;
  margin-bottom: 3rem;
  span {
    color: $primary;
    border-bottom: 0.2rem solid $primary;
    font-size: inherit;
  }
}

.trade {
  background-color: $white;
  border-radius: 1rem;
  padding: 4rem;
  max-width: 60rem;
}

.title {
  margin-bottom: 2rem;
}

.row {
  @include flex-start;
  gap: 1.5rem;
  font-size: 2.2rem;
  margin-bottom: 4rem;
  div {
    border-radius: 1rem;
    border: 0.2rem dashed #1f64b8ad;
    padding: 1rem 1.5rem;
    text-align: center;
    span {
      font-weight: 600;
      color: $primary;
      font-size: 2.2rem;
    }
  }
}
</style>
