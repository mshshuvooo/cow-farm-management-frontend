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
