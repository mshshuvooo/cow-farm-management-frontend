<script setup>
import { ref, watch } from "vue";
import { getVaccine } from "/src/services/vaccine/vaccine.service";
import { getCows } from "/src/services/cow/cow.service";
import { useRoute, useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useAuthStore } from "/src/stores/auth.store";
import { formatDate } from "/src/lib/formatters.js";
import { geVaccineTypeName } from "/src/lib/commonFunctions.js";
import Multiselect from "@vueform/multiselect";
import PageTitle from "/src/components/shared/PageTitle.vue";
import SlideOver from "/src/components/shared/SlideOver.vue";
import SuccessNotification from "/src/components/shared/SuccessNotification.vue";
import EditVaccine from "/src/components/vaccine/EditVaccine.vue";
import { deleteVaccine } from "../../services/vaccine/vaccine.service";
import Pagination from "/src/components/shared/Pagination.vue";
import CowList from "/src/components/cow/CowList.vue";
import Search from "/src/components/search/Search.vue";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const cowPageMeta = ref();

const vaccine = ref({});
const vaccinatedCows = ref([]);
vaccine.value = await getVaccine(route?.params?.id);
watch(
  () => route?.params?.id,
  async () => {
    vaccine.value = await getVaccine(route?.params?.id);
  }
);

const cowSearchTerm = ref({
  search: route?.query?.search ?? "",
  vaccineId: route?.params?.id ?? "",
});

// Fetch vaccinated cows //
const fetchVaccinatedCows = async (params) => {
  const cowsResponse = await getCows(params);
  vaccinatedCows.value = cowsResponse.data;
  cowPageMeta.value = cowsResponse.meta;
  return cowsResponse;
};

const searchCow = async (result) => {
  cowSearchTerm.value.search = result;
  fetchVaccinatedCows({
    page: 1,
    ...cowSearchTerm.value,
  });
};

const vaccineUpdateResult = ref({});
const showEditVaccineSlide = ref(false);
const openEditVaccineSlide = () => {
  showEditVaccineSlide.value = true;
};
const closeEditVaccineSlide = () => {
  showEditVaccineSlide.value = false;
};

//Update vaccine data after edit
const updateVaccineAfterEdit = async (result) => {
  vaccine.value = result.data.data;
  fetchVaccinatedCows({ page: 1, ...cowSearchTerm.value });
  showEditVaccineSlide.value = false;
  vaccineUpdateResult.value = result;
};

//Delete Vaccine
const handleDeleteVaccine = async () => {
  const customerDeleteConfirmation = window.confirm(
    "Do you really want to delete this vaccine?"
  );
  if (customerDeleteConfirmation) {
    const result = await deleteVaccine(route?.params?.id);
    if (result.data.success) {
      router.push("/vaccines");
    }
  }
};

fetchVaccinatedCows({ page: 1, ...cowSearchTerm.value });
console.log(vaccine);
</script>

<template>
  <div class="bg-white px-10 py-2 mt-10 pb-12">
    <div class="grid grid-cols-2 items-center">
      <div>
        <p
          :class="[
            'uppercase px-3 py-0.5 rounded-full text-[13px] mb-3 inline-block text-center font-semibold tracking-wide bg-green-200 text-green-700',
          ]"
        >
          {{ geVaccineTypeName(vaccine?.vaccine_type) }}
        </p>
        <PageTitle :title="formatDate(vaccine?.vaccination_date)" />
        <p class="capitalize my-2"><b>Dose:</b> {{ vaccine?.dose }}</p>
        <p>
          <b>Next Vaccination Date:</b>
          {{ formatDate(vaccine?.next_vaccination_date) }}
        </p>
        
      </div>
      <div
        class="text-end text-white text-lg"
        v-if="auth?.user?.roles?.includes('admin')"
      >
        <button
          @click="openEditVaccineSlide"
          class="mr-2 bg-blue-600 w-[40px] h-[40px] text-center rounded-full transition-all ease-in-out delay-100 duration-300 hover:bg-rose-600"
          title="Edit Vaccine"
        >
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
        </button>
        <button
          @click="handleDeleteVaccine"
          class="bg-blue-600 w-[40px] h-[40px] text-center rounded-full transition-all ease-in-out delay-100 duration-300 hover:bg-rose-600"
          title="Delete Vaccine"
        >
          <FontAwesomeIcon icon="fa-solid fa-trash-can" />
        </button>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-2 mt-10">
      <div class="col-span-12">
        <label class="mb-2 block">Search Vaccinated Cow</label>
        <Search
          type="text"
          :search="cowSearchTerm.search"
          @update:search="searchCow"
        />
      </div>
    </div>
  </div>

  <SlideOver
    v-if="auth?.user?.roles?.includes('admin')"
    title="Edit Vaccine"
    :openSlide="showEditVaccineSlide"
    @close:slideOver="closeEditVaccineSlide"
  >
    <EditVaccine
      :vaccine="vaccine"
      @update:vaccineAfterEdit="updateVaccineAfterEdit"
    />
  </SlideOver>

  <SuccessNotification :apiResponse="vaccineUpdateResult" />

  <main
    class="lg:px-10 md:px-[20px] px-[20px] lg:pt-[20px] md:pt-[20px] pt-[20px] pb-[50px] bg-[#f1f5f9] min-h-screen"
  >
    <div class="bg-white rounded-md mt-5">
      <div class="px-4 pt-3">
        <h3 class="text-xl font-semibold leading-7 text-gray-900">Cows</h3>
        <p class="mt-1 text-md leading-6 text-gray-500">
          List of vaccinated cows
        </p>
      </div>
      <div class="p-4 mt-2">
        <Pagination
          :updateFunction="fetchVaccinatedCows"
          :searchTerm="cowSearchTerm"
          :meta="cowPageMeta"
          bgColor="gray-50"
        />
        <CowList view="full" :cows="vaccinatedCows" />
      </div>
    </div>
  </main>
</template>
