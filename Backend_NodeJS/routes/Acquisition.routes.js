const express = require("express");
const router = express.Router();
const acquisitionController = require("../controllers/Acquisition.controller");
const multer = require("../utils/Multer");

router.post(
  "/create/:_id",
  multer.uploadImageAndFile,
  acquisitionController.Create
);
router.get("/get_all", acquisitionController.GetAllAcquisition);
router.get("/get_all/:_id", acquisitionController.GetAllAcquisitionByOeuvreId);

router.delete("/delete_one/:_id", acquisitionController.Delete);
router.put("/update_info/:_id", acquisitionController.UpdateGeneralInfos);

module.exports = router;
