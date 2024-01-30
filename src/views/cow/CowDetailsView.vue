<script setup>
import { ref, watch } from "vue";
import { getCow } from "/src/services/cow/cow.service";
import { useRoute, useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { deleteCow } from "../../services/cow/cow.service";
import { useAuthStore } from "../../stores/auth.store";
import Multiselect from "@vueform/multiselect";
import PageTitle from "/src/components/shared/PageTitle.vue";
import CowInfo from "/src/components/cow/CowInfo.vue";
import SlideOver from "/src/components/shared/SlideOver.vue";
import SuccessNotification from "/src/components/shared/SuccessNotification.vue";
import EditCow from "/src/components/cow/EditCow.vue";
import CowChildren from "/src/components/cow/CowChildren.vue";
import CowVaccineList from "/src/components/cow/CowVaccineList.vue";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const cow = ref({});

cow.value = await getCow(route?.params?.earTagNo);
watch(
  () => route?.params?.earTagNo,
  async () => {
    cow.value = await getCow(route?.params?.earTagNo);
  }
);

const cowUpdateResult = ref({});
const showEditCowSlide = ref(false);
const openEditCowSlide = () => {
  showEditCowSlide.value = true;
};
const closeEditCowSlide = () => {
  showEditCowSlide.value = false;
};

const updateCowAfterEdit = async (result) => {
  cow.value = result.data.data;
  showEditCowSlide.value = false;
  cowUpdateResult.value = result;
};

const handleDeleteCow = async () => {
  const customerDeleteConfirmation = window.confirm(
    "Do you really want to delete this cow?"
  );
  if (customerDeleteConfirmation) {
    const result = await deleteCow(route?.params?.earTagNo);
    if (result.data.success) {
      router.push("/cows");
    }
  }
};

</script>

<template>
  <div class="bg-white px-10 py-2 mt-10 pb-12">
    <div class="grid grid-cols-2 items-center">
      <div>
        <PageTitle :title="cow?.name" />
        <p
          :class="[
            'uppercase px-3 py-0.5 rounded-full text-[11px] w-[70px] inline-block text-center font-semibold tracking-wide	',
            cow?.status == 'active' ? 'bg-green-200 text-green-700' : '',
            cow?.status == 'sold' ? 'bg-amber-100 text-amber-600' : '',
            cow?.status == 'dead' ? 'bg-red-100 text-red-500' : '',
          ]"
        >
          {{ cow?.status }}
        </p>
      </div>
      <div
        class="text-end text-white text-lg"
        v-if="auth?.user?.roles?.includes('admin')"
      >
        <button
          @click="openEditCowSlide"
          class="mr-2 bg-blue-600 w-[40px] h-[40px] text-center rounded-full transition-all ease-in-out delay-100 duration-300 hover:bg-rose-600"
          title="Edit Cow"
        >
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
        </button>
        <button
          @click="handleDeleteCow"
          class="bg-blue-600 w-[40px] h-[40px] text-center rounded-full transition-all ease-in-out delay-100 duration-300 hover:bg-rose-600"
          title="Delete Cow"
        >
          <FontAwesomeIcon icon="fa-solid fa-trash-can" />
        </button>
      </div>
    </div>
  </div>

  <SlideOver
    v-if="auth?.user?.roles?.includes('admin')"
    title="Edit Cow"
    :openSlide="showEditCowSlide"
    @close:slideOver="closeEditCowSlide"
  >
    <EditCow :cow="cow" @update:cowAfterEdit="updateCowAfterEdit" />
  </SlideOver>

  <SuccessNotification :apiResponse="cowUpdateResult" />

  <main
    class="lg:px-10 md:px-[20px] px-[20px] lg:pt-[20px] md:pt-[20px] pt-[20px] pb-[50px] bg-[#f1f5f9] min-h-screen"
  >
    <CowInfo :cow="cow" />

    <CowChildren :cow="cow" v-if="cow?.children?.length" />

    <CowVaccineList v-if="cow?.vaccines?.length" :cow="cow" />
  </main>
</template>
