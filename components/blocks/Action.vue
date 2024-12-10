<template>
  <section class="action mb-8">
    <div class="section_in">
      <div class="row">
        <div class="img">
          <img src="~/assets/img/forms.png" alt="Обратная связь" />
        </div>
        <div class="forms">
          <div class="form-head">
            <heading
              title="Не нашли свое авто"
              :level="2"
              :size="32"
              class="title"
            />
            <p>Оставь заявку - получи подбор!</p>
          </div>
          <Form :deal-type="84" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import heading from "../ui/heading.vue";
import Form from "../shared/Form.vue";
</script>

<style scoped lang="scss">
.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 4rem;
}

.forms {
  border: 0.1rem solid $border;
  padding: 4rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.form-head {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.img {
  @include flex-center;
  height: 47.9rem;
  border-radius: 1rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
