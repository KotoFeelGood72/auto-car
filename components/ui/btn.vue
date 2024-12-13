<template>
  <button
    :class="[
      'btn',
      size,
      styles,
      color,
      { weight: weight },
      { full: full },
      'light',
    ]"
    :disabled="loading"
    @click="createRipple"
  >
    <div v-if="loading" class="loading">
      <Icon name="svg-spinners:ring-resize" :size="20" />
    </div>
    <span>{{ name }}</span>
    <div class="flash">
      <div class="flash-line"></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  name?: string;
  loading?: boolean;
  size?: "small" | "normal" | "medium" | "large";
  color?: "white" | "dark" | "gradient" | "blue";
  styles?: "secondary" | "primary";
  weight?: boolean;
  full?: boolean;
}>();

const createRipple = (e: MouseEvent) => {
  const btn = e.currentTarget as HTMLElement;
  const boundingBox = btn.getBoundingClientRect();
  const x = e.clientX - boundingBox.left;
  const y = e.clientY - boundingBox.top;

  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  btn.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
};
</script>

<style scoped lang="scss">
.btn {
  @include app;
  border-radius: 1rem;
  @include flex-center;
  gap: 2rem;
  cursor: pointer;
  position: relative; /* Для Ripple эффекта */
  overflow: hidden; /* Чтобы Ripple не выходил за пределы кнопки */
  transition: all 0.3s ease-in-out;
  color: $black;
  span {
    color: $black;
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

  &.large {
    height: 6rem;
    padding: 2rem;
    @include bp($point_2) {
      height: auto;
      padding: 1.5rem 2rem;
    }
    span {
      font-size: 2rem;
      font-family: $font_1;
      font-weight: 400;
      display: block;
      line-height: 100%;
      @include bp($point_2) {
        font-size: 1.6rem;
      }
    }
  }

  &.secondary {
    border: 0.1rem solid;
    &.blue {
      border-color: $primary;
      color: $primary;
    }
    &.white {
      border-color: $white;
      span {
        color: $white;
      }
      &:hover {
        background-color: #f7f7f71c;
      }
    }
    &.dark {
      border-color: $black;
      &:hover {
        background-color: #f7f7f7;
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
      span {
        color: $white;
      }
    }
    &.white {
      background-color: $white;
      span {
        color: $primary;
      }
    }
    &.blue {
      background-color: $primary;
      span {
        color: $white;
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

.loading {
  @include flex-center;
}

:deep(.ripple) {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;

  border-radius: 50%;
  background-color: white;

  pointer-events: none;
  opacity: 0.5;
  animation: ripple 0.5s linear;
}
@keyframes ripple {
  to {
    width: 15rem;
    height: 15rem;
    opacity: 0;
  }
}

.flash {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-8.5rem);
  animation-name: flash;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.flash-line {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(255, 255, 255, 0.1)),
    to(rgba(255, 255, 255, 0.4))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.4)
  );
  background: -o-linear-gradient(
    left,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.4)
  );
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.4)
  );
  width: 20%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 3rem;
  transform: skewX(-45deg);
}

@keyframes flash {
  20% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
