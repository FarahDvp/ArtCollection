const express = require("express");
const router = express.Router();
const materielController = require("../controllers/Materiel.controller");

router.post("/create", materielController.Create);
router.get("/get_all", materielController.GetAllMateriel);
router.delete("/delete_one/:_id", materielController.Delete);
router.put("/update_info/:_id", materielController.UpdateGeneralInfos);

module.exports = router;