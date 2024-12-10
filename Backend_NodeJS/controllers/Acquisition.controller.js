const acquisitionModel = require("../models/Acquisition.model");
const oeuvreModel = require("../models/Oeuvre.model");

const Create = async (req, res) => {
  try {
    let data = req.body;
    const { _id } = req.params;
    const oeuvreId = await oeuvreModel.findOne({ _id });
    let acquisition = new acquisitionModel({
      proprietaireActuel: data.proprietaireActuel,
      lieuAcquisition: data.lieuAcquisition,
      dateAcquisition: data.dateAcquisition,
      dateNaissance: data.dateNaissance,
      prixAcquisition: data.prixAcquisition,
      moyenAcquisition: data.moyenAcquisition,
      preuveAchat: req.files.preuveAchat[0].path,
      certificat: req.files.certificat[0].path,
      oeuvre: oeuvreId,
    });

    let acquisitionFormDb = await acquisition.save();
    res.status(200).json({
      Message: "acquisition created suucessfully",
      Success: true,
      data: acquisitionFormDb,
    });
  } catch (error) {
    res.status(400).send({ message: "acquisition not added", error });
  }
};

const Delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const remove = await acquisitionModel.deleteOne({ _id });

    if (!remove) {
      return res.status(400).json({ Message: "Failed to delete acquisition" });
    }
    return res
      .status(200)
      .json({ Message: "acquisition deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllAcquisition = async (req, res) => {
  try {
    const Acquisitions = await acquisitionModel.find();
    return res.status(200).json({
      Message: "Acquisitions found successfully ",
      data: Acquisitions,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const GetAllAcquisitionByOeuvreId = async (req, res) => {
  try {
    const { _id } = req.params;

    const Acquisitions = await acquisitionModel
      .find({ oeuvre: _id })
      .populate(["oeuvre"]);
    return res.status(200).json({
      Message: "Acquisitions found successfully ",
      data: Acquisitions,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateGeneralInfos = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedAcquisition = await acquisitionModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedAcquisition) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Acquisition updated", data: updatedAcquisition });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  Create,
  Delete,
  GetAllAcquisition,
  UpdateGeneralInfos,
  GetAllAcquisitionByOeuvreId,
};
