const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
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

// *connexion
const connexion = (req, res) => {
  // console.log("test : ", req);
  // * Remplir ici
  webdataModel.mconnexion(req, res);
};
const seeAllUsers = webdataModel.mSeeAllUser;

// TODO : ------------------------
const cost = 10;

const createUser = (req, res) => {
  // console.log("test : ", req);
  bcrypt.hash(req.body.pass.toString(), cost, (err, hash) => {
    if (err) return res.json(console.log("Erreur de hashage"));
    values = [
      req.body.First_name,
      req.body.Last_name,
      req.body.N_SS,
      req.body.Id_Role,
      req.body.email,
      hash,
    ];
    webdataModel.mCreateUser(req, res);
  });
};
const seeUser = (req, res) => {
  // console.log("see");
  // * Remplir ici
  webdataModel.mSeeUser(req, res);
};
const seeRoles = (req, res) => {
  // console.log("see");
  // * Remplir ici
  webdataModel.mSeeRoles(req, res);
};
const updateUser = (req, res) => {
  // * Remplir ici
  webdataModel.mUpdateUser(req, res);
};
const seeSpecialities = (req, res) => {
  // console.log("see");
  // * Remplir ici
  webdataModel.mSeeSpecialities(req, res);
};
const deleteUser = (req, res) => {
  // * Remplir ici
  webdataModel.mDeleteUser(req, res);
};
// !-------------------------------------
// *Electricity prod
const elecProd = (req, res) => {
  // * Remplir ici
  webdataModel.mElecProd(req, res);
};

//  "INSERT INTO `product_energy` (`Id_Product`, `Id_Energy`, `qtx_production`, `date_production`, `id_unity`, `ener_price`) VALUES ('35', '1', '0', '2024-06-16 18:58:06.000000', '7', '0');"
const elecMoove = (req, res) => {
  // * Remplir ici
  const dateNow = new Date();
  const dateNowLocal = dateNow.toLocaleString("en-ZA");
  values = [
    "35",
    "1",
    `${req.body.qtx_elec}`,
    dateNowLocal,
    "7",
    `${req.body.price}`,
  ];
  webdataModel.mElecMoove(req, res);
};

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
  connexion,
  seeAllUsers,
  createUser,
  seeUser,
  seeRoles,
  updateUser,
  seeSpecialities,
  deleteUser,
  elecProd,
  elecMoove,
};
