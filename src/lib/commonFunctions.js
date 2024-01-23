// Vaccine Type Name
export const geVaccineTypeName = (vaccineType) => {
  let name;
  switch (vaccineType) {
    case "fmd":
      name = "FMD - খুরা";
      break;

    case "anthrax":
      name = "ANTHRAX - তড়কা";
      break;

    case "bq":
      name = "BQ - বাদলা";
      break;

    case "hs":
      name = "HS - গলাফুলা";
      break;

    case "lumpy":
      name = "LUMPY - লাম্পি";
      break;

    case "dewormer_tab":
      name = "DEWORMER (TAB) - কৃমি (ট্যাবলেট)";
      break;

    case "dewormer_inj":
      name = "DEWORMER (ING) - কৃমি (ইনজেকশন)";
      break;

    default:
      break;
  }
  return name;
};

// Get Vaccine type list
export const getCowVaccineTypes = () => {
  return [
    { label: "FMD - খুরা", value: "fmd" },
    { label: "ANTHRAX - তড়কা", value: "anthrax" },
    { label: "BQ - বাদলা", value: "bq" },
    { label: "HS - গলাফুলা", value: "hs" },
    { label: "LUMPY - লাম্পি", value: "lumpy" },
    { label: "DEWORMER (TAB) - কৃমি (ট্যাবলেট)", value: "dewormer_tab" },
    { label: "DEWORMER (ING) - কৃমি (ইনজেকশন)", value: "dewormer_inj" },
  ];
};

// Get Vaccine dose
export const getCowVaccineDose = () => {
  return [
    { label: "First", value: "first" },
    { label: "Booster", value: "booster" },
  ];
};
