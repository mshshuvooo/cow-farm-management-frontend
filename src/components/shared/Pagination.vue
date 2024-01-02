<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  meta: Object,
  searchTerm: Object,
  updateFunction: Function,
});

const pageCount = computed(() => props?.meta?.last_page);
const currentPage = computed(() => props?.meta?.current_page);
const pageRange = computed(() => {
  if (pageCount.value <= 5) {
    return [...Array(pageCount.value).keys()].map((i) => i + 1);
  }

  if (currentPage.value < 5) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage.value + 2 > pageCount.value) {
    return [...Array(5).keys()].map((i) => pageCount.value - i).reverse();
  }

  let start = currentPage.value - 2;
  let end = currentPage.value + 2;

  start = Math.max(start, 1);
  end = Math.min(end, pageCount.value);

  return [start, start + 1, currentPage.value, end - 1, end];
});
console.log(pageRange);

const searchTerm = computed(() => props.searchTerm);
const nextPageNumber = computed(() => currentPage.value + 1);
const prevPageNumber = computed(() => currentPage.value - 1);

const changePage = async (page = 1) => {
  if (page <= pageCount.value && page > 0) {
    await props.updateFunction({ page: page, ...searchTerm.value });
  }
};
</script>
<template>
  <div class="pagination mb-3">
    <div
      class="rounded-lg flex items-center justify-between bg-white px-4 py-3 sm:px-6"
    >
      <div class="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div class="sm:mb-0 mb-3">
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ props.meta?.from }}</span>
            to
            <span class="font-medium">{{ props.meta?.to }}</span>
            of
            <span class="font-medium">{{ props.meta?.total }}</span>
            results
          </p>
        </div>
        <div>
          <nav
            class="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              @click="changePage(prevPageNumber)"
              class="cursor-pointer relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-blue-100 focus:z-20"
            >
              <span class="sr-only">Previous</span>
              <FontAwesomeIcon
                class="text-gray-400"
                icon="fa-solid fa-chevron-left"
              />
            </div>
            <div
              v-for="(page, index) in pageRange"
              :key="index"
              @click="changePage(page)"
              aria-current="page"
              :class="[
                currentPage == page
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-white text-gray-500',
                'cursor-pointer relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-blue-100 focus:z-20',
              ]"
            >
              {{ page }}
            </div>

            <div
              @click="changePage(nextPageNumber)"
              class="cursor-pointer relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-blue-100 focus:z-20"
            >
              <span class="sr-only">Next</span>
              <FontAwesomeIcon
                class="text-gray-400"
                icon="fa-solid fa-chevron-right"
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
