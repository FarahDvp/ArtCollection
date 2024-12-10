const express = require("express");
const router = express.Router();
const oeuvreController = require("../controllers/Oeuvre.controller");
const Multer = require("../utils/Multer"); // bich nistaamlha fi w7oud o5rin ka middelware
const verifToken = require("../middlewares/VerifToken");
const multer = require("../utils/Multer");

router.post(
  "/create",
  verifToken.isSuperAdmin,
  multer.uploadImageAndFile,
  oeuvreController.create
);
router.get("/get_all", oeuvreController.getAll);
router.get("/get_one/:_id", oeuvreController.getOne);
router.put("/update_info/:_id", oeuvreController.UpdateGeneralInfos);

module.exports = router;
