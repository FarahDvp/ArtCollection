const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/Reservation.controller");

router.post("/create/:_id", reservationController.Create);
router.get("/get_all", reservationController.GetAllReservation);
router.get("/get_all/:_id", reservationController.GetAllReservationByIdOeuvre);

router.get("/get_one/:_id", reservationController.GetOne);
router.delete("/delete_one/:_id", reservationController.Delete);
router.put("/update_info/:_id", reservationController.UpdateGeneralInfos);

module.exports = router;
