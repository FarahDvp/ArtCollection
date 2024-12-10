const pretModel = require("../models/Pret.model");
const oeuvreModel = require("../models/Oeuvre.model");

const Create = async (req, res) => {
  try {
    let data = req.body;
    const { _id } = req.params;
    const oeuvreId = await oeuvreModel.findOne({ _id });
    let pret = new pretModel({
      institution: data.institution,
      Objet: data.Objet,
      frais: data.frais,
      titre: data.titre,
      dateDebut: data.dateDebut,
      dateFin: data.dateFin,
      assurance: { type: data.type, cout: data.cout, contrat: data.contrat },
      oeuvre: oeuvreId,
    });

    let pretFormDb = await pret.save();
    res.status(200).json({
      Message: "pret created suucessfully",
      Success: true,
      data: pretFormDb,
    });
  } catch (error) {
    res.status(400).send({ message: "pret not added", error });
  }
};

const Delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const remove = await pretModel.deleteOne({ _id });

    if (!remove) {
      return res.status(400).json({ Message: "Failed to delete pret" });
    }
    return res.status(200).json({ Message: "pret deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllPret = async (req, res) => {
  try {
    const Prets = await pretModel.find();
    return res
      .status(200)
      .json({ Message: "Prets found successfully ", data: Prets });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllPretByIdOeuvre = async (req, res) => {
  try {
    const { _id } = req.params;

    const Prets = await pretModel.find({ oeuvre: _id }).populate(["oeuvre"]);
    return res
      .status(200)
      .json({ Message: "Prets found successfully ", data: Prets });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetOne = async (req, res) => {
  try {
    const { _id } = req.params;

    const Pret = await pretModel.findOne({ _id });
    return res
      .status(200)
      .json({ Message: " found successfully ", data: Pret });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateGeneralInfos = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedPret = await pretModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedPret) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res.status(200).json({ Message: "pret updated", data: updatedPret });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  Create,
  Delete,
  GetAllPret,
  GetOne,
  UpdateGeneralInfos,
  GetAllPretByIdOeuvre,
};
