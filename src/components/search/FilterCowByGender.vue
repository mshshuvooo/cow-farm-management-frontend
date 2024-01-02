<script setup>
import Multiselect from "@vueform/multiselect";
import { ref, watch } from "vue";
const props = defineProps({
  gender: String,
});
const emit = defineEmits(["update:gender"]);
const cowGender = [
  { label: "All", value: "" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const selectedGender = ref(props.gender);

watch(
  () => selectedGender.value,
  () => {
    emit("update:gender", selectedGender.value);
  }
);
</script>

<template>
  <Multiselect
    v-model="selectedGender"
    mode="single"
    label="label"
    placeholder="Select Gender"
    :close-on-select="true"
    :searchable="false"
    :options="cowGender"
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
