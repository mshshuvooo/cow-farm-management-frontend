import {
  getCowsByGender,
  getDisplayQuery,
  getPaginationQuery,
  getSearchQuery,
  getCowsByStatus,
} from "../../lib/queryFunctions";
import axios from "../../lib/axios";

// Get Cows //
export async function getCows(params = { page: 0 }) {
  try {
    let url = `api/cows?`;
    url += getPaginationQuery(params);
    url += getSearchQuery(params);
    url += getCowsByGender(params);
    url += getCowsByStatus(params);
    url += getDisplayQuery(params);

    const cows = await axios.get(url);
    return cows.data;
  } catch (error) {
    console.log(error);
  }
}

// Add new cow
export async function addNewCow(cowInfo) {
  try {
    return await axios.post(`api/cows`, JSON.stringify(cowInfo.value));
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Get a single cow
export async function getCow(earTagNo) {
  try {
    const response = await axios.get(`api/cows/${earTagNo}`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
}

// Update cow
export async function editCow(earTagNo, cowInfo) {
  try {
    return await axios.put(
      `api/cows/${earTagNo}`,
      JSON.stringify(cowInfo.value)
    );
  } catch (error) {
    console.log(error);
    return error;
  }
}

//Delete a cow
export async function deleteCow(earTagNo) {
  try {
    return await axios.delete(`api/cows/${earTagNo}`);
  } catch (error) {
    console.log(error);
    return error;
  }
}
