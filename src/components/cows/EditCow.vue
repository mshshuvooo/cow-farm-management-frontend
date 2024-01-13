<script setup>
import { ref } from "vue";
import Multiselect from "@vueform/multiselect";
import Button from "/src/components/shared/Button.vue";
import { editCow, getCows } from "/src/services/cow/cow.service";
import ErrorMessages from "/src/components/shared/ErrorMessages.vue";
import { formatCurrency } from "/src/lib/formatters.js";
import { useRouter } from "vue-router";

const props = defineProps({
  cow: Object,
});

const router = useRouter();
const hasError = ref(false);
const errors = ref([]);
const emit = defineEmits(["update:cowAfterEdit"]);

const cowGender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const cowStatus = [
  { label: "Active", value: "active" },
  { label: "Sold", value: "sold" },
  { label: "Dead", value: "dead" },
];

let cowMothers = await getCows({
  display: "simple",
  gender: "female",
});

cowMothers = cowMothers?.data?.map(({ id, name, ear_tag_no }) => ({
  value: id,
  id: id,
  name: `${name} - (${ear_tag_no})`,
}));

const cowInfo = ref({
  name: props?.cow?.name ?? "",
  ear_tag_no: props?.cow?.ear_tag_no ?? "",
  gender: props?.cow?.gender ?? "",
  status: props?.cow?.status ?? "",
  date_of_birth: props?.cow?.date_of_birth ?? "",
  mother_id: props?.cow?.mother?.id ?? "",
  father: props?.cow?.father ?? "",
  purchase_price: props?.cow?.purchase_price ?? null,
  purchase_date: props?.cow?.purchase_date ?? "",
  extra_info: props?.cow?.extra_info ?? "",
});

const handleAddNewCow = async (e) => {
  e.preventDefault();
  const result = await editCow(props?.cow?.ear_tag_no, cowInfo);
  if (result?.data?.success) {
    emit("update:cowAfterEdit", result);
    router.push({
      path: `/cows/${result?.data?.data?.ear_tag_no}`,
    });
    hasError.value = false;
    errors.value = [];
  } else {
    errors.value = result?.response?.data?.errors;
    hasError.value = true;
  }
};
</script>

<template>
  <form @submit="handleAddNewCow">
    <div class="grid grid-cols-1 gap-3">
      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white"
          >Cow Name</label
        >
        <input
          class="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
          required
          type="text"
          placeholder="Name"
          v-model="cowInfo.name"
        />
        <ErrorMessages :errors="errors?.name" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white"
          >Ear Tag Number</label
        >
        <input
          class="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
          required
          type="text"
          placeholder="Ear Tag"
          v-model="cowInfo.ear_tag_no"
        />
        <ErrorMessages :errors="errors?.ear_tag_no" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white"
          >Date of Birth</label
        >
        <input
          class="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
          type="date"
          placeholder="Date of Birth"
          v-model="cowInfo.date_of_birth"
        />
        <ErrorMessages :errors="errors?.date_of_birth" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white z-10"
          >Gender</label
        >

        <Multiselect
          v-model="cowInfo.gender"
          mode="single"
          label="label"
          placeholder="Select Gender"
          :close-on-select="true"
          :searchable="false"
          :options="cowGender"
          required
          class="border border-gray-300 h-[52px]"
          :classes="{
            containerActive: 'ring-[.5px] ring-blue-600',
            optionSelected: 'bg-blue-600 text-white',
            optionSelectedPointed: 'bg-blue-600 text-white',
          }"
        >
        </Multiselect>
        <ErrorMessages :errors="errors?.gender" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white z-10"
          >Status</label
        >

        <Multiselect
          v-model="cowInfo.status"
          mode="single"
          label="label"
          placeholder="Select Status"
          :close-on-select="true"
          :searchable="false"
          :options="cowStatus"
          required
          class="border border-gray-300 h-[52px]"
          :classes="{
            containerActive: 'ring-[.5px] ring-blue-600',
            optionSelected: 'bg-blue-600 text-white',
            optionSelectedPointed: 'bg-blue-600 text-white',
          }"
        >
        </Multiselect>
        <ErrorMessages :errors="errors?.status" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white z-10"
          >Mother</label
        >

        <Multiselect
          v-model="cowInfo.mother_id"
          mode="single"
          label="name"
          placeholder="Select Mother"
          :close-on-select="true"
          :searchable="true"
          :options="cowMothers"
          class="border border-gray-300 h-[52px]"
          :classes="{
            containerActive: 'ring-[.5px] ring-blue-600',
            optionSelected: 'bg-blue-600 text-white',
            optionSelectedPointed: 'bg-blue-600 text-white ',
          }"
        >
        </Multiselect>
        <ErrorMessages :errors="errors?.mother_id" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white"
          >Father Bull ID</label
        >
        <input
          class="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
          type="text"
          placeholder="Father"
          v-model="cowInfo.father"
        />
        <ErrorMessages :errors="errors?.father" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white"
          >Purchase Price</label
        >
        <input
          class="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
          type="number"
          placeholder="Price"
          v-model="cowInfo.purchase_price"
        />
        <ErrorMessages :errors="errors?.purchase_price" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white"
          >Purchase Date</label
        >
        <input
          class="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
          type="date"
          placeholder="Date of Birth"
          v-model="cowInfo.purchase_date"
        />
        <ErrorMessages :errors="errors?.purchase_date" />
      </div>

      <div class="relative mb-3">
        <label
          class="inline-block text-sm font-medium leading-6 text-gray-900 absolute top-[-12px] left-2 px-2 bg-white"
          >Extra Informations</label
        >
        <textarea
          rows="3"
          class="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
          placeholder="Some Extra Info"
          v-model="cowInfo.extra_info"
        ></textarea>
        <ErrorMessages :errors="errors?.extra_info" />
      </div>
    </div>

    <div class="mt-3">
      <Button label="Update Cow" />
    </div>
  </form>
</template>

<style>
.multiselect {
  font-size: 0.875rem;
}
</style>
