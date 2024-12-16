<template>
  <div class="shop">
    <div class="shop-grid">
      <ModelsGrid :models="brands" />
      <div class="section_in">
        <div class="grid">
          <AutoCard v-for="item in paginatedCars" :key="item.id" :card="item" />
        </div>
        <div class="pagination" v-if="totalPages > 1">
          <div
            class="nav-btn"
            :class="{ disabled: currentPage === 1 }"
            @click="changePage(currentPage - 1)"
          >
            <Icon name="bytesize:chevron-left" :size="16" />
          </div>
          <ul class="pagination-list">
            <li
              v-for="page in visiblePages"
              :key="page"
              :class="{ active: page === currentPage }"
              @click="changePage(page)"
            >
              {{ page }}
            </li>
          </ul>
          <div
            class="nav-btn"
            :class="{ disabled: currentPage === totalPages }"
            @click="changePage(currentPage + 1)"
          >
            <Icon name="bytesize:chevron-right" :size="16" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AutoCard from "~/components/card/AutoCard.vue";
import ModelsGrid from "~/components/blocks/ModelsGrid.vue";
// import { useRoute, useRouter } from "vue-router";
import { useCars } from "~/composables/useCars";
// import { useSeo } from "~/composables/useSeo";

const {
  useGetAll,
  paginatedCars,
  brands,
  cars,
  filteredCars,
  selectedBrand,
  filterByBrand,
  currentPage,
  itemsPerPage,
  setCurrentPage,
} = useCars();

const route = useRoute();
const router = useRouter();

// Применяем фильтр из URL при загрузке страницы
onMounted(() => {
  useGetAll().then(() => {
    const brandFromUrl = route.params.brand as string | null;
    if (brandFromUrl) {
      filterByBrand(brandFromUrl);
    }
    const pageFromUrl = parseInt(route.query.page as string) || 1;
    setCurrentPage(pageFromUrl); // Устанавливаем текущую страницу из URL
  });

  useSeo({
    title:
      route.params.brand.toString() ||
      "Автокар - Новые автомобили Geely в Москве",
    description:
      "Откройте для себя лучшие автомобили" +
      route.params.brand.toString() +
      " в автосалоне Автокар. Удобные условия покупки, кредит, тест-драйв в Москве.",
  });
});

// Изменяем текущую страницу и обновляем URL
const changePage = (page: number) => {
  setCurrentPage(page); // Устанавливаем новую текущую страницу
  router.push({ query: { ...route.query, page: page.toString() } }); // Обновляем URL
};

const totalPages = computed(() => {
  const totalItems = selectedBrand
    ? filteredCars.value.length
    : cars.value.length;
  return Math.ceil(totalItems / itemsPerPage.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  const maxVisible = 5;

  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<style scoped lang="scss">
.shop-grid {
  padding: 6rem 0;
  @include bp($point_2) {
    padding-top: 4rem;
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23%, 1fr));
  grid-gap: 2rem;
  margin-bottom: 4rem;
  @include bp($point_2) {
    grid-gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(47%, 1fr));
  }
}

.pagination-list {
  @include flex-start;
  gap: 1rem;
  li {
    width: 4rem;
    height: 4rem;
    @include flex-center;
    font-size: 1.8rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: all 0.3s ease-in-out;
    @include bp($point_2) {
      width: 3rem;
      height: 3rem;
      font-size: 1.6rem;
    }
    &:hover {
      background-color: #e0e0e0;
    }
    &.active {
      background-color: $primary;
      color: $white;
    }
  }
}

.pagination {
  @include flex-start;
  gap: 2rem;
  @include bp($point_2) {
    justify-content: center;
  }
}

.nav-btn {
  width: 4rem;
  height: 4rem;
  @include flex-center;
  font-size: 1.8rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  background-color: #e0e0e0;
  @include bp($point_2) {
    width: 3rem;
    height: 3rem;
    font-size: 1.6rem;
  }

  &:hover:not(.disabled) {
    background-color: $primary;
    color: $white;
  }

  &.disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
}
</style>
