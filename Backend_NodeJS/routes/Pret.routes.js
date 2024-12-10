const express = require("express");
const router = express.Router();
const pretController = require("../controllers/Pret.controller");

router.post("/create/:_id", pretController.Create);
router.get("/get_all", pretController.GetAllPret);
router.get("/get_all/:_id", pretController.GetAllPretByIdOeuvre);

router.get("/get_one/:_id", pretController.GetOne);
router.delete("/delete_one/:_id", pretController.Delete);
router.put("/update_info/:_id", pretController.UpdateGeneralInfos);

module.exports = router;
