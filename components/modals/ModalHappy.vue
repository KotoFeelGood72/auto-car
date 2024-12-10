<template>
  <div class="happy">
    <closeBtn />
    <div class="col-action">
      <heading title="ВАМ УЖЕ СДЕЛАЛИ ПРЕДЛОЖЕНИЕ?" :size="40" class="title" />
      <div class="title-bg">
        <heading
          title="МЫ СДЕЛАЕМ ЛУЧШЕ!"
          :size="32"
          class="title"
          color="white"
        />
      </div>
      <heading
        title="Оставьте заявку и менеджер Вам перезвонит"
        :size="20"
        class="text"
      />
      <Form :row="true" color="white" :deal-type="86" />
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
.happy {
  max-width: 142rem;
  background-image: url("~/assets/img/modal-happy.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 90vw;
  @include flex-end;
  gap: 4rem;
  border-radius: 1rem;
  overflow: hidden;
  color: $white;
  padding: 4rem;
  position: relative;
  @include bp($point_2) {
    padding: 6rem 1.5rem;
    border-radius: 0.5rem;
    width: 100%;
    flex-direction: column;
    max-height: 90dvh;
    overflow-y: auto;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: #000;
    opacity: 0.4;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
}

.col-action {
  max-width: 60rem;
  // display: flex;
  // flex-direction: column;
  position: relative;
  gap: 2rem;

  :deep(.notice) {
    color: $white;
  }
}

.title-bg {
  background: linear-gradient(45deg, #0540a9, #63c7dd);
  display: inline-flex;
  padding: 1.5rem 2rem 0.5rem 2rem;
  border-radius: 1rem;
  margin: 1.5rem 0 3rem 0;
}

.text {
  margin-bottom: 2rem;
  font-weight: 500;
}
</style>
