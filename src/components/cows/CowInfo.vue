<script setup>
import { formatDate, formatCurrency } from "/src/lib/formatters.js";
const props = defineProps({
  cow: Object,
});
const cowExtraInfo = () => {
  return props.cow?.extra_info?.replace(/\n/g, "<br>");
};
</script>
<template>
  <div class="bg-white rounded-md">
    <div class="px-4 pt-3">
      <h3 class="text-xl font-semibold leading-7 text-gray-900">
        Basic Information
      </h3>
      <p class="mt-1 text-md leading-6 text-gray-500">
        All basic information about {{ cow?.name }}
      </p>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-bold leading-6 text-gray-900">Name</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ cow?.name }}
          </dd>
        </div>

        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-bold leading-6 text-gray-900">
            Ear Tag Number
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ cow?.ear_tag_no }}
          </dd>
        </div>

        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-bold leading-6 text-gray-900">
            Date of Birth
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <span v-if="cow?.date_of_birth">{{
              formatDate(cow?.date_of_birth)
            }}</span>
          </dd>
        </div>

        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-bold leading-6 text-gray-900">Gender</dt>
          <dd
            class="capitalize mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ cow?.gender }}
          </dd>
        </div>

        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-bold leading-6 text-gray-900">Mother</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <router-link
              v-if="cow?.mother?.id"
              class="text-blue-500 transition-all ease-in-out delay-100 duration-300 hover:text-blue-700"
              :to="{
                name: 'cowDetails',
                params: { earTagNo: cow?.mother?.ear_tag_no },
              }"
            >
              {{ cow?.mother?.name }} - ({{ cow?.mother?.ear_tag_no }})
            </router-link>
          </dd>
        </div>

        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-bold leading-6 text-gray-900">
            Father Bull ID
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ cow?.father }}
          </dd>
        </div>

        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-bold leading-6 text-gray-900">
            Purchase Price
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ formatCurrency(cow?.purchase_price) }}
          </dd>
        </div>

        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-bold leading-6 text-gray-900">
            Purchase Date
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <span v-if="cow?.purchase_date">{{
              formatDate(cow?.purchase_date)
            }}</span>
          </dd>
        </div>

        <div
          class="rounded-b-md bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4"
        >
          <dt class="text-sm font-bold leading-6 text-gray-900">
            Extra Informations
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <div v-html="cowExtraInfo()"></div>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
