<script setup>
import { ref } from "vue";
import Multiselect from "@vueform/multiselect";
import Breadcrumb from "../../components/shared/Breadcrumb.vue";
import PageTitle from "../../components/shared/PageTitle.vue";
import Button from "../../components/shared/Button.vue";

const breadcrumbPages = [
  { name: "Cows", href: "/cows", current: false },
  { name: "Add New", href: "/cows/add-new", current: true },
];

const cowGender = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const cowInfo = ref({
  name: "",
  ear_tag_no: "",
  gender: "",
  date_of_birth: "",
  mother: "",
  father: "",
  purchase_price: "",
  purchase_date: "",
  prev_owner_info: "",
});
</script>

<template>
  <div class="grid grid-cols-2 items-center shadow-xl bg-[#fff5f1] px-10 py-2">
    <div>
      <PageTitle title="Add New Cow" />
      <Breadcrumb :pages="breadcrumbPages" />
    </div>
    <div class="text-end">
      <Button to="/cows/add-new" label="Add New Cow" />
    </div>
  </div>

  <main
    class="lg:px-10 md:px-[20px] px-[20px] lg:pt-[30px] md:pt-[30px] pt-[30px] pb-[50px] bg-[#ecf0f2] min-h-screen"
  >
    <div class="bg-white p-5 mt-2 rounded ">
      <form>
        <div class="grid grid-cols-2 gap-3">
          <div class="">
            <label
              class="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >Cow Name</label
            >
            <input
              class="appearance-none block w-full px-3 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              type="text"
              placeholder="Name"
              v-model="cowInfo.name"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >Ear Tag Number</label
            >
            <input
              class="appearance-none block w-full px-3 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              type="text"
              placeholder="Ear Tag"
              v-model="cowInfo.name"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >Date of Birth</label
            >
            <input
              class="appearance-none block w-full px-3 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              type="date"
              placeholder="Date of Birth"
              v-model="cowInfo.date_of_birth"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >Select Gender</label
            >

            <Multiselect
              v-model="cowInfo.gender"
              mode="single"
              label="label"
              placeholder="Select Gender"
              :close-on-select="true"
              :searchable="false"
              :options="cowGender"
              class="border border-gray-300 h-[52px]"
              :classes="{
                containerActive: 'ring-[.5px] ring-blue-600',
                optionSelected: 'bg-blue-600 text-white',
                optionSelectedPointed: 'bg-blue-600 text-white ',
              }"
            >
            </Multiselect>
          </div>

          <div>
            <label
              class="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >Mother</label
            >

            <Multiselect
              v-model="cowInfo.mother"
              mode="single"
              label="label"
              placeholder="Select Mother"
              :close-on-select="true"
              :searchable="false"
              :options="cowGender"
              class="border border-gray-300 h-[52px]"
              :classes="{
                containerActive: 'ring-[.5px] ring-blue-600',
                optionSelected: 'bg-blue-600 text-white',
                optionSelectedPointed: 'bg-blue-600 text-white ',
              }"
            >
            </Multiselect>
          </div>

          <div>
            <label
              class="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >Father ID</label
            >
            <input
              class="appearance-none block w-full px-3 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              type="number"
              placeholder="Father Bull ID"
              v-model="cowInfo.father"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >Purchase Price</label
            >
            <input
              class="appearance-none block w-full px-3 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              type="number"
              placeholder="Price"
              v-model="cowInfo.purchase_price"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >Purchase Date</label
            >
            <input
              class="appearance-none block w-full px-3 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              type="date"
              placeholder="Date of Birth"
              v-model="cowInfo.purchase_date"
            />
          </div>
        </div>
        <div class="mt-3">
          <label class="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >Previous Owner Info</label
          >
          <textarea
            rows="3"
            class="appearance-none block w-full px-3 py-3.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            placeholder="Previous Owner Info"
            v-model="cowInfo.prev_owner_info"
          ></textarea>
        </div>
        <div class="mt-3">
          <Button type="submit" label="Add New Cow" />
        </div>
      </form>
    </div>
  </main>
</template>
