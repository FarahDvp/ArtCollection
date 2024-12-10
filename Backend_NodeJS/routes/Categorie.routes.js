const express = require("express");
const router = express.Router();
const categorieController = require("../controllers/Categorie.controller");

router.post("/create", categorieController.Create);
router.get("/get_all", categorieController.GetAllCategorie);
router.get("/get_one/:_id", categorieController.GetOne);
router.delete("/delete_one/:_id", categorieController.Delete);
router.put("/update_info/:_id", categorieController.UpdateGeneralInfos);

module.exports = router;