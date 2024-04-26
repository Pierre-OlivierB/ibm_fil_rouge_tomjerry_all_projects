const webdataModel = require("../models/m_web_data.js");
// *redirect in models

// *electricity
const electricity = webdataModel.melectricity;
const getelecbymonth = webdataModel.mgetelecbymonth;
// *culture
const culture_pommedeterre = webdataModel.mculture_pommedeterre;
const culture_pommedeterresans = webdataModel.mculture_pommedeterresans;
const culture_betterave = webdataModel.mculture_betterave;
const culture_betteravesans = webdataModel.mculture_betteravesans;
const culture_cereal = webdataModel.mculture_cereal;
const culture_cerealsans = webdataModel.mculture_cerealsans;
const culture_totsol = webdataModel.mculture_totsol;
const culture_totsolsans = webdataModel.mculture_totsolsans;
const culture_totcult = webdataModel.mculture_totcult;
const culture_totcultsans = webdataModel.mculture_totcultsans;
// *horticulture
const horticulture_legume = webdataModel.mhorticulture_legume;
const horticulture_legumesans = webdataModel.mhorticulture_legumesans;
const horticulture_fruit = webdataModel.mhorticulture_fruit;
const horticulture_fruitsans = webdataModel.mhorticulture_fruitsans;
const horticulture_fruitsousserre = webdataModel.mhorticulture_fruitsousserre;
const horticulture_fruitsousserresans =
  webdataModel.mhorticulture_fruitsousserresans;
const horticulture_totsol = webdataModel.mhorticulture_totsol;
const horticulture_totsolsans = webdataModel.mhorticulture_totsolsans;
const horticulture_tothorti = webdataModel.mhorticulture_tothorti;
const horticulture_tothortisans = webdataModel.mhorticulture_tothortisans;
// *fields
const fields = webdataModel.mfields;

module.exports = {
  electricity,
  getelecbymonth,
  culture_pommedeterre,
  culture_pommedeterresans,
  culture_betterave,
  culture_betteravesans,
  culture_cereal,
  culture_cerealsans,
  culture_totsol,
  culture_totsolsans,
  culture_totcult,
  culture_totcultsans,
  horticulture_legume,
  horticulture_legumesans,
  horticulture_fruit,
  electricity,
  horticulture_fruitsans,
  horticulture_fruitsousserre,
  horticulture_fruitsousserresans,
  horticulture_totsol,
  horticulture_totsolsans,
  horticulture_tothorti,
  horticulture_tothortisans,
  fields,
};
