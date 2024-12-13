<template>
  <section class="trade mb-8" id="trade">
    <div class="section_in">
      <heading
        title="TRADE - IN по новому!"
        :level="2"
        :size="42"
        class="title"
      />
      <div class="row">
        <div class="col-left">
          <div class="col-top-left">
            <heading
              title="Ваши преимущества:"
              :level="2"
              :size="32"
              class="subtitle"
            />
            <p>При использовании услуги</p>
          </div>
          <div class="grid">
            <div
              class="grid-item"
              v-for="(item, i) in topservices"
              :key="'service-grid-item-' + i"
            >
              <heading
                :title="item.title"
                :level="2"
                :size="32"
                class="subtitle"
                color="blue"
                weight="bold"
              />
              <span class="">{{ item.txt }}</span>
            </div>
          </div>
          <Form :row="true" :deal-type="85" />
        </div>
        <div class="img">
          <img src="~/assets/img/tradein.jpg" alt="Трейд ин" />
        </div>
      </div>
      <ul class="row-services" id="credit">
        <li
          v-for="(item, i) in services"
          :key="'services-item-' + i"
          class="row-item"
        >
          <div class="item-icon">
            <Icon :name="'f:' + item.icon" :size="35" />
          </div>
          <div>
            <p class="item-title">{{ item.title }}</p>
            <span class="item-text">{{ item.txt }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import heading from "../ui/heading.vue";
import Form from "../shared/Form.vue";
defineProps<{
  topservices: any;
  services: any;
}>();
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 4rem;
}

.row {
  @include flex-start;
  align-items: flex-start;
  gap: 4.3rem;
  margin-bottom: 4.1rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 2rem;
  }
}

.col-left {
  border: 0.1rem solid $border;
  border-radius: 1rem;
  padding: 4rem;
  max-width: 63.5rem;
  @include bp($point_2) {
    padding: 3rem 2rem;
    order: 1;
  }
}

.col-top-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
  @include bp($point_2) {
    gap: 0.5rem;
  }
  p {
    font-size: 2rem;
  }
}

.grid {
  @include flex-start;
  gap: 2rem;
  margin-bottom: 2.5rem;
  div {
    position: relative;
    text-align: center;

    h2 {
      @include bp($point_2) {
        font-size: 1.4rem;
      }
    }
    &:not(:last-child) {
      padding-right: 2rem;
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        border-right: 0.1rem solid $border;
        height: 100%;
      }
    }
  }
}

.img {
  @include flex-center;
  border-radius: 1rem;
  overflow: hidden;
  @include bp($point_2) {
    order: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.row-services {
  @include flex-space;
  @include bp($point_2) {
    flex-wrap: wrap;
    gap: 1rem;
  }
  li {
    @include flex-start;
    gap: 2.5rem;

    p {
      font-size: 1.8rem;
    }
    span {
      font-size: 1.6rem;
    }

    &:last-child {
      .item-icon {
        padding: 1.2rem;
      }
    }
  }
}

.item-icon {
  width: 6.5rem;
  height: 6.5rem;
  @include flex-center;
  border: 0.1rem solid $primary;
  border-radius: 1rem;
}
</style>
