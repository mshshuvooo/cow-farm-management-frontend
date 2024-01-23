<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "/src/stores/auth.store";
import { getCows } from "/src/services/cow/cow.service";
import { useRoute, useRouter } from "vue-router";
import Button from "/src/components/shared/Button.vue";
import PageTitle from "/src/components/shared/PageTitle.vue";
import CowList from "/src/components/cow/CowList.vue";
import Search from "/src/components/search/Search.vue";
import FilterCowByGender from "/src/components/search/FilterCowByGender.vue";
import FilterCowByStatus from "/src/components/search/FilterCowByStatus.vue";
import Pagination from "/src/components/shared/Pagination.vue";
import SlideOver from "/src/components/shared/SlideOver.vue";
import AddNewCow from "/src/components/cow/AddNewCow.vue";
import SuccessNotification from "/src/components/shared/SuccessNotification.vue";

const auth = useAuthStore();
const cows = ref([]);
const pageMeta = ref();
const router = useRouter();
const route = useRoute();
const cowAddResult = ref({});
const showAddNewCowSlide = ref(false);
const openAddNewCowSlide = () => {
  showAddNewCowSlide.value = true;
};
const closeAddNewCowSlide = () => {
  showAddNewCowSlide.value = false;
};

const searchTerm = ref({
  search: route?.query?.search ?? "",
  gender: route?.query?.gender ?? "",
  status: route?.query?.status ?? "",
});

// Fetch Cows //
const fetchCows = async (params) => {
  const cowsResponse = await getCows(params);
  cows.value = cowsResponse.data;
  pageMeta.value = cowsResponse.meta;
  return cowsResponse;
};

const searchCow = async (result) => {
  searchTerm.value.search = result;
  fetchCows({
    page: 1,
    ...searchTerm.value,
  });
  router.push({
    path: "",
    query: {
      ...searchTerm.value,
    },
  });
};

const filterCowByGender = async (result) => {
  searchTerm.value.gender = result;
  fetchCows({
    page: 1,
    ...searchTerm.value,
  });
  router.push({
    path: "",
    query: {
      ...searchTerm.value,
    },
  });
};

const filterCowByStatus = async (result) => {
  searchTerm.value.status = result;
  fetchCows({
    page: 1,
    ...searchTerm.value,
  });
  router.push({
    path: "",
    query: {
      ...searchTerm.value,
    },
  });
};

watch(
  () => route.fullPath,
  () => {
    if (route.fullPath == "/cows") {
      searchTerm.value.search = "";
      searchTerm.value.gender = "";
      searchTerm.value.status = "";
      fetchCows({ page: 1, ...searchTerm.value });
    }
  }
);

const updateCowsAfterAddNew = async (result) => {
  showAddNewCowSlide.value = false;
  cowAddResult.value = result;

  if (
    Number.isInteger(pageMeta.value.total / pageMeta.value.per_page) &&
    pageMeta.value.total / pageMeta.value.per_page != 0
  ) {
    await fetchCows({
      page: pageMeta.value.last_page + 1,
      ...searchTerm.value,
    });
  } else {
    await fetchCows({ page: pageMeta.value.last_page, ...searchTerm.value });
  }
};

await fetchCows({ page: 1, ...searchTerm.value });
</script>

<template>
  <div class="bg-white px-10 py-2 mt-10 pb-12">
    <div class="grid grid-cols-2 items-center">
      <div>
        <PageTitle title="Cows" />
        <p>List of all cows</p>
      </div>
      <div class="text-end" v-if="auth?.user?.roles?.includes('admin')">
        <Button :onClick="openAddNewCowSlide" label="Add New Cow" />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-2 mt-10">
      <div class="col-span-6">
        <label class="mb-2 block">Search by Name or Ear Tag</label>
        <Search :search="searchTerm.search" @update:search="searchCow" />
      </div>
      <div class="col-span-3">
        <label class="mb-2 block">Filter by Gender</label>
        <FilterCowByGender
          :gender="searchTerm.gender"
          @filter:byGender="filterCowByGender"
        />
      </div>
      <div class="col-span-3">
        <label class="mb-2 block">Filter by Status</label>
        <FilterCowByStatus
          :status="searchTerm.status"
          @filter:byStatus="filterCowByStatus"
        />
      </div>
    </div>
  </div>

  <SlideOver
    v-if="auth?.user?.roles?.includes('admin')"
    title="Add New Cow"
    :openSlide="showAddNewCowSlide"
    @close:slideOver="closeAddNewCowSlide"
  >
    <AddNewCow @update:cowsAfterAddNew="updateCowsAfterAddNew" />
  </SlideOver>

  <SuccessNotification :apiResponse="cowAddResult" />

  <main
    class="lg:px-10 md:px-[20px] px-[20px] lg:pt-[20px] md:pt-[20px] pt-[20px] pb-[50px] bg-[#f1f5f9] min-h-screen"
  >
    <Pagination
      :updateFunction="fetchCows"
      :searchTerm="searchTerm"
      :meta="pageMeta"
    />
    <CowList view="full" :cows="cows" />
  </main>
</template>
