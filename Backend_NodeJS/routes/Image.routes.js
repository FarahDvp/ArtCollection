const express = require("express");
const router = express.Router();
const imageController = require("../controllers/Image.controller");
const multer = require("../utils/Multer");

router.post("/create/:_id", multer.uploadImage, imageController.Create);
router.get("/get_all/:_id", imageController.GetAllImageByOeuvreId);
router.get("/get_all", imageController.GetAllImage);

router.get("/get_one/:_id", imageController.GetOne);
router.delete("/delete_one/:_id", imageController.Delete);
router.put("/update_info/:_id", imageController.UpdateGeneralInfos);

module.exports = router;
