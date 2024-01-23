<script setup>
import Multiselect from "@vueform/multiselect";
import { ref, watch } from "vue";
import { getCowVaccineTypes } from "../../lib/commonFunctions";
const props = defineProps({
  vaccineType: String,
});
const emit = defineEmits(["filter:byVaccineType"]);
const cowVaccineType = [
  { label: "All", value: "" },
  ...getCowVaccineTypes()
];



const selectedVaccineType = ref(props.vaccineType);

watch(
  () => selectedVaccineType.value,
  () => {
    emit("filter:byVaccineType", selectedVaccineType.value);
  }
);
</script>

<template>
  <Multiselect
    v-model="selectedVaccineType"
    mode="single"
    label="label"
    placeholder="Select A Vaccine Type"
    :close-on-select="true"
    :searchable="false"
    :options="cowVaccineType"
    class="h-[52px]"
    :classes="{
      containerActive: '',
      optionSelected: 'bg-blue-600 text-white',
      optionSelectedPointed: 'bg-blue-600 text-white ',
    }"
  >
  </Multiselect>
</template>
<style scoped>
.multiselect {
  background-color: #f9fafb;
  border-color: #e5e7eb;
}
</style>
