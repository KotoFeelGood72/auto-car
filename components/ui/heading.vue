<template>
  <component :is="`h${level}`" :class="[sizes, isColor]">
    {{ title }} <span><slot></slot></span>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string | number;
    level?: number;
    size?: number;
    color?: "dark" | "white" | "gradient" | "blue";
  }>(),
  {
    title: "",
    level: 3,
    size: 1,
    uppercase: false,
  }
);

const sizes = computed(() => {
  return `heading-${props.size}`;
});
const isColor = computed(() => {
  return `color-${props.color}`;
});
</script>

<style lang="scss" scoped>
.heading-16 {
  font-size: 16px;
  line-height: 100%;
  font-family: $font_1;
  line-height: 130%;
}
.heading-40 {
  font-size: 4rem;
  line-height: 120%;
  font-family: $font_1;
  font-weight: 600;
  @include bp($point_2) {
    font-size: 2.6rem;
    line-height: 140%;
  }
}
.heading-30 {
  font-size: 3rem;
  line-height: 120%;
  font-family: $font_1;
  font-weight: 600;
}
.heading-42 {
  font-size: 4.2rem;
  line-height: 120%;
  font-family: $font_1;
  font-weight: 600;
  @include bp($point_2) {
    font-size: 2.6rem;
  }
}
.heading-36 {
  font-size: 3.6rem;
  line-height: 120%;
  font-family: $font_1;
  font-weight: 600;
  @include bp($point_2) {
    font-size: 2.6rem;
  }
}
.heading-16 {
  font-size: 1.6rem;
  line-height: 100%;
  font-family: $font_1;
  font-weight: 600;
}
.heading-32 {
  font-size: 3.2rem;
  line-height: 100%;
  font-family: $font_1;
  font-weight: 600;
  @include bp($point_2) {
    font-size: 2.2rem;
  }
}
.heading-24 {
  font-size: 2.4rem;
  line-height: 130%;
  font-family: $font_1;
  font-weight: 500;
  @include bp($point_2) {
    font-size: 2rem;
  }
}
.heading-18 {
  font-size: 18px;
  line-height: 100%;
  font-family: $font_1;
}
.heading-20 {
  font-size: 20px;
  line-height: 100%;
  font-family: $font_1;
}

.heading-28 {
  font-size: 28px;
  line-height: 100%;
  font-family: $font_1;
}
.heading-100 {
  font-size: 100px;
  line-height: 100%;
  font-family: $font_1;
}
.heading-45 {
  line-height: 100%;
  font-family: $font_1;
  font-size: 36px;
}

.color-gradient {
  background: linear-gradient(45deg, #1a63e0 0%, #63c7dd 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @include bp($point_2) {
    background: linear-gradient(45deg, #aadafa 0%, #63c7dd 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.color-blue {
  color: $primary;
}
.color-white {
  color: $white;
}
</style>
