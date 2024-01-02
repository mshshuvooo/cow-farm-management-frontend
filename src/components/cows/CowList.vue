<script setup>
const props = defineProps({
  cows: Array,
});
</script>

<template>
  <div class="mt-8 flow-root">
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
                  Ear Tag
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Mother
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
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
              <tr v-for="cow in props.cows" :key="cow.id">
                <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  {{ cow?.ear_tag_no }}
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  {{ cow?.name }}
                </td>
                <td
                  class="whitespace-nowrap px-4 py-3 text-sm text-gray-900 capitalize"
                >
                  {{ cow?.gender }}
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  {{ cow?.mother?.name }}
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  <span
                    :class="[
                      'uppercase px-3 py-1 rounded-full text-xs w-[70px] inline-block text-center font-semibold',
                      cow?.status == 'active'
                        ? 'bg-emerald-500 text-white'
                        : '',
                      cow?.status == 'sold' ? 'bg-yellow-500' : '',
                      cow?.status == 'dead' ? 'bg-red-500 text-white' : '',
                    ]"
                    >{{ cow?.status }}</span
                  >
                </td>
                <td
                  class="whitespace-nowrap px-4 py-3 text-sm text-gray-900 text-right"
                >
                  <button class="text-blue-600">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
