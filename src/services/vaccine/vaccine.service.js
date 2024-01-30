import {
  getPaginationQuery,
  getSearchQuery,
  getVaccinesByCow,
  getVaccinesByType,
} from "../../lib/queryFunctions";
import axios from "../../lib/axios";

// Get vaccines //
export async function getVaccines(params = { page: 0 }) {
  try {
    let url = `api/vaccines?`;
    url += getVaccinesByCow(params);
    url += getPaginationQuery(params);
    url += getSearchQuery(params);
    url += getVaccinesByType(params);

    const vaccines = await axios.get(url);
    return vaccines.data;
  } catch (error) {
    return error;
  }
}

// Get a single vaccine
export async function getVaccine(id) {
  try {
    const response = await axios.get(`api/vaccines/${id}`);
    return response?.data?.data;
  } catch (error) {
    return error;
  }
}

export async function addNewVaccine(vaccineInfo) {
  try {
    return await axios.post(`api/vaccines`, JSON.stringify(vaccineInfo.value));
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Update vaccine
export async function editVaccine(id, vaccineInfo) {
  try {
    return await axios.put(
      `api/vaccines/${id}`,
      JSON.stringify(vaccineInfo.value)
    );
  } catch (error) {
    return error;
  }
}

//Delete a vaccine
export async function deleteVaccine(id) {
  try {
    return await axios.delete(`api/vaccines/${id}`);
  } catch (error) {
    console.log(error);
    return error;
  }
}