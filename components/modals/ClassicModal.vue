<template>
  <div class="classic">
    <closeBtn />
    <heading title="Отправьте заявку" :level="2" :size="42" class="title" />
    <heading
      title="И наши сотрудники свяжутся с вами"
      :level="2"
      :size="20"
      class="subtitle"
    />
    <Form :deal-type="83" />
  </div>
</template>

<script setup lang="ts">
import Form from "../shared/Form.vue";
import heading from "../ui/heading.vue";
import closeBtn from "../ui/buttons/close-btn.vue";
</script>

<style scoped lang="scss">
.classic {
  background-color: #f7f7f7;
  width: 45vw;
  text-align: center;

  padding: 4rem 6rem;
  border-radius: 1rem;
}

.subtitle {
  margin-bottom: 4rem;
}
</style>
