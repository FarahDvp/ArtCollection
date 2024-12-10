const reservationModel = require("../models/Reservation.model");
const oeuvreModel = require("../models/Oeuvre.model");

const Create = async (req, res) => {
  try {
    let data = req.body;
    const { _id } = req.params;
    const oeuvreId = await oeuvreModel.findOne({ _id });
    let reservation = new reservationModel({
      lieu: data.lieu,
      placeDansLeDepot: data.placeDansLeDepot,
      modeDeStockage: data.modeDeStockage,
      emballee: data.emballee,
      oeuvre: oeuvreId,
    });

    let reservationFormDb = await reservation.save();
    res.status(200).json({
      Message: "reservation created suucessfully",
      Success: true,
      data: reservationFormDb,
    });
  } catch (error) {
    res.status(400).send({ message: "reservation not added", error });
  }
};

const Delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const remove = await reservationModel.deleteOne({ _id });

    if (!remove) {
      return res.status(400).json({ Message: "Failed to delete reservation" });
    }
    return res
      .status(200)
      .json({ Message: "Reservation deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllReservation = async (req, res) => {
  try {
    const Reservations = await reservationModel.find();
    return res.status(200).json({
      Message: "Reservations found successfully ",
      data: Reservations,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const GetAllReservationByIdOeuvre = async (req, res) => {
  try {
    const { _id } = req.params;

    const Reservations = await reservationModel
      .find({ oeuvre: _id })
      .populate(["oeuvre"]);
    return res.status(200).json({
      Message: "Reservations found successfully ",
      data: Reservations,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetOne = async (req, res) => {
  try {
    const { _id } = req.params;

    const Reservation = await reservationModel.findOne({ _id });
    return res
      .status(200)
      .json({ Message: " found successfully ", data: Reservation });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateGeneralInfos = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedReservation = await reservationModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Reservation updated", data: updatedReservation });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  Create,
  Delete,
  GetAllReservation,
  GetOne,
  UpdateGeneralInfos,
  GetAllReservationByIdOeuvre,
};
