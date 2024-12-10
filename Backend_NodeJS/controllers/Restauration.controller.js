const restaurationModel = require("../models/Restauration.model");
const materielModel = require("../models/Materiel.model");
const oeuvreModel = require("../models/Oeuvre.model");

const Create = async (req, res) => {
  try {
    let data = req.body;
    const { _id } = req.params;
    console.log(_id);

    const oeuvreId = await oeuvreModel.findOne({ _id });

    let restauration = new restaurationModel({
      constat: data.constat,
      causes: data.causes,
      date: data.date,
      lieu: data.lieu,
      nomRestaurateur: data.nomRestaurateur,
      typeIntervention: data.typeIntervention,
      materiel: data.materiel,
      techniqueUtilise: data.techniqueUtilise,
      oeuvre: oeuvreId,
    });

    let restaurationFormDb = await (
      await restauration.save()
    ).populate(["materiel", "oeuvre"]);
    res.status(200).json({
      Message: "restauration created suucessfully",
      Success: true,
      data: restaurationFormDb,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "restauration not added", error });
  }
};

const Delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const remove = await restaurationModel.deleteOne({ _id });

    if (!remove) {
      return res.status(400).json({ Message: "Failed to delete restauration" });
    }
    return res
      .status(200)
      .json({ Message: "Restauration deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllRestauration = async (req, res) => {
  try {
    const Restaurations = await restaurationModel.find();
    return res.status(200).json({
      Message: "Restaurations found successfully ",
      data: Restaurations,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllRestaurationByOeuvreId = async (req, res) => {
  try {
    const { _id } = req.params;

    const Restaurations = await restaurationModel
      .find({ oeuvre: _id })
      .populate(["oeuvre", "materiel"]);
    return res.status(200).json({
      Message: "Restaurations found successfully ",
      data: Restaurations,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetOne = async (req, res) => {
  try {
    const { _id } = req.params;

    const Restauration = await restaurationModel.findOne({ _id });
    return res
      .status(200)
      .json({ Message: " found successfully ", data: Restauration });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateGeneralInfos = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedRestauration = await restaurationModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedRestauration) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Restauration updated", data: updatedRestauration });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  Create,
  Delete,
  GetAllRestauration,
  GetOne,
  UpdateGeneralInfos,
  GetAllRestaurationByOeuvreId,
};
