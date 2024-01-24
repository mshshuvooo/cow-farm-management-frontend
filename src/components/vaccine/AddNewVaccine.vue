<script setup>
import { ref } from "vue";
import {
  getCowVaccineTypes,
  getCowVaccineDose,
} from "/src/lib/commonFunctions";
import { formatDate } from "/src/lib/formatters.js";

import {
  addNewVaccine,
  getVaccines,
} from "/src/services/vaccine/vaccine.service";
import Multiselect from "@vueform/multiselect";
import Button from "/src/components/shared/Button.vue";
import ErrorMessages from "/src/components/shared/ErrorMessages.vue";
import { getCows } from "../../services/cow/cow.service";

const hasError = ref(false);
const errors = ref([]);
const emit = defineEmits(["update:vaccinesAfterAddNew"]);

let allCows = await getCows({
  display: "simple",
  status: "active",
});

allCows = allCows?.data?.map(({ id, name, ear_tag_no }) => ({
  value: id,
  id: id,
  name: `${name} - (${ear_tag_no})`,
}));

const cowSelect = ref();
const selectAllCow = () => {
  cowSelect.value.selectAll();
};

const vaccineInfo = ref({
  vaccination_date: "",
  dose: "",
  next_vaccination_date: "",
  vaccine_type: "",
  cows: [],
});

const handleAddNewVaccine = async (e) => {
  e.preventDefault();
  const result = await addNewVaccine(vaccineInfo);
  if (result?.data?.success) {
    emit("update:vaccinesAfterAddNew", result);
    hasError.value = false;
    errors.value = [];
  } else {
    errors.value = result?.response?.data?.errors;
    hasError.value = true;
  }
};
</script>

<template>
  <form @submit="handleAddNewVaccine">
    <div class="grid grid-cols-1 gap-3">
      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white"
          >Vaccination Date</label
        >
        <input
          class="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
          required
          type="date"
          :max="new Date().toLocaleDateString('en-ca')"
          placeholder="Select Date"
          v-model="vaccineInfo.vaccination_date"
        />
        <ErrorMessages :errors="errors?.vaccination_date" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white z-10"
          >Dose</label
        >
        <Multiselect
          v-model="vaccineInfo.dose"
          mode="single"
          label="label"
          required
          placeholder="Select Dose"
          :close-on-select="true"
          :searchable="false"
          :options="getCowVaccineDose()"
          class="h-[52px]"
          :classes="{
            containerActive: '',
            optionSelected: 'bg-blue-600 text-white',
            optionSelectedPointed: 'bg-blue-600 text-white ',
          }"
        />
        <ErrorMessages :errors="errors?.dose" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white z-10"
          >Vaccine Type</label
        >
        <Multiselect
          v-model="vaccineInfo.vaccine_type"
          mode="single"
          label="label"
          required
          placeholder="Select A Vaccine Type"
          :close-on-select="true"
          :searchable="false"
          :options="getCowVaccineTypes()"
          class="h-[52px]"
          :classes="{
            containerActive: '',
            optionSelected: 'bg-blue-600 text-white',
            optionSelectedPointed: 'bg-blue-600 text-white ',
          }"
        />
        <ErrorMessages :errors="errors?.vaccine_type" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white z-10"
          >Select Cows</label
        >
        <Multiselect
          v-model="vaccineInfo.cows"
          mode="tags"
          label="name"
          required
          placeholder="Select Cows for vaccination"
          :close-on-select="false"
          :searchable="true"
          :options="allCows"
          ref="cowSelect"
          class="border border-gray-300"
          :classes="{
            containerActive: '',
            tag: 'bg-blue-600 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 mt-3 flex items-center whitespace-nowrap',
          }"
        />
        <button
          class="text-white bg-rose-600 w-full mt-2 px-3 py-2.5 uppercase text-sm rounded-md transition-all ease-in-out delay-100 duration-300 hover:bg-blue-600"
          @click="selectAllCow"
          type="button"
        >
          Select all cow
        </button>
        <ErrorMessages :errors="errors?.cows" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white"
          >Next Vaccination Date</label
        >
        <input
          class="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
          required
          type="date"
          placeholder="Select Date"
          v-model="vaccineInfo.next_vaccination_date"
        />
        <ErrorMessages :errors="errors?.next_vaccination_date" />
      </div>
    </div>

    <div class="mt-3">
      <Button label="Add New Vaccine" />
    </div>
  </form>
</template>

<style scoped>
.multiselect {
  font-size: 0.875rem;
  min-height: 52px;
}
.multiselect.is-open{
  border-color: #2563eb;
}
</style>
