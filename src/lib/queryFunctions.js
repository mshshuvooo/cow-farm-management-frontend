export const getPaginationQuery = (params = { page: 0 }) => {
  if (params?.page == undefined) params.page = 0;
  return `page=${params.page}&`;
};

export const getSearchQuery = (params = { search: "" }) => {
  if (params?.search == undefined) params.search = "";
  return `search=${params.search}&`;
};

export const getDisplayQuery = (params = { display: "" }) => {
  if (params?.display == undefined) params.display = "";
  return `display=${params.display}&`;
};

export const getCowsByGender = (params = { gender: "" }) => {
  if (params?.gender == undefined) params.gender = "";
  return `gender=${params.gender}&`;
};

export const getCowsByStatus = (params = { status: "" }) => {
  if (params?.status == undefined) params.status = "";
  return `status=${params.status}&`;
};

export const getCowsByVaccineId = (params = { vaccineId: "" }) => {
  if (params?.vaccineId == undefined) params.vaccineId = "";
  return `vaccine_id=${params.vaccineId}&`;
};

export const getVaccinesByType = (params = { vaccineType: "" }) => {
  if (params?.vaccineType == undefined) params.vaccineType = "";
  return `vaccine_type=${params.vaccineType}&`;
};

export const getVaccinesByCow = (params = { cow: "" }) => {
  if (params?.cow == undefined) params.cow = "";
  return `cow=${params.cow}&`;
};
