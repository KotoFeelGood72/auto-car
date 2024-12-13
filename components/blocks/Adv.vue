<template>
  <section class="adv mb-8">
    <div class="section_in">
      <div class="row">
        <div
          v-for="(item, i) in adv"
          :key="'adv-item-' + i"
          class="card"
          @click.prevent="
            openModal('call', {
              txt: item,
            })
          "
        >
          <div class="title" v-html="item"></div>
          <div class="decorator"></div>
          <div class="icon">
            <Icon name="fluent:chevron-right-28-regular" :size="20" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useModalStore } from "~/stores/useModalStore";

const { openModal } = useModalStore();
defineProps<{
  adv: any[];
}>();
</script>

<style scoped lang="scss">
.adv {
  margin-top: -6rem;
}
.row {
  @include flex-start;
  gap: 2rem;
  @include bp($point_2) {
    flex-direction: column;
    gap: 1rem;
  }

  .card {
    background-color: $primary;
    border-radius: 1rem;
    padding: 2.4rem 3.8rem;
    overflow: hidden;
    color: $white;
    font-size: 2.4rem;
    position: relative;
    cursor: pointer;
    flex-grow: 1;

    @include bp($point_2) {
      font-size: 1.6rem;
      width: 100%;
    }

    &:hover {
      .icon {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  .decorator {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 1rem;
    width: 70%;
    border-top-left-radius: 1rem;
    background-color: $white;
    opacity: 0.5;
  }
}

.icon {
  position: absolute;
  top: 2rem;
  right: 2rem;
  opacity: 0;
  transform: translateX(-1rem);
  @include flex-center;
  transition: all 0.3s ease-in-out;
}
</style>
