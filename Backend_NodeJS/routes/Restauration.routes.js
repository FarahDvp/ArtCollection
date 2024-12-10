const express = require("express");
const router = express.Router();
const restaurationController = require("../controllers/Restauration.controller");

router.post("/create/:_id", restaurationController.Create);
router.get("/get_all", restaurationController.GetAllRestauration);
router.get(
  "/get_all/:_id",
  restaurationController.GetAllRestaurationByOeuvreId
);
router.get("/get_one/:_id", restaurationController.GetOne);
router.delete("/delete_one/:_id", restaurationController.Delete);
router.put("/update_info/:_id", restaurationController.UpdateGeneralInfos);

module.exports = router;
