<script setup>
const props = defineProps({
  cows: Array,
  view: String,
});
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
                  v-if="props.view == 'full'"
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
                <td
                  v-if="props.view == 'full'"
                  class="whitespace-nowrap px-4 py-3 text-sm text-gray-900"
                >
                  {{ cow?.mother?.name }}
                </td>
                <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  <span
                    :class="[
                      'uppercase px-3 py-0.5 rounded-full text-[11px] w-[70px] inline-block text-center font-semibold',
                      cow?.status == 'active'
                        ? 'bg-green-100 text-emerald-500'
                        : '',
                      cow?.status == 'sold'
                        ? 'bg-amber-100 text-amber-600'
                        : '',
                      cow?.status == 'dead' ? 'bg-red-100 text-red-500' : '',
                    ]"
                    >{{ cow?.status }}</span
                  >
                </td>
                <td
                  class="whitespace-nowrap px-4 py-3 text-sm text-gray-900 text-right"
                >
                  <router-link
                    class="text-blue-500 transition-all ease-in-out delay-100 duration-300 hover:text-blue-700"
                    :to="{
                      name: 'cowDetails',
                      params: { earTagNo: cow?.ear_tag_no },
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
