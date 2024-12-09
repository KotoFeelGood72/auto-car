<template>
  <button
    :class="['btn', size, styles, color, { weight: weight }, { full: full }]"
    :disabled="loading"
  >
    <div v-if="loading" class="loading">
      <Icon name="svg-spinners:ring-resize" :size="20" />
    </div>
    <span v-if="!loading">{{ name }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  name?: string;
  loading?: boolean;
  size?: "small" | "normal" | "medium" | "large";
  color?: "white" | "dark" | "gradient" | "blue";
  styles?: "secondary" | "primary";
  weight?: boolean;
  full?: boolean;
}>();
</script>

<style scoped lang="scss">
.btn {
  @include app;
  border-radius: 1rem;

  &.small {
  }
  &.normal {
    height: 4.5rem;
    padding: 1.3rem 2rem;
    span {
      font-size: 1.4rem;
      font-family: $font_1;
      font-weight: 400;
      display: flex;
      line-height: 100%;
    }
  }
  &.medium {
  }
  &.large {
    height: 6rem;
    padding: 2rem;
    span {
      font-size: 2rem;
      font-family: $font_1;
      font-weight: 400;
      display: block;
      line-height: 100%;
    }
  }

  &.secondary {
    border: 0.1rem solid;
    &.blue {
      border-color: $primary;
    }
    &.dark {
      border-color: $black;
      &:hover {
        background-color: $black;
        color: $white;
      }
    }
    &.blue {
      border-color: $primary;
    }
  }
  &.primary {
    color: $white;
    &.gradient {
      background: linear-gradient(to right, $primary, #63c7dd);
    }
    &.white {
      background-color: $white;
      color: $primary;
    }
    &.blue {
      background-color: $primary;
      &:hover {
        background-color: $darkPrimary;
      }
    }
  }
}

.weight {
  span {
    font-weight: 600 !important;
  }
}

.full {
  width: 100%;
}
</style>
