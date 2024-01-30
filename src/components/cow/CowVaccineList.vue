<script setup>
import Pagination from "/src/components/shared/Pagination.vue";
import VaccineList from "/src/components/vaccine/VaccineList.vue";
import Search from "/src/components/search/Search.vue";
import FilterVaccineByType from "/src/components/search/FilterVaccineByType.vue";
import { ref } from "vue";
import { getVaccines } from "../../services/vaccine/vaccine.service";

const props = defineProps({
  cow: Object,
});
const vaccines = ref([]);
const vaccinePageMeta = ref();

const vaccineSearchTerm = ref({
  cow: props?.cow?.ear_tag_no,
  search: "",
  vaccineType: "",
});

const fetchVaccines = async (params) => {
  const vaccinesResponse = await getVaccines(params);
  vaccines.value = vaccinesResponse.data;
  vaccinePageMeta.value = vaccinesResponse.meta;
  return vaccinesResponse;
};

const searchVaccine = async (result) => {
  vaccineSearchTerm.value.search = result;
  fetchVaccines({
    page: 1,
    ...vaccineSearchTerm.value,
  });
};

const filterVaccineByVaccineType = async (result) => {
  vaccineSearchTerm.value.vaccineType = result;
  fetchVaccines({
    page: 1,
    ...vaccineSearchTerm.value,
  });
};

await fetchVaccines({
  page: 1,
  ...vaccineSearchTerm.value,
});
</script>

<template>
  <div class="bg-white rounded-md mt-5">
    <div class="px-4 pt-6">
      <h3 class="text-xl font-semibold leading-7 text-gray-900">Vaccine</h3>
      <p class="mt-1 text-md leading-6 text-gray-500">
        Vaccine list of {{ cow?.name }}
      </p>
    </div>
    <div class="p-4 mt-5">
      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-6">
          <label class="mb-2 block">Search by Vaccine Date</label>
          <Search
            type="date"
            :glassIcon="false"
            :search="vaccineSearchTerm.search"
            @update:search="searchVaccine"
          />
        </div>
        <div class="col-span-6">
          <label class="mb-2 block">Filter by Vaccine Type</label>
          <FilterVaccineByType
            :vaccineType="vaccineSearchTerm.vaccineType"
            @filter:byVaccineType="filterVaccineByVaccineType"
          />
        </div>
      </div>
      <Pagination
        :updateFunction="fetchVaccines"
        :searchTerm="vaccineSearchTerm"
        :meta="vaccinePageMeta"
        bgColor="gray-50"
      />
      <VaccineList :vaccines="vaccines" />
    </div>
  </div>
</template>
