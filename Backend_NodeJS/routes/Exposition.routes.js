const express = require("express");
const router = express.Router();
const expositionController = require("../controllers/Exposition.controller");

router.post("/create", expositionController.Create);
router.get("/get_all", expositionController.GetAllExposition);
router.get("/get_one/:_id", expositionController.GetOne);
router.delete("/delete_one/:_id", expositionController.Delete);
router.put("/update_info/:_id", expositionController.UpdateGeneralInfos);

module.exports = router;