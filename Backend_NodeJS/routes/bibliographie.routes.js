const express = require("express");
const router = express.Router();
const bibliographieController = require("../controllers/Bibliographie.controller");

router.post("/create/:_id", bibliographieController.Create);
router.get(
  "/get_all/:_id",
  bibliographieController.GetAllBibliographieByIdOeuvre
);
router.get("/get_all", bibliographieController.GetAllBibliographie);

router.delete("/delete_one/:_id", bibliographieController.Delete);
router.put("/update_info/:_id", bibliographieController.UpdateGeneralInfos);

module.exports = router;
