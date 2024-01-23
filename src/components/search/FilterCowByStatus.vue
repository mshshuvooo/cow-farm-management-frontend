<script setup>
import Multiselect from "@vueform/multiselect";
import { ref, watch } from "vue";
const props = defineProps({
  status: String,
});
const emit = defineEmits(["filter:byStatus"]);
const cowStatus = [
  { label: "All", value: "" },
  { label: "Active", value: "active" },
  { label: "Sold", value: "sold" },
  { label: "Dead", value: "dead" },
];

const selectedStatus = ref(props.status);

watch(
  () => selectedStatus.value,
  () => {
    emit("filter:byStatus", selectedStatus.value);
  }
);
</script>

<template>
  <Multiselect
    v-model="selectedStatus"
    mode="single"
    label="label"
    placeholder="Select Status"
    :close-on-select="true"
    :searchable="false"
    :options="cowStatus"
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
