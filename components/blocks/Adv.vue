<template>
  <section class="adv mb-8">
    <div class="section_in">
      <div class="row">
        <div v-for="(item, i) in adv" :key="'adv-item-' + i" class="card">
          <p class="title">{{ item }}</p>
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
const props = defineProps<{
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

  .card {
    background-color: $primary;
    border-radius: 1rem;
    padding: 2.4rem 3.8rem;
    overflow: hidden;
    color: $white;
    font-size: 2.4rem;
    position: relative;
    cursor: pointer;

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
