const bibliographieModel = require("../models/Bibliographie.model");
const oeuvreModel = require("../models/Oeuvre.model");

const Create = async (req, res) => {
  try {
    let data = req.body;
    const { _id } = req.params;
    const oeuvreId = await oeuvreModel.findOne({ _id });

    let bibliographie = new bibliographieModel({
      titre: data.titre,
      nomAuteur: data.nomAuteur,
      page: data.page,
      datePublication: data.datePublication,
      editeur: data.editeur,
      publication: data.publication,
      oeuvre: oeuvreId,
    });

    let bibliographieFormDb = await bibliographie.save();
    res.status(200).json({
      Message: "bibliographie created suucessfully",
      Success: true,
      data: bibliographieFormDb,
    });
  } catch (error) {
    res.status(400).send({ message: "bibliographie not added", error });
  }
};

const Delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const remove = await bibliographieModel.deleteOne({ _id });

    if (!remove) {
      return res
        .status(400)
        .json({ Message: "Failed to delete bibliographie" });
    }
    return res.status(200).json({ Message: "Artist deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllBibliographie = async (req, res) => {
  try {
    const Bibliographies = await bibliographieModel.find();
    return res.status(200).json({
      Message: "Bibliographies found successfully ",
      data: Bibliographies,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllBibliographieByIdOeuvre = async (req, res) => {
  try {
    const { _id } = req.params;

    const Bibliographies = await bibliographieModel
      .find({ oeuvre: _id })
      .populate(["oeuvre"]);
    return res.status(200).json({
      Message: "Bibliographies found successfully ",
      data: Bibliographies,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateGeneralInfos = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedBibliographie = await bibliographieModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedbibliographie) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "bibliographie updated", data: updatedBibliographie });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  Create,
  Delete,
  GetAllBibliographie,
  UpdateGeneralInfos,
  GetAllBibliographieByIdOeuvre,
};
