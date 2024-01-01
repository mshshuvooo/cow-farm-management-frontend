import {
  getDisplayQuery,
  getPaginationQuery,
  getSearchQuery,
} from "../../lib/queryFunctions";
import axios from "../../lib/axios";

// Get Cows //
export async function getCows(params = { page: 0 }) {
  try {
    let url = `api/cows?`;
    url += getPaginationQuery(params);
    url += getSearchQuery(params);
    url += getDisplayQuery(params);

    const cows = await axios.get(url);
    return cows.data;
  } catch (error) {
    console.log(error);
  }
}
