<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "/src/stores/auth.store";
import { getVaccines } from "/src/services/vaccine/vaccine.service";
import { useRoute, useRouter } from "vue-router";
import Button from "/src/components/shared/Button.vue";
import PageTitle from "/src/components/shared/PageTitle.vue";
import VaccineList from "/src/components/vaccine/VaccineList.vue";
import Search from "/src/components/search/Search.vue";

import Pagination from "/src/components/shared/Pagination.vue";
import SlideOver from "/src/components/shared/SlideOver.vue";
import AddNewVaccine from "/src/components/vaccine/AddNewVaccine.vue";
import SuccessNotification from "/src/components/shared/SuccessNotification.vue";
import FilterVaccineByType from "../../components/search/FilterVaccineByType.vue";

const auth = useAuthStore();
const vaccines = ref([]);
const pageMeta = ref();
const router = useRouter();
const route = useRoute();
const vaccineAddResult = ref({});
const showAddNewVaccineSlide = ref(false);
const openAddNewVaccineSlide = () => {
  showAddNewVaccineSlide.value = true;
};
const closeAddNewVaccineSlide = () => {
  showAddNewVaccineSlide.value = false;
};

const searchTerm = ref({
  search: route?.query?.search ?? "",
  vaccineType: route?.query?.vaccineType ?? "",
});

// Fetch Vaccines //
const fetchVaccines = async (params) => {
  const vaccinesResponse = await getVaccines(params);
  vaccines.value = vaccinesResponse.data;
  pageMeta.value = vaccinesResponse.meta;
  return vaccinesResponse;
};

const searchVaccine = async (result) => {
  searchTerm.value.search = result;
  fetchVaccines({
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

const filterVaccineByVaccineType = async (result) => {
  searchTerm.value.vaccineType = result;
  fetchVaccines({
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
    if (route.fullPath == "/vaccines") {
      searchTerm.value.search = "";
      searchTerm.value.vaccineType = "";
      fetchVaccines({ page: 1, ...searchTerm.value });
    }
  }
);

const updateVaccinesAfterAddNew = async (result) => {
  showAddNewVaccineSlide.value = false;
  vaccineAddResult.value = result;

  if (
    Number.isInteger(pageMeta.value.total / pageMeta.value.per_page) &&
    pageMeta.value.total / pageMeta.value.per_page != 0
  ) {
    await fetchVaccines({
      page: pageMeta.value.last_page + 1,
      ...searchTerm.value,
    });
  } else {
    await fetchVaccines({
      page: pageMeta.value.last_page,
      ...searchTerm.value,
    });
  }
};

await fetchVaccines({ page: 1, ...searchTerm.value });
</script>

<template>
  <div class="bg-white px-10 py-2 mt-10 pb-12">
    <div class="grid grid-cols-2 items-center">
      <div>
        <PageTitle title="Vaccines" />
        <p>List of all vaccines</p>
      </div>
      <div class="text-end" v-if="auth?.user?.roles?.includes('admin')">
        <Button :onClick="openAddNewVaccineSlide" label="Add New Vaccine" />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-2 mt-10">
      <div class="col-span-6">
        <label class="mb-2 block">Search by Vaccine Date</label>
        <Search
          type="date"
          :glassIcon="false"
          :search="searchTerm.search"
          @update:search="searchVaccine"
        />
      </div>
      <div class="col-span-6">
        <label class="mb-2 block">Filter by Vaccine Type</label>
        <FilterVaccineByType
          :vaccineType="searchTerm.vaccineType"
          @filter:byVaccineType="filterVaccineByVaccineType"
        />
      </div>
    </div>
  </div>

  <SlideOver
    v-if="auth?.user?.roles?.includes('admin')"
    title="Add New Vaccine"
    :openSlide="showAddNewVaccineSlide"
    @close:slideOver="closeAddNewVaccineSlide"
  >
    <AddNewVaccine @update:vaccinesAfterAddNew="updateVaccinesAfterAddNew" />
  </SlideOver>

  <SuccessNotification :apiResponse="vaccineAddResult" />

  <main
    class="lg:px-10 md:px-[20px] px-[20px] lg:pt-[20px] md:pt-[20px] pt-[20px] pb-[50px] bg-[#f1f5f9] min-h-screen"
  >
    <Pagination
      :updateFunction="fetchVaccines"
      :searchTerm="searchTerm"
      :meta="pageMeta"
    />
    <VaccineList :vaccines="vaccines" />
  </main>
</template>
