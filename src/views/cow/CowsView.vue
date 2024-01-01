<script setup>
import { ref } from "vue";
import Breadcrumb from "../../components/shared/Breadcrumb.vue";
import Button from "../../components/shared/Button.vue";
import PageTitle from "../../components/shared/PageTitle.vue";
import { getCows } from "../../services/cow/cow.service";
import { useAuthStore } from "../../stores/auth.store";
import CowList from "../../components/cows/CowList.vue";
const breadcrumbPages = [{ name: "Cows", href: "/cows", current: true }];
const auth = useAuthStore();

const cows = ref([]);

// Fetch Cows //
const fetchCows = async (params) => {
  const cowsResponse = await getCows(params);
  cows.value = cowsResponse.data;
  return cowsResponse;
};

fetchCows();
</script>

<template>
  <div class="grid grid-cols-2 items-center bg-white px-10 py-2 mt-10 pb-12">
    <div>
      <PageTitle title="Cows" />
      <p>List of all cows</p>
    </div>
    <div class="text-end">
      <Button to="/cows/add-new" label="Add New Cow" />
    </div>
  </div>
  <main
    class="lg:px-10 md:px-[20px] px-[20px] lg:pt-[30px] md:pt-[30px] pt-[30px] pb-[50px] bg-[#f1f5f9] min-h-screen"
  >
    <CowList :cows="cows" />
  </main>
</template>
