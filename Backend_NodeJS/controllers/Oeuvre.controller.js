const oeuvreModel = require("../models/Oeuvre.model");
const categorieModel = require("../models/Categorie.model");
const materielModel = require("../models/Materiel.model");
const artisteModel = require("../models/Artiste.model");
const imageModel = require("../models/Image.model");
const { cloudinary } = require("../utils/cloudinaryConfig");
const mongoose = require("mongoose");
const CloudinaryUploadImage = require("../functions/CloudinaryUploadImage");
const AcquisitionModel = require("../models/Acquisition.model");

const create = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      titre,
      description,
      dateDeCreation,
      poid,
      nbElement,
      numeroTirage,
      typeTirage,
      support,

      categorie,
      materiel,
      artiste,
      // dimension
      hauteur,
      profondeur,
      largeur,
      /** Signature */
      localisationSurOeuvre,
      descriptionSignature,
      /* Etat */
      etat, // hethi  selon chnowa bich yaamr w titbadl ken tbadlt l etat
      // Acquisition
      proprietaireActuel,
      lieuAcquisition,
      dateAcquisition,
      prixAcquisition,
      moyenAcquisition,
      preuveAchat,
      certificat,
      // Exposition
      expositon,

      //image
      copyright,
      droit,
      dateSortie,
      autreInformation,
      url,
      // Restauration
      constat,
      causes,
      dateRestauration,
      lieuRestauration,
      nomRestaurateur,
      typeIntervention,
      materieaux, //table
      techniqueUtilise,
      // Reservation
      lieuReservation,
      placeDansLeDepot,
      modeDeStockage,
      emballee,

      //Redacteur
    } = req.body;
    const exitOeuvre = await oeuvreModel.findOne({
      titre,
    });
    console.log(req.files.url[0]);

    console.log(req.body);

    if (exitOeuvre)
      return res.status(409).json({
        Message: "oeuvre already exists with that titre",
        Success: false,
      });
    let newMaterielList = [];
    for (let i = 0; i < materiel.length; i++) {
      const materialId = await materielModel.findOne({ nom: materiel[i] });
      newMaterielList.push(materialId);
    }
    const categorieId = await categorieModel.findOne({ nom: categorie });
    const artistId = await artisteModel.findOne({ nom: artiste });

    const newOeuvre = new oeuvreModel({
      titre,
      categorie: categorieId,
      etat,
      artiste: artistId,
      description,
      poid,
      dateDeCreation,
      typeTirage,
      numeroTirage,
      support,
      nbElement,
      dimension: { largeur: largeur, profondeur: profondeur, hauteur: hauteur },
      materiel: newMaterielList,
      descriptionSignature,
      localisationSurOeuvre,
    });

    const createdOeuvre = await newOeuvre.save({ session });

    const newImage = new imageModel({
      url: req.files.url[0].path,
      copyright,
      droit,
      dateSortie,
      autreInformation,
      oeuvre: newOeuvre._id,
    });
    const createdImage = await newImage.save({ session });

    const newAcquisition = new AcquisitionModel({
      proprietaireActuel,
      lieuAcquisition,
      dateAcquisition,
      prixAcquisition,
      moyenAcquisition,
      preuveAchat: req.files.preuveAchat[0].path,
      certificat: req.files.certificat[0].path,
      oeuvre: newOeuvre._id,
    });
    const createdAcquisaton = await newAcquisition.save({ session });
    const updateImage = await oeuvreModel
      .findOneAndUpdate(
        { _id: newOeuvre._id },
        {
          $push: {
            image: {
              $each: [createdImage._id],
            },
          },
        },
        { new: true }
      )
      .session(session);

    const updateRedacteur = await oeuvreModel
      .findOneAndUpdate(
        { _id: newOeuvre._id },
        {
          $push: { redacteur: { user: req.user._id } },
        },

        { new: true }
      )
      .session(session);

    await session.commitTransaction();

    return res.status(200).json({
      Message: "oeuvre created suucessfully",
      Success: true,
      data: createdOeuvre,
    });
  } catch (ex) {
    await session.abortTransaction();
    console.log(ex);
    res.status(500).json({ err: "Something went wrong" });
  } finally {
    session.endSession();
  }
};

const getAll = async (req, res) => {
  try {
    const oeuvre = await oeuvreModel
      .find()
      .populate(["materiel", "categorie", "artiste", "image", "redacteur"]);

    return res
      .status(200)
      .json({ Message: "oeuvre found successfully ", data: oeuvre });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const getOne = async (req, res) => {
  try {
    const { _id } = req.params;

    const oeuvre = await oeuvreModel
      .findOne({ _id })
      .populate(["image", "redacteur", "materiel", "categorie", "artiste"]);
    return res.status(200).json({
      Message: "oeuvre found successfully ",
      data: oeuvre,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateGeneralInfos = async (req, res) => {
  try {
    const { _id } = req.params;

    const updatedOeuvre = await oeuvreModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedOeuvre) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Oeuvre updated", data: updatedArtiste });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = { create, getAll, getOne, UpdateGeneralInfos };
