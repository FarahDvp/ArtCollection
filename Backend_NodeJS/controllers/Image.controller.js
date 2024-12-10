const imageModel = require("../models/Image.model");
const oeuvreModel = require("../models/Oeuvre.model");

const Create = async (req, res) => {
  try {
    let data = req.body;
    const { _id } = req.params;
    const file = req.files.image[0].path;
    const oeuvreId = await oeuvreModel.findOne({ _id });

    let image = new imageModel({
      url: file,
      copyright: data.copyright,
      droit: data.droit,
      dateSortie: data.dateSortie,
      autreInformation: data.autreInformation,
      oeuvre: oeuvreId,
    });

    let imageFormDb = await image.save();
    res.status(200).json({
      Message: "image created suucessfully",
      Success: true,
      data: imageFormDb,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "image not added", error });
  }
};

const Delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const remove = await imageModel.deleteOne({ _id });

    if (!remove) {
      return res.status(400).json({ Message: "Failed to delete image" });
    }
    return res.status(200).json({ Message: "Image deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllImage = async (req, res) => {
  try {
    const Images = await imageModel.find();
    return res
      .status(200)
      .json({ Message: "Images found successfully ", data: Images });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const GetAllImageByOeuvreId = async (req, res) => {
  try {
    const { _id } = req.params;

    const images = await imageModel.find({ oeuvre: _id }).populate(["oeuvre"]);
    return res.status(200).json({
      Message: "photos  found successfully ",
      data: images,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const GetOne = async (req, res) => {
  try {
    const { _id } = req.params;

    const Image = await imageModel.findOne({ _id });
    return res
      .status(200)
      .json({ Message: " found successfully ", data: Image });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateGeneralInfos = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedImage = await imageModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedImage) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Image updated", data: updatedImage });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  Create,
  Delete,
  GetAllImage,
  GetOne,
  UpdateGeneralInfos,
  GetAllImageByOeuvreId,
};
