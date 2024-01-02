<script setup>
import { ref, watch } from "vue";
import Breadcrumb from "../../components/shared/Breadcrumb.vue";
import Button from "../../components/shared/Button.vue";
import PageTitle from "../../components/shared/PageTitle.vue";
import { getCows } from "../../services/cow/cow.service";
import { useAuthStore } from "../../stores/auth.store";
import { useRoute, useRouter } from "vue-router";
import CowList from "../../components/cows/CowList.vue";
import Search from "../../components/search/Search.vue";
import FilterCowByGender from "../../components/search/FilterCowByGender.vue";
import FilterCowByStatus from "../../components/search/FilterCowByStatus.vue";
import Pagination from "../../components/shared/Pagination.vue";

const breadcrumbPages = [{ name: "Cows", href: "/cows", current: true }];
const auth = useAuthStore();

const cows = ref([]);
const pageMeta = ref();
const router = useRouter();
const route = useRoute();
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

fetchCows({ page: 1, ...searchTerm.value });
</script>

<template>
  <div class="bg-white px-10 py-2 mt-10 pb-12">
    <div class="grid grid-cols-2 items-center">
      <div>
        <PageTitle title="Cows" />
        <p>List of all cows</p>
      </div>
      <div class="text-end">
        <Button to="/cows/add-new" label="Add New Cow" />
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
          @update:gender="filterCowByGender"
        />
      </div>
      <div class="col-span-3">
        <label class="mb-2 block">Filter by Status</label>
        <FilterCowByStatus
          :status="searchTerm.status"
          @update:status="filterCowByStatus"
        />
      </div>
    </div>
  </div>

  <main
    class="lg:px-10 md:px-[20px] px-[20px] lg:pt-[20px] md:pt-[20px] pt-[20px] pb-[50px] bg-[#f1f5f9] min-h-screen"
  >
    <Pagination
      :updateFunction="fetchCows"
      :searchTerm="searchTerm"
      :meta="pageMeta"
    />
    <CowList :cows="cows" />
  </main>
</template>
