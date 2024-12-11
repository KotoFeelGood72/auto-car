<template>
  <div class="classic">
    <closeBtn />
    <heading :title="modalData.title" :level="2" :size="30" class="title" />
    <heading
      :title="modalData.name"
      :level="2"
      :size="24"
      class="subtitle"
      color="blue"
    />
    <div class="modal-img">
      <img :src="modalData?.img" />
    </div>
    <Form :deal-type="80" :row="true" />
  </div>
</template>

<script setup>
import Form from "../shared/Form.vue";
import heading from "../ui/heading.vue";
import closeBtn from "../ui/buttons/close-btn.vue";
import { useModalStoreRefs } from "~/stores/useModalStore";

const { modalData } = useModalStoreRefs();
</script>

<style scoped lang="scss">
.classic {
  background-color: #f7f7f7;
  width: 45vw;
  max-width: 55rem;
  text-align: center;

  padding: 4rem 6rem;
  border-radius: 1rem;

  @include bp($point_2) {
    padding: 6rem 1.5rem;
    border-radius: 0.5rem;
    width: 100%;
  }
}

.title {
  margin-bottom: 1rem;
}

.modal-img {
  max-width: 30rem;
  @include flex-center;
  background-color: #f7f7f7;
  padding: 1rem 0;
  margin: 0 auto;
  @include bp($point_2) {
    max-width: 20rem;
  }
}
</style>
