const express = require("express");
const router = express.Router();
const artisteController = require("../controllers/Artiste.controller");
const multer = require("../utils/Multer");

router.post("/create", multer.uploadImage, artisteController.Create);
router.get("/get_all", artisteController.GetAllArtiste);
router.get("/get_one/:_id", artisteController.GetOne);
router.delete("/delete_one/:_id", artisteController.Delete);
router.put(
  "/update_info/:_id",
  multer.uploadImage,
  artisteController.UpdateGeneralInfos
);

module.exports = router;
