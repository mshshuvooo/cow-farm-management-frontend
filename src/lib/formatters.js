export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(date);
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("bn-BD", {
    //style: "currency",
    //currency: "BDT",
  }).format(value);
};
