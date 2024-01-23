<script setup>
import { formatDate } from "/src/lib/formatters.js";
import { geVaccineTypeName } from "/src/lib/commonFunctions.js";
const props = defineProps({
  vaccines: Array,
});

console.log(props.vaccines);
</script>

<template>
  <div class="flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div
          class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Vaccination Date
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Vaccine Type
                </th>

                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-[200px]"
                >
                  Dose
                </th>

                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Next Vaccination Date
                </th>

                <th
                  scope="col"
                  class="px-4 py-3.5 text-right text-sm font-semibold text-gray-900"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="vaccine in props.vaccines" :key="vaccine.id">
                <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  {{ formatDate(vaccine?.vaccination_date) }}
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  {{ geVaccineTypeName(vaccine?.vaccine_type) }}
                </td>
                <td
                  class="whitespace-nowrap px-4 py-3 text-sm text-gray-900 capitalize min-w-[200px]"
                >
                  {{ vaccine?.dose }}
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  {{ formatDate(vaccine?.next_vaccination_date) }}
                </td>
                <td
                  class="whitespace-nowrap px-4 py-3 text-sm text-gray-900 text-right"
                >
                  <router-link
                    class="text-blue-500 transition-all ease-in-out delay-100 duration-300 hover:text-blue-700"
                    :to="{
                      name: 'vaccineDetails',
                      params: { id: vaccine?.id },
                    }"
                  >
                    View Details
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
