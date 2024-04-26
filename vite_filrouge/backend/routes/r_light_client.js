const express = require("express");
const router = express.Router();

const webController = require("../controllers/c_web_data");

router.get("/", (req, res) => {
  return res.json({ Status: "Bienvenue sur l'api" });
});

// *electricity
router.get("/electricity", webController.electricity);
router.get("/getelecbymonth", webController.getelecbymonth);
// *culture
router.get("/culture/pommedeterre", webController.culture_pommedeterre);
router.get("/culture/pommedeterresans", webController.culture_pommedeterresans);
router.get("/culture/betterave", webController.culture_betterave);
router.get("/culture/betteravesans", webController.culture_betteravesans);
router.get("/culture/cereal", webController.culture_cereal);
router.get("/culture/cerealsans", webController.culture_cerealsans);
router.get("/culture/totsol", webController.culture_totsol);
router.get("/culture/totsolsans", webController.culture_totsolsans);
router.get("/culture/totcult", webController.culture_totcult);
router.get("/culture/totcultsans", webController.culture_totcultsans);
// *horticulture
router.get("/horticulture/legume", webController.horticulture_legume);
router.get("/horticulture/legumesans", webController.horticulture_legumesans);
router.get("/horticulture/fruit", webController.horticulture_fruit);
router.get("/horticulture/fruitsans", webController.horticulture_fruitsans);
router.get(
  "/horticulture/fruitsousserre",
  webController.horticulture_fruitsousserre
);
router.get(
  "/horticulture/fruitsousserresans",
  webController.horticulture_fruitsousserresans
);
router.get("/horticulture/totsol", webController.horticulture_totsol);
router.get("/horticulture/totsolsans", webController.horticulture_totsolsans);
router.get("/horticulture/tothorti", webController.horticulture_tothorti);
router.get(
  "/horticulture/tothortisans",
  webController.horticulture_tothortisans
);
// *fields
router.get("/fields", webController.fields);

module.exports = router;
