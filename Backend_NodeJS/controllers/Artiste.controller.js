const artisteModel = require("../models/Artiste.model");
const CloudinaryUploadImage = require("../functions/CloudinaryUploadImage");

const Create = async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    const { image } = req.files;
    console.log(req.files.image[0]);

    let newNationaliteList = [];
    for (let i = 0; i < data.nationalite.length; i++) {
      newNationaliteList.push({
        label: data.nationalite[i].label,
        code: data.nationalite[i].code,
      });
    }
    let artiste = new artisteModel({
      nom: data.nom,
      prenom: data.prenom,
      biographie: data.biographie,
      dateNaissance: data.dateNaissance,
      lieuNaissance: data.lieuNaissance,
      dateDece: data.dateDece,
      lieuDece: data.lieuDece,
      nationalite: newNationaliteList,
      photo: req.files.image[0].path,
      sexe: data.sexe,
    });

    let artisteFormDb = await artiste.save();
    res.status(200).json({
      Message: "artiste created suucessfully",
      Success: true,
      data: artisteFormDb,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "artiste not added", error });
  }
};

const Delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const remove = await artisteModel.deleteOne({ _id });

    if (!remove) {
      return res.status(400).json({ Message: "Failed to delete artiste" });
    }
    return res.status(200).json({ Message: "Artist deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllArtiste = async (req, res) => {
  try {
    const Artistes = await artisteModel.find().populate(["oeuvre"]);

    return res
      .status(200)
      .json({ Message: "Artistes found successfully ", data: Artistes });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetOne = async (req, res) => {
  try {
    const { _id } = req.params;

    const Artiste = await artisteModel.findOne({ _id });
    return res
      .status(200)
      .json({ Message: " found successfully ", data: Artiste });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateGeneralInfos = async (req, res) => {
  try {
    const { _id } = req.params;

    const updatedArtiste = await artisteModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedArtiste) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Artiste updated", data: updatedArtiste });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  Create,
  Delete,
  GetAllArtiste,
  GetOne,
  UpdateGeneralInfos,
};
